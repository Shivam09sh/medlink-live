import { Card } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Analytics</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <p className="text-muted-foreground">View system analytics and performance metrics.</p>
      </Card>
    </div>
  );
}
