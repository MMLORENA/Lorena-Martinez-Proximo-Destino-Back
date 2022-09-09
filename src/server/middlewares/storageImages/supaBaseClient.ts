import "../../../loadEnvironment";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://eisgrvsdasqjohkcrlpz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc2dydnNkYXNxam9oa2NybHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI3NDMzMjQsImV4cCI6MTk3ODMxOTMyNH0.riUUXGyWc1wwoR_gLP-PynLUWwZcZBrUx2hytJQXtqU"
);

export default supabase;
