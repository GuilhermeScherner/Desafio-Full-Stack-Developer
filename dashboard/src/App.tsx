import { Loading } from "components";
import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "routes";
import { useTypedSelector } from "store";

function App() {
  const content = useRoutes(routes);
  const uiState = useTypedSelector((state) => state.ui);

  return (
    <>
      <Loading show={uiState.loading} />
      {content}
    </>
  );
}

export default App;
