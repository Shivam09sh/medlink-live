import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Appointments() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Robert Chen</SelectItem>
                    <SelectItem value="2">Lisa Ray</SelectItem>
                    <SelectItem value="3">James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Enter appointment reason" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">Save Appointment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Appointment List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { patient: "Sarah Johnson", date: "2025-10-30", time: "09:00 AM", type: "Check-up", status: "Confirmed" },
                { patient: "Michael Chen", date: "2025-10-30", time: "10:30 AM", type: "Follow-up", status: "Confirmed" },
                { patient: "Emma Wilson", date: "2025-10-30", time: "02:00 PM", type: "Consultation", status: "Pending" },
              ].map((apt, idx) => (
                <tr key={idx} className="border-b hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4 font-medium">{apt.patient}</td>
                  <td className="py-4 px-4 text-muted-foreground">{apt.date}</td>
                  <td className="py-4 px-4 text-muted-foreground">{apt.time}</td>
                  <td className="py-4 px-4 text-muted-foreground">{apt.type}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        apt.status === "Confirmed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
