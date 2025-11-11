//Import from react router
import { useParams, Link } from "react-router-dom"; 

//Import from React
import { useEffect, useState } from "react";

//Import for the translation
import { useLanguage } from "../utils/LanguageContext";

//Import the database 
import { supabase } from "../../../shared/supabaseClient";

import "../App.jsx";

//Import css
import "../css/App.css";
import "../css/desktop.css";
import "../css/tablet.css";
import "../css/mobile.css";

//Function for the other display when selecting a report
export default function ReportPage() {
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
    <div>
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