import React from "react";
import { addons, types } from "storybook/internal/manager-api";

import { Tab } from "./components/Tab";
import { ADDON_ID, TAB_ID } from "./constants";

addons.register(ADDON_ID, (api) => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: "zeroheight",
    render: ({ active }) => <Tab active={active} />,
  });
});
