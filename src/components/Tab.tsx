import React, { useCallback } from "react";
import { H1 } from "storybook/internal/components";
import { useParameter } from "storybook/internal/manager-api";
import { styled } from "storybook/internal/theming";

import { KEY } from "../constants";

interface TabProps {
  active: boolean;
}

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

const TabInner = styled.div({
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
});

const LoadingSpinner = styled.div`
  display: block;
  box-sizing: border-box;

  width: 40px;
  height: 40px;

  margin: auto;
  margin-top: 40px;

  border: 5px solid white;
  border-bottom-color: #f63e7c;
  border-radius: 50%;

  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

enum Status {
  loading,
  success,
  error,
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  const zeroheightUrl = useParameter<string>(KEY);

  const [loadingStatus, setLoadingStatus] = React.useState(Status.loading);

  async function loadContent() {
    const headers = {
      Accept: "application/json",
      "X-API-KEY": process.env.ZH_ACCESS_TOKEN,
      "X-API-CLIENT": process.env.ZH_CLIENT_ID,
    };
    const pageId = zeroheightUrl.split("/p/")[1].split("-")[0];

    try {
      const response = await fetch(
        `https://zeroheight.com/open_api/v2/pages/${pageId}?format=markdown`,
        {
          method: "GET",
          headers: headers,
        },
      );

      if (response.ok) {
        setLoadingStatus(Status.success);
        return response.json();
      } else {
        setLoadingStatus(Status.error);
        if (response.status === 401) {
          console.error("Unauthorized");
        } else if (response.status === 404) {
          console.error("Page not found");
        } else {
          console.error(`Error ${response.status}: ${response.statusText}`);
        }
      }
    } catch (e) {
      console.error(e);
      setLoadingStatus(Status.error);
    }
  }

  React.useEffect(() => {
    if (zeroheightUrl) loadContent();
  }, [zeroheightUrl]);

  if (!active) {
    return null;
  }

  return (
    <TabWrapper>
      <TabInner>
        <H1>Zeroheight documentation</H1>
        {loadingStatus === Status.loading && <LoadingSpinner />}
      </TabInner>
    </TabWrapper>
  );
};
