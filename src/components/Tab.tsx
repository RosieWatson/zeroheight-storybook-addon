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
