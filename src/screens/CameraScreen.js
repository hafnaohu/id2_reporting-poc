//Url public de la base de données Supabase pour Storage
//https://wwhgckcxkaaucmrxcjzp.storage.supabase.co/storage/v1/s3


import * as FileSystem from "expo-file-system/legacy";
import { Buffer } from "buffer";

//import for location
import * as Location from "expo-location";

//Import for the css layout
//import "./CameraScreen.css";

import React, { useState, useEffect } from "react";

//Imports for the App View and the components of the App's screen
import { View, Image, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import {TextInput, Button, Text } from "react-native-paper";
import styles from "./styles.js";

//Imports to use the camera and the gallery of the phone
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

//Import for translation
import { useLanguage } from "../utils/translation/LanguageContext.jsx";

//Import the supabase database's URL and public annon key
import {supabase} from "../../shared/supabaseClient.js";

export default function CameraScreen() {

  //Const for the premission to access the camera
  const [hasPermission, setHasPermission] = useState(null);

  //Const for the camera
  const [photo, setPhoto] = useState(null);

  //Const for the comment
  const [comment, setComment] = useState("");

  //Const for the translation
  const { t, toggleLang, lang } = useLanguage();

  // Ask camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function: take photo
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  // Function: pick from gallery
  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  //Handle "Submit" click
  //Here is the link between the App and the supabase database
  const handleSubmit = async() => {

    try {
      if(!photo) return Alert.alert("Missing photo", "Please take or Select a photo.");
      if(!comment.trim()) return Alert.alert("Missing comment", "Please add a comment");
    
    Alert.alert("Uploading...", "Please wait while we save your report");
    

    //Translation helper function
    const translateText = async (text, from, to) => {
      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
        );
        const data = await res.json();
        return data.responseData.translatedText;
      } catch (error) {
        console.error("Translation error:", error);
        return text; // fallback: return original text
      }
    };


    // 1️⃣ Get location permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need your location for the report.");
      return;
    }
    // & Get current coordinates
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    
    
    // 2️⃣ Convert photo URI to a binary file (Blob-like)
    const fileBase64 = await FileSystem.readAsStringAsync(photo, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // & Convert Base64 to a "Blob-like" object for Supabase
    const fileBytes = Buffer.from(fileBase64, "base64");


    // 3️⃣ Upload to Supabase Storage
    const fileName = `report-${Date.now()}.jpg`;
    const { error: uploadError } = await supabase
      .storage
      .from('reports')
      .upload(fileName, fileBytes, { contentType: "image/jpeg" });

    if (uploadError) throw uploadError;


    // 4️⃣ Get public URL of the uploaded image
    const { data } = supabase
      .storage
      .from('reports')
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    /* 5️⃣ Save metadata in "reports" table
    const { error: dbError } = await supabase
      .from('reports')
      .insert([
        {
          comment: comment.trim(),
          image_url: imageUrl,
          lat: latitude,
          lon: longitude,
          created_at: new Date(),
        }
    ]);*/

    const detectLang = (text) => /[^\u0000-\u007f]/.test(text) ? "cy" : "en"; // crude guess
    const sourceLang = detectLang(comment);
    // Translate to both languages
    const comment_en = sourceLang === "en"
      ? comment
      : await translateText(comment, "cy", "en");

    const comment_cy = sourceLang === "cy"
      ? comment
      : await translateText(comment, "en", "cy");

    // Insert both into Supabase
    const { error: dbError } = await supabase.from("reports").insert({
      comment: comment.trim(), // optional legacy field
      image_url: imageUrl,
      lat: latitude,
      lon: longitude,
      created_at: new Date(),
      comment_en: comment_en.trim(),
      comment_cy: comment_cy.trim(),
      
    });

     if (dbError) throw dbError;

    Alert.alert("✅ Success", t("success"));
    setPhoto(null);
    setComment("");

    } catch (error) {
      console.error("Upload failed", error);
      Alert.alert("Error", "Failed to upload report, Try again.");
    };
    

    const report = {
        photoUri: photo,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
    };

    console.log(" 📦 Report ready to upload:", report);

    Alert.alert("Success!", "Your report is ready for upload (next step).");
  };


  if (hasPermission === null) return <Text>{t("cameraPermission")}</Text>;
  if (hasPermission === false) return <Text>{t("cameraPermissionDenied")}</Text>;

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

      <ScrollView style={{ flex: 1}} contentContainerStyle={styles.container}>
        
        <View style={{ flex: 1, padding: 20 }}>
          {/*Language Button */}
          <Button onPress={toggleLang} style={{ marginBottom: "1rem" }}>
            {lang === "en" ? "Cymraeg" : "English"}
          </Button>

          {/* Title */}
          <Text variant="titleLarge">{t("title")}</Text>
        </View>

    
        {/*Button "Take a Photo" & "Choose from Gallery"*/}
        <View style={styles.buttonGroup}>
          <Button mode="contained" onPress={takePhoto}>{t("takePhoto")}</Button>
          <Button mode="outlined" onPress={pickFromGallery}>{t("chooseGallery")}</Button>
        </View>


        {/*Image*/}
        {photo && <Image source={{ uri: photo }} style={styles.preview} />}


        {/*PlaceHolder for comments*/}
        <TextInput
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChangeText={setComment}
          mode="outlined"
          multiline
          style={styles.input}
        />

        {/*Button "Submit"*/}
        <View style={styles.buttonGroup}>
          <Button
            mode="contained-tonal"
            onPress={handleSubmit}
            style={{ marginTop: 10 }}
          >
            ✅ {t("submit")}
          </Button>

          {/*Button "Reset"*/}
          <Button
            mode="outlined"
            onPress={() => { setPhoto(null); setComment(""); }}
            style={{ marginTop: 10 }}
          >
          🔄 {t("reset")}
          </Button>
        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


