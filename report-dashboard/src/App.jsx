import { useEffect, useState } from "react";

//Import to add the supabase database to the project
import { supabase } from "./supabaseClient";

//Imports for routing and links in the dashboard
import { Routes, Route, Link, useParams } from "react-router-dom";

//Imports for the leaflet MAP
import ReportMap from "./ReportMap";

//Import the stylesheet for the layout
import "./App.css";

//Import for the biligual button
import { LanguageProvider, useLanguage } from "./LanguageContext.jsx";

function Dashboard() {
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

  //Const for the translate button
  const { t, toggleLang, lang } = useLanguage();

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
      <h1>{t("title")}</h1>

      {/* Controls for language & download */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={toggleLang} style={{ float: "right" }}>
          {t("changeLang")}
        </button>
        <button onClick={exportCSV}>{t("download")}</button>
      </div>
      

      {/* Buttons "Table View" & "Map View" */}
      <div style={{ marginBottom: "1rem" }}>
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
        <table>
          <thead>
            <tr>
              <th>{t("photo")}</th>
              <th>{t("comment")}</th>
              <th>{t("latitude")}</th>
              <th>{t("longitude")}</th>
              <th>{t("date")}</th>
              <th>{t("share")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id}>
                <td>
                  <img
                    src={r.image_url}
                    alt="report"
                    style={{ width: "100px", borderRadius: "6px" }}
                  />
                </td>
                {/*Choose between welsh and english*/}
                <td>{lang === "en" ? r.comment_en || r.comment : r.comment_cy || r.comment}</td>
                <td>{r.lat?.toFixed(5)}</td>
                <td>{r.lon?.toFixed(5)}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
                <td>
                  <Link to={`/report/${r.id}`} target="_blank">
                    🔗 Link
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
        <ReportMap reports={filteredReports} />
      )}
      </div>
    );
}

//Function for the other display when selecting a report
function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  //Const for the translation
  const { t } = useLanguage();

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();
    if (!error) setReport(data);
  };

  if (!report) return <p>{t("loadingReports")}</p>;

  return (
    <div className="App">
      <h1>{t("reportDetail")}</h1>
      <img
        src={report.image_url}
        alt="report"
        style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <p><b>{t("comment")}:</b> {report.comment}</p>
      <p><b>{t("coordinates")}:</b> {report.lat}, {report.lon}</p>
      <p><b>{t("date")}:</b> {new Date(report.created_at).toLocaleString()}</p>
      <Link to="/">{t("back")}</Link>
    </div>
  );
}

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
