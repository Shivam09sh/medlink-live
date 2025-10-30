import { Card } from "@/components/ui/card";

export default function MedicalRecords() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Medical Records</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
        <p className="text-muted-foreground">Access and manage patient medical records securely.</p>
      </Card>
    </div>
  );
}
