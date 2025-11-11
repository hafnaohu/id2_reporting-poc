//Url public de la base de données Supabase pour anon public key
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aGdja2N4a2FhdWNtcnhjanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU5MjYsImV4cCI6MjA3NzMzMTkyNn0.TaaON4s_vVKKdHy-Ddj61ScELPBQkfYxm6AAEKM5cRk

//Url public de la base de données Supabase pour API
//https://wwhgckcxkaaucmrxcjzp.supabase.co


import { createClient } from "@supabase/supabase-js";

// Safely access environment variables for both environments
const getEnv = (key) => {
  if (typeof process !== "undefined" && process.env[key]) {
    // For Expo or Node environments
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && import.meta.env) {
    // For Vite (React dashboard)
    return import.meta.env[key];
  }
  return "";
};

const SUPABASE_URL =
  getEnv("EXPO_PUBLIC_SUPABASE_URL") || getEnv("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY =
  getEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY") || getEnv("VITE_SUPABASE_ANON_KEY");

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
