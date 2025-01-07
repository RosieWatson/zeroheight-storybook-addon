import { LightningIcon } from "@storybook/icons";
import React, { useCallback } from "react";
import { Code, H1, IconButton, Link } from "storybook/internal/components";
import { useGlobals, useParameter } from "storybook/internal/manager-api";
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
  display: inline-block;
  box-sizing: border-box;

  width: 60px;
  height: 60px;

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

export const Tab: React.FC<TabProps> = ({ active }) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useparameter
  const config = useParameter<string>(
    KEY,
    "fallback value of config from parameter",
  );

  // https://storybook.js.org/docs/addons/addons-api#useglobals
  const [globals, updateGlobals] = useGlobals();
  const value = globals[KEY];

  const update = useCallback((newValue: typeof value) => {
    updateGlobals({
      [KEY]: newValue,
    });
  }, []);

  if (!active) {
    return null;
  }

  return (
    <TabWrapper>
      <TabInner>
        <H1>Zeroheight documentation</H1>
        <LoadingSpinner />
      </TabInner>
    </TabWrapper>
  );
};
