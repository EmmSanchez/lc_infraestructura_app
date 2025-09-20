import { NextResponse } from "next/server";
// El client de Supabase configurado para server-side
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // "next" indica a dónde redirigir después del login
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Determinar base URL
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        `${
          request.headers.get("x-forwarded-host")
            ? `https://${request.headers.get("x-forwarded-host")}`
            : `${request.url}`
        }`;

      // Construir URL final
      const redirectTo = `${baseUrl}${next}`;

      return NextResponse.redirect(redirectTo);
    }
  }

  // En caso de error, redirigir a página de error
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${
      request.headers.get("x-forwarded-host")
        ? `https://${request.headers.get("x-forwarded-host")}`
        : `${request.url}`
    }`;
  return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`);
}
