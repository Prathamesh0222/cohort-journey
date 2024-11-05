import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
