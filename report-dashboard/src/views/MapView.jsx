import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

//Import for the leaflet Map 
import L from "leaflet";

//Import React functions
import { useEffect } from "react";

//Import for the translation
import { useLanguage } from "../utils/LanguageContext.jsx";


//Import for the resizing of the map
import "../css/App.css";
import "../css/desktop.css";
import "../css/tablet.css";
import "../css/mobile.css";


const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


//Function resize
//Force Leaflet to invalidate the size once the component is loaded
function MapResizer() {
  const map = useMap();

  useEffect(() => {
    const resizeMap = () => {
      map.invalidateSize();
    };

    // Initial resize (after small delay)
    const timeout = setTimeout(resizeMap, 300);

    // Recalculate size when window is resized
    window.addEventListener("resize", resizeMap);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", resizeMap);
    };
  }, [map]);

  return null;
}

export default function MapView({ reports }) {

  const validReports = reports.filter(r => r.lat && r.lon);
  const defaultCenter = validReports.length
    ? [validReports[0].lat, validReports[0].lon]
    : [53.0450, -2.9925]; // fallback: Wrexham

  //Const for the translation
  const { t, lang } = useLanguage();

  return (
    <div className="map-wrapper">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="map-container"
      >

        <MapResizer />
    
        <TileLayer
          /*If you want to use OpenStreetMap (doesn't support languages other than English) uncomment this part*/
          /*attribution={`&copy; <a href="https://www.openstreetmap.org/">${t("openStreetMap")}</a> ${t("contributors")}`}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/

          /*Here we use MapTiler (Does support multilingual tiles) */
          attribution={`&copy; <a href="https://www.openstreetmap.org/">${t("openStreetMap")}</a> ${t("contributors")} | © MapTiler`}
          url={`https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=hRQe5wU2sbNEfVrG5Lbd&language=${lang}`}

        />
        {validReports.map((r) => (
          <Marker key={r.id} position={[r.lat, r.lon]} icon={icon}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <img
                  src={r.image_url}
                  alt="report"
                  style={{ width: "100%", maxWidth: "120px", borderRadius: "6px" }}
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
    </div>
  );
}
