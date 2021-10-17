import React from "react";
import { Header } from "../molecules/Header";

export const HeaderLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};
