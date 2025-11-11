import { createClient } from "@/lib/supabase/client";

export async function assignUserToProject(
  userEmail: string,
  contractId: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_project_assignments")
    .insert([{ user_email: userEmail, contract_id: contractId }]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
