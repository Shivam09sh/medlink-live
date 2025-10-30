import { Card } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-muted-foreground">Configure your account and application preferences.</p>
      </Card>
    </div>
  );
}
