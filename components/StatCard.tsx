export default function StatCard({
  value,
  label,
  testID,
}: {
  value: number | string;
  label: string;
  testID?: string;
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-center"
      data-testid={testID}
      role="region"
      aria-label={label}
    >
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
