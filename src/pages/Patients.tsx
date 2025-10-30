import { useState } from "react";
import { Plus, Eye, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";

export default function Patients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    lastVisit: "",
    status: "New",
  });

  // Add new patient
  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone || !newPatient.lastVisit) return;

    const newId = `#P-${(patients.length + 1).toString().padStart(3, "0")}`;
    setPatients([...patients, { ...newPatient, id: newId }]);
    setNewPatient({ name: "", email: "", phone: "", lastVisit: "", status: "New" });
    setOpen(false);
  };

  // View selected patient
  const handleView = (patient: any) => {
    setSelectedPatient(patient);
    setViewOpen(true);
  };

  // Download patient card as PDF
  const handleDownloadPDF = (patient: any) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Patient Details", 70, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const startY = 40;
    const lineHeight = 10;
    const details = [
      ["Patient ID", patient.id],
      ["Name", patient.name],
      ["Email", patient.email],
      ["Phone", patient.phone],
      ["Last Visit", patient.lastVisit],
      ["Status", patient.status],
    ];

    details.forEach(([label, value], i) => {
      doc.text(`${label}: ${value}`, 20, startY + i * lineHeight);
    });

    doc.save(`${patient.name.replace(/\s/g, "_")}_Card.pdf`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Patients</h1>

        {/* Add New Patient Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Patient
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  placeholder="Enter patient email"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label>Last Visit</Label>
                <Input
                  type="date"
                  value={newPatient.lastVisit}
                  onChange={(e) => setNewPatient({ ...newPatient, lastVisit: e.target.value })}
                />
              </div>
              <Button className="w-full mt-2" onClick={handleAddPatient}>
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Patient List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Patient Management</h2>
        <div className="space-y-4">
          {patients.length === 0 && (
            <p className="text-muted-foreground text-sm">No patients added yet.</p>
          )}

          {patients.map((patient, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
                {patient.name.split(" ").map((n: string) => n[0]).join("")}
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
                      patient.status === "Active"
                        ? "default"
                        : patient.status === "Pending"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      patient.status === "Active"
                        ? "bg-success"
                        : patient.status === "New"
                        ? "bg-destructive"
                        : ""
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => handleView(patient)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadPDF(patient)}>
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* View Patient Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-3 mt-2">
              <p><strong>ID:</strong> {selectedPatient.id}</p>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Email:</strong> {selectedPatient.email}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
              <p><strong>Status:</strong> {selectedPatient.status}</p>

              <Button
                onClick={() => handleDownloadPDF(selectedPatient)}
                className="gap-2 w-full mt-4"
              >
                <Download className="w-4 h-4" />
                Download as PDF
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}