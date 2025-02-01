import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xsypxtfjffgihnmcjfgc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzeXB4dGZqZmZnaWhubWNqZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NzY4MjYsImV4cCI6MjA1MDM1MjgyNn0.6-gFguasJqAQpHhhXaNvnyJbVken6DHtndXISAXpDck";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);