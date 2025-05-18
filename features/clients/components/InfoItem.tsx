export default function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}
