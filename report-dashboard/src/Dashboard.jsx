//Imports for routing and links in the dashboard
//import { Routes, Route, useParams } from "react-router-dom";

//Import React for the State Case
import { useEffect, useState } from "react";

//Import to add the supabase database to the project
import { supabase } from "./utils/supabaseClient.js";

//Import for the biligual button
import { useLanguage } from "./utils/LanguageContext.jsx";

//Imports for the MAP View
import MapView from "./views/MapView.jsx";

//Import for the Report Page Link
//import ReportPage from "./views/ReportPage.jsx";

//Import Dashboard function
import TableView from "./views/TableView.jsx";

//Import the stylesheet for the layout 
import "./css/App.css";
import "./css/desktop.css";
import "./css/tablet.css";
import "./css/mobile.css";




export default function Dashboard() {

  //Const for the translate button
  const { t, toggleLang, lang } = useLanguage();

  const [reports, setReports] = useState([]);

  //consts for the links and the filters
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  //const to change the display of the dashboard
  const [view, setView] = useState("table"); // "table" or "map"

  //Const for the loading 
  const [loading, setLoading] = useState(true);

  // Fetch data once at load
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching reports:", error);
    } else {
      setReports(data);
      setFilteredReports(data);
      setLoading(false);
      
    }
  };

  const exportCSV = () => {
    const headers = ["Comment", "Latitude", "Longitude", "Date", "Image URL"];
    const rows = reports.map(r => [
      `"${r.comment}"`,
      r.lat,
      r.lon,
      new Date(r.created_at).toLocaleString(),
      r.image_url,
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
  };


  // Filtering logic
  useEffect(() => {
    let filtered = reports;

    if (search.trim()) {
      filtered = filtered.filter((r) => {
      // choose comment field based on current language
        const text = lang === "cy" ? r.comment_cy : r.comment;
        return text?.toLowerCase().includes(search.toLowerCase());
    });
    }

    if (dateFrom) {
      filtered = filtered.filter(
        (r) => new Date(r.created_at) >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      filtered = filtered.filter(
        (r) => new Date(r.created_at) <= new Date(dateTo)
      );
    }

    setFilteredReports(filtered);
  }, [search, dateFrom, dateTo, reports]);


  if (loading) return <p>{t("loadingReports")}</p>;

  return (
    <div className="App">
      <div className="header">
        <h1 >
          {t("title")}
        </h1>

        {/* Controls for language*/}
        <button className="language-toggle" onClick={toggleLang}>
        {t("changeLang")}
        </button>
      </div>

      {/* Buttons "Table View", "Map View" & Download*/}
      <div className="button">
        <button onClick={exportCSV}>{t("download")}</button>
        <button onClick={() => setView("table")}>{t("tableView")}</button>
        <button onClick={() => setView("map")}>{t("mapView")}</button>
      </div>


      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      {view === "table" ? (

        <TableView reports={filteredReports} /> 
        
      ) : (

        <MapView reports={filteredReports} />
      )}
      </div>
    );
}


