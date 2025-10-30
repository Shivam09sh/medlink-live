import { Plus, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Patients() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Patients</h1>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Patient
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Patient Management</h2>
        <div className="space-y-4">
          {[
            { name: "Robert Chen", id: "#P-004", email: "patient@medora.com", phone: "+1 (555) 123-4567", lastVisit: "Jul 22, 1985", status: "Active" },
            { name: "Lisa Ray", id: "#P-005", email: "lisa@example.com", phone: "+1 (555) 234-5678", lastVisit: "Mar 15, 1990", status: "Pending" },
            { name: "James Wilson", id: "#P-006", email: "james@example.com", phone: "+1 (555) 345-6789", lastVisit: "Nov 30, 1978", status: "New" },
          ].map((patient, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                <div>
                  <p className="font-semibold text-foreground">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground">{patient.email}</p>
                  <p className="text-sm text-muted-foreground">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="text-sm font-medium text-foreground">{patient.lastVisit}</p>
                </div>
                <div>
                  <Badge
                    variant={
                      patient.status === "Active" ? "default" :
                      patient.status === "Pending" ? "secondary" :
                      "outline"
                    }
                    className={
                      patient.status === "Active" ? "bg-success" :
                      patient.status === "New" ? "bg-destructive" : ""
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
