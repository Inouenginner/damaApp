import { Router } from "./Router";
import { Header } from "./components/organisms/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
    <div className="App">
      <main>
      <Router />
      </main>
    </div>
    </>
  );
}

export default App;
