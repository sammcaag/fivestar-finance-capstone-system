import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Reusable Result Card component
interface ResultCardProps {
  title: string;
  value: string;
  textColorClass?: string;
  cardHeaderClass?: string;
}

export default function ResultCard({
  title,
  value,
  textColorClass = "",
  cardHeaderClass = "",
}: ResultCardProps) {
  return (
    <Card>
      <CardHeader className={`p-4 pb-2 ${cardHeaderClass}`}>
        <CardTitle className="text-sm font-medium w-full">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <span
          className={`text-lg font-semibold ${
            textColorClass || "text-[#202B61]"
          }`}
        >
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
