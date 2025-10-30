import { Card } from "@/components/ui/card";

export default function Help() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Help & Support</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
        <p className="text-muted-foreground">Get help and support for using the platform.</p>
      </Card>
    </div>
  );
}
