import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "bg-blue-100 text-primary",
  trend,
}: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
          {trend && (
            <p className={`text-sm font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
          {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
