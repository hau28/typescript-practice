import { useEffect } from "react";
import { Provider } from "react-redux";
import "./App.css";
import ShoppingPage from "./pages/ShoppingPage";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Typescript practice</h1>
        <ShoppingPage />
      </div>
    </Provider>
  );
}

export default App;
