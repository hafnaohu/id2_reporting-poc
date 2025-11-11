import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    //In App.jsx
    title: "📸 Field Reports Dashboard",
    download: "⬇️ Download CSV",
    tableView: "📋 Table View",
    mapView: "🗺️ Map View",
    searchPlaceholder: "🔍 Search comment...",
    dateFrom: "From",
    dateTo: "To",
    photo: "Photo",
    comment: "Comment",
    latitude: "Latitude",
    longitude: "Longitude",
    date: "Date",
    share: "Share",
    loadingReports: "Loading reports...",
    reportDetail: "📍 Report Detail",
    coordinates: "Coordinates",
    back: "⬅️ Back to Dashboard",
    changeLang: "Cymraeg",
    //In ReportMap.js
    openStreetMap: "OpenStreetMap",
    contributors: "contributors",
  },
  cy: {
    //In App.jsx
    title: "📸 Dangosfwrdd Adroddiadau Maes",
    download: "⬇️ Lawrlwytho CSV",
    tableView: "📋 Golwg Tabl",
    mapView: "🗺️ Golwg Map",
    searchPlaceholder: "🔍 Chwilio sylw...",
    dateFrom: "O",
    dateTo: "I",
    photo: "Llun",
    comment: "Sylw",
    latitude: "Lledred",
    longitude: "Hydred",
    date: "Dyddiad",
    share: "Rhannu",
    loadingReports: "Yn llwytho adroddiadau...",
    reportDetail: "📍 Manylion Adroddiad",
    coordinates: "Cyfesurynnau",
    back: "⬅️ Nôl i’r Dangosfwrdd",
    changeLang: "English",
    //In ReportMap
    openStreetMap: "OpenStreetMap",
    contributors: "cyfranwyr",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "cy" : "en"));

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
