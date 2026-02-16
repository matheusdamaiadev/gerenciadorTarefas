import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwnavotjvcgigbtkofgc.supabase.co ';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bmF2b3RqdmNnaWdidGtvZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTg2MjQsImV4cCI6MjA4Njc3NDYyNH0.CFnh45SW9dVSFFZd0b-Q8A5wMDf91BZY0Jr5bo8wHtM anon key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
