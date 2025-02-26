import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://oyceajbtxgvxkrqfvsvu.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95Y2VhamJ0eGd2eGtycWZ2c3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzOTc0MjYsImV4cCI6MjA1NTk3MzQyNn0.6xcS_FE2q4lLjqs_DDgb24nvptAh2wYlUlmrIcjvuC8";
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
