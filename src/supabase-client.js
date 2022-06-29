import{createClient} from '@supabase/supabase-js';

let supabaseUrl = "http://localhost:8000";
let supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLWRlbW8iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.q58NgLHsiOb9lfhr4g3suTU0h8t16SbkANR3iQIagaE";

export const supabase = createClient(supabaseUrl,supabaseKey);