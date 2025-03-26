import React from "react";
import Language from "../components/Language";
import Population from "../components/Population";
import Regiao from "../components/Region";

function Page1() {
  return (
    <div>
      <h1>Country Details</h1>
      <Language />
      <Population />
      <Regiao />
    </div>
  );
}

export default Page1;