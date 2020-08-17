import React from "react";
import { AppWrapper, Container } from "./assets/styles";
import { Table } from "./components";

import { DATA } from "./assets/data";

function App() {
  return (
    <AppWrapper>
      <Container>
        <Table
          data={DATA}
          columns={[
            { name: "ID", field: "id", width: 80 },
            { name: "Imię", field: "firstName", width: 350 },
            { name: "Nazwisko", field: "lastName", width: 350 },
            { name: "Płeć", field: "gender", width: 150 },
            { name: "Kraj", field: "country", width: 150 },
            { name: "E-mail", field: "email", width: 250 },
          ]}
        />
      </Container>
    </AppWrapper>
  );
}

export default App;
