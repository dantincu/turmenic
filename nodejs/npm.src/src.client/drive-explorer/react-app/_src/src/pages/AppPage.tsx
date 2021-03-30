import React from "react";
import { Container } from "reactstrap";

import { PageProps } from "./AppPageProps";

const AppPage = (props: PageProps) => {
  return (
    <main className="trmrk-app-main">
      <Container className="trmrk-app-cntr">{(props as any).children}</Container>
    </main>
  );
};

export default AppPage;
