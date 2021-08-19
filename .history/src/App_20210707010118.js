import { Router } from "./Router";
import { Header } from "./components/organisms/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
      <Router />
      </main>
    </div>
  );
}

export default App;
