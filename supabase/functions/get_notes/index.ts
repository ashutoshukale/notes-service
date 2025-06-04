// Why: GET is standard for retrieving resources; user is authenticated via the Authorization header.

import  supabase  from "../../lib/supabaseClient.js";
import { getUser } from "../../lib/auth.js";

const get_notes = async (req) => {
  const { user } = req.headers.get("Authorization")?.match(/Bearer (.*)/)
    ? await getUser(req)
    : {};

  if (!user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};


export default get_notes;