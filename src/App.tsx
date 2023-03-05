import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Route } from "wouter";

import SearchField from "./SearchField";

function App() {
  return (
    <div>
      <Route path="/">
        <SearchField />
      </Route>
      <Route path="/:name">
        {(params) => <div>Hello, {params.name}!</div>}
      </Route>
    </div>
  );
}

export default App;
