"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const redirectUrl = `${baseUrl}/auth/callback?next=/dashboard`;

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginWithAzure = async () => {
    const supabase = createClient();
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          redirectTo: redirectUrl,
          scopes: "email offline_access",
          queryParams: { prompt: "select_account" },
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al iniciar sesión con Azure"
      );
    }
  };

  const handleLoginWithEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Correo o contraseña incorrectos");
        console.error(error);
        return;
      }

      // Si llega aquí, el login fue exitoso
      router.push("/dashboard");
    } catch (err) {
      setError("Error al procesar la solicitud");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-dvh flex flex-row text-black">
      {/* Imagen izquierda */}
      <div className="max-md:hidden w-[900px] min-h-screen relative">
        <Image
          src={"/assets/img/login_wallpaper.jpg"}
          fill
          priority
          sizes="900px"
          alt="Login image wallpaper"
          className="h-full object-cover"
        />
      </div>

      {/* Lado derecho */}
      <div className="flex flex-1 justify-center items-center flex-col mx-10">
        <div className="w-full max-w-[440px] md:w-[440px]">
          <h1 className="font-bold pb-6 pt-12 text-2xl text-center">
            <span className="flex items-center justify-center gap-2">
              <span className="relative inline-block w-[1em] h-[1em] align-middle">
                <Image
                  src="/assets/logos/logo.png"
                  alt="Logo LC"
                  fill
                  sizes="1em"
                  className="object-contain"
                />
              </span>
              <span className="leading-none">LC Infraestructura</span>
            </span>
          </h1>

          <h2 className="font-medium text-4xl text-neutral-800 pb-6">
            <span className="font-normal text-[18px] text-neutral-600">
              Bienvenido al portal
            </span>
            <br />
            Iniciar Sesión
          </h2>

          {/* Login con Microsoft */}
          <button
            onClick={handleLoginWithAzure}
            className="flex justify-center items-center gap-4 py-3 w-full rounded-md bg-[#E9F1FF] hover:cursor-pointer hover:bg-blue-100 border-solid border-[1px] border-transparent hover:border-blue-300 transition-all ease-out"
          >
            <Image
              src={"/assets/logos/microsoft.svg"}
              width={20}
              height={20}
              alt="Microsoft Logo"
            />
            <span className="text-[#4285F4]">Iniciar con Microsoft</span>
          </button>

          {/* Login con email */}
          <form
            onSubmit={handleLoginWithEmail}
            className="flex flex-col gap-4 pt-5"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="pl-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@empresa.com"
                className="p-2 pl-4 text-[14px] bg-neutral-100 border-[1px] border-neutral-200 rounded-md transition-all focus:border-blue-700 focus:outline-0"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="pl-1">
                Contraseña
              </label>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full p-2 pl-4 text-[14px] bg-neutral-100 border-[1px] border-neutral-200 rounded-[6px] transition-all focus:border-blue-700 focus:outline-0"
                  required
                />

                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <Image
                    src={
                      showPassword
                        ? "/assets/icons/eye-closed.svg"
                        : "/assets/icons/eye.svg"
                    }
                    width={20}
                    height={20}
                    alt="Toggle password visibility"
                    className="opacity-60"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 bg-blue-500 text-white text-[18px] rounded-xl py-3 shadow-md hover:cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
