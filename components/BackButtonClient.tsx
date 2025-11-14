"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButtonClient() {
  const pathname = usePathname();
  const parts = pathname.split("/");

  let href = "/dashboard";
  if (parts[2] === "proyectos" && parts[3]) {
    href = "/dashboard/proyectos";
  }

  return (
    <Link
      type="button"
      aria-label="Volver"
      className="p-2 rounded-[8px] hover:bg-gray-100 transition hover:cursor-pointer"
      href={href}
    >
      <svg
        className="h-5 w-5 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </Link>
  );
}
