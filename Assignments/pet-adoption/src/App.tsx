import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PetAdoptionForm } from "./components/PetAdoptionForm";
import { SubmissionPage } from "./components/SubmissionData";

function App() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-red-500 via-blue-200 to-purple-700 justify-center h-screen">
      <div className="flex justify-center">
        <div className="border bg-white p-8 rounded-xl shadow-xl">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PetAdoptionForm />} />
              <Route path="/submissions" element={<SubmissionPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
