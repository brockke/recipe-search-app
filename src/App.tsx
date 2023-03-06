import { Route } from "wouter";

import RecipeDetails from "./RecipeDetails";
import SearchField from "./SearchField";

function App() {
  return (
    <div>
      <Route path="/">
        <SearchField />
      </Route>
      <Route path="/:id">{(params) => <RecipeDetails id={params.id} />}</Route>
    </div>
  );
}

export default App;
