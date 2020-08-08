import React from "react";
import MuiLayout from "./mui-layout";

export function wrapRootElement({ element }) {
  return <MuiLayout>{element}</MuiLayout>;
}
