import React from "react";
import { Header } from "../molecules/Header";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export const HeaderContainerLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Container maxWidth="sm" spacing={3}>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Container>
    </>
  );
};
