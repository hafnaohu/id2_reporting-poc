import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../services/supabase.js";

export default function MapScreen() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase.from("reports").select("*");
    if (error) console.error(error);
    else setReports(data);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: reports[0]?.lat || 48.8566,
          longitude: reports[0]?.lon || 2.3522,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {reports.map((r) => (
          <Marker
            key={r.id}
            coordinate={{ latitude: r.lat, longitude: r.lon }}
            title={r.comment}
            description={new Date(r.created_at).toLocaleString()}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
