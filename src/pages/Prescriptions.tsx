import { Card } from "@/components/ui/card";

export default function Prescriptions() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Prescriptions</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
        <p className="text-muted-foreground">Manage patient prescriptions and medication orders.</p>
      </Card>
    </div>
  );
}
