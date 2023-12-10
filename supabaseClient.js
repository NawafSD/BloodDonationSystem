// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://smvsyvxiszxjltnhmbjv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdnN5dnhpc3p4amx0bmhtYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTM1MTIsImV4cCI6MjAxNzUyOTUxMn0.HSOqpuKQ0uEXhkReKqmbFXnZo5IsUhj21-Z57HpYKQg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);