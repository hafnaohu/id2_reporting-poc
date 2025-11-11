import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ReportPage from "./views/ReportPage.jsx";
import { LanguageProvider } from "./utils/LanguageContext.jsx";
import "./css/App.css";
import "./css/desktop.css";
import "./css/tablet.css";
import "./css/mobile.css";



//App function that chooses between the two displays (main Dashboard and ReportPage)
export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report/:id" element={<ReportPage />} />
      </Routes>
    </LanguageProvider>
  );
}