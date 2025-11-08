import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://wwhgckcxkaaucmrxcjzp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aGdja2N4a2FhdWNtcnhjanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU5MjYsImV4cCI6MjA3NzMzMTkyNn0.TaaON4s_vVKKdHy-Ddj61ScELPBQkfYxm6AAEKM5cRk';

export const supabase = createClient(supabaseUrl, supabaseKey);
