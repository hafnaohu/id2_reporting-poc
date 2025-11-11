//Import for routing
import {Link} from "react-router-dom";

//Import for language translation
import { useLanguage } from "../utils/LanguageContext.jsx";

//Import css
//Import for the resizing of the map
import "../css/App.css";
import "../css/desktop.css";
import "../css/tablet.css";
import "../css/mobile.css";

export default function TableView({ reports }) {

    //const for translation
    const { lang, t } = useLanguage();

    return (
        <div className="table-container">
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
            {reports.map((r) => (
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
    </div>
    );
}

