import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

//Import for the translation
import { useLanguage, LanguageProvider } from "./LanguageContext.jsx";


//Imports to force Leaflet to invalidate the size once the component is loaded
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


//Function resize
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function ReportMap({ reports }) {

  const validReports = reports.filter(r => r.lat && r.lon);
  const defaultCenter = validReports.length
    ? [validReports[0].lat, validReports[0].lon]
    : [48.8566, 2.3522]; // fallback: Paris

  //Const for the translation
  const { t, lang } = useLanguage();

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "80vh", width: "100%", borderRadius: "8px" }}
    >
    <MapResizer />
      <TileLayer
        attribution={'&copy; <a href="https://www.openstreetmap.org/">${t("openStreetMap")}</a> ${t("contributors")}'}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validReports.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lon]} icon={icon}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <img
                src={r.image_url}
                alt="report"
                style={{ width: "120px", borderRadius: "6px" }}
              />
              <p style={{ margin: "0.5rem 0" }}>
                <td>{lang === "en" 
                  ? r.comment_en || r.comment 
                  : r.comment_cy || r.comment}
                </td>
              </p>
              <small>
                <b>{t("coordinates")}:</b> {r.lat.toFixed(4)}, {r.lon.toFixed(4)} <br />
                <b>{t("date")}:</b> {new Date(r.created_at).toLocaleString()}
              </small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
