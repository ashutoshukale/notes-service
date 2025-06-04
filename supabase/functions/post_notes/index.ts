// Why: POST is appropriate for creating a new resource; data is read from the request body.
import supabase from "../../lib/supabaseClient.js";
import { getUser } from "../../lib/auth.js";

const post_notes = async (req) => {
  const { title, content } = await req.json();
  const { user } = req.headers.get("Authorization")?.match(/Bearer (.*)/)
    ? await getUser(req)
    : {};

  if (!user || !title) {
    return new Response(
      JSON.stringify({ error: "Missing title or not authenticated" }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: user.id, title, content }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data[0]), { status: 201 });
};

export default post_notes;
