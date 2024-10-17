import NavBar from "./NavBar";
import Home from "./pages/Home";
import CelebrityFetcherProvider from "./CelebrityFetcherContext";

function App() {
  return (
    <CelebrityFetcherProvider>
      <NavBar />
      <Home />
    </CelebrityFetcherProvider>
  );
}

export default App;
