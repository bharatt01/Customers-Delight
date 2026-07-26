import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rrzdzdnmdwftiwlvdkha.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Tou4daHF-wL1Zcgx02z0Qw_aPLoHFwg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);