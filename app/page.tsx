"use client";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lc-infraestructura-app.vercel.app/"
    : "http://localhost:3000";

export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginWithAzure = async () => {
    const supabase = createClient();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          redirectTo: `${baseUrl}/auth/callback?next=/protected`,
          scopes: "email offline_access",
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="w-full h-dvh flex flex-row text-black">
      <div className="w-[900px] min-h-screen relative">
        <Image
          src={"/assets/img/login_wallpaper.jpg"}
          layout="fill"
          objectFit="cover"
          alt="Login image wallpaper"
          className="h-full"
        />
      </div>

      <div className="flex flex-1 justify-center items-center flex-col">
        <div className="w-[440px]">
          <h1 className="font-bold pb-10 text-2xl text-center">
            LC Infraestructura
          </h1>

          <h2 className="font-medium text-4xl text-neutral-800 pb-6">
            <span className="font-normal text-[18px] text-neutral-600">
              Bienvenido al portal
            </span>
            <br />
            Iniciar Sesión
          </h2>

          {/* Log in with microsoft */}
          <button
            onClick={handleLoginWithAzure}
            className="flex justify-center items-center gap-4 py-3 w-full rounded-md bg-[#E9F1FF] hover:cursor-pointer hover:bg-blue-100 border-solid border-[1px] border-transparent hover:border-solid hover:border-[1px] hover:border-blue-300 transition-all ease-out"
          >
            <Image
              src={"/assets/logos/microsoft.svg"}
              width={200}
              height={200}
              alt="Microsoft Logo"
              className="size-5"
            />
            <span className="text-[#4285F4]">Iniciar con Microsoft</span>
          </button>

          <form className="flex flex-col gap-4 pt-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="pl-1">
                Correo electrónico
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="ejemplo@hotmail.com"
                className="p-2 pl-4 text-[14px] bg-neutral-100 border-[1px] border-neutral-200 rounded-md transition-all focus:border-blue-700 focus:outline-0"
                required
              />
            </div>

            {/* Password */}
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

                <div className="absolute flex justify-end items-center w-full h-10 -translate-y-10 pointer-events-none">
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className={`size-6 absolute mr-4 hover:cursor-pointer pointer-events-auto`}
                  >
                    {showPassword ? (
                      <>
                        <Image
                          src={"/assets/icons/eye-closed.svg"}
                          layout="fill"
                          alt="Eye hide password"
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          src={"/assets/icons/eye.svg"}
                          layout="fill"
                          objectFit="cover"
                          alt="Eye password"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className={`mt-4 bg-blue-500 text-white text-[18px] rounded-xl py-3 shadow-md hover:cursor-pointer`}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
