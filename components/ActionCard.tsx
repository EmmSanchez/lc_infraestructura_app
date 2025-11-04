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
            <svg
              className="h-12 w-12 text-gray-800"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.98.05C15.43 13.7 17 14.78 17 16v2h6v-2.5C23 14.17 18.33 13 16 13z" />
            </svg>
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
