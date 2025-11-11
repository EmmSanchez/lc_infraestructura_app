import { Shield } from "lucide-react";
import Link from "next/link";

export default function ActionCard({
  title,
  href,
  icon = "person", // Valor por defecto
  ctaText,
  testID,
}: {
  id: string;
  title: string;
  href: string;
  icon?: "group" | "person";
  ctaText?: string;
  testID?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={title}
      className="group block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
      data-testid={testID}
    >
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          {icon === "group" ? (
            <Shield className="h-12 w-12 text-gray-800" />
          ) : (
            <svg
              className="h-12 w-12 text-gray-800"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" />
            </svg>
          )}
        </div>

        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900">{title}</h4>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500">{ctaText}</span>
          <svg
            className="h-6 w-6 mt-2 text-blue-500 group-hover:text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
