import supabase from "./supabaseClient.js";

export async function getUser(req) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) return { user: null };

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error) return { user: null };

  return { user };
}
