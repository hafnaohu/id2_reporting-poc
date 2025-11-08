import React, { createContext, useContext, useState } from "react";

// Create context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Translation dictionary
const translations = {

  en: {
    title:"Create a New Report",
    takePhoto: "📸 Take a Photo",
    chooseGallery: "🖼️ Choose from Gallery",
    commentPlaceholder: "Write your comment...",
    uploadImage: "Upload Image",
    latitude: "Latitude",
    longitude: "Longitude",
    success: "Report submitted successfully!",
    submit: "Submit",
    reset: "Reset",

    /*Request permissions*/
    cameraPermission: "Requesting camera permission...",
    cameraPermissionDenied: "No access to camera.",

    locationPermission: "Requesting location permission",
    locationPermissionDenied: "Permission Denied. We need your location for the report.",
  },

  cy: {
    title: "Creu Adroddiad Newydd",
    takePhoto: "📸 Tynnwch lun",
    chooseGallery: "🖼️ Dewiswch o'r Oriel",
    commentPlaceholder: "Ysgrifennwch eich sylw...",
    uploadImage: "Llwytho Delwedd",
    latitude: "Lledred",
    longitude: "Hydred",
    success: "Adroddiad wedi’i gyflwyno’n llwyddiannus!",
    submit: "Cyflwyno",
    reset: "Ailosod",

    /*Request permissions*/
    cameraPermission: "Yn gofyn am ganiatâd camera",
    cameraPermissionDenied: "Dim mynediad at y camera.",

    locationPermission: "Yn gofyn am ganiatâd lleoliad",
    locationPermissionDenied: "Caniatâd wedi'i Wrthod. Mae angen eich lleoliad arnom ar gyfer yr adroddiad.",
  },
};

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
