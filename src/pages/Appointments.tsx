import React, { useState } from "react";
import { useAppointments } from "@/context/AppointmentsContext";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewAppointment {
  patient: string;
  date: string;
  time: string;
  reason: string;
}

export default function Appointments() {
  const { appointments, addAppointment } = useAppointments();
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    patient: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleSave = () => {
    if (!newAppointment.patient || !newAppointment.date || !newAppointment.time) {
      alert("Please fill all required fields");
      return;
    }

    const formattedTime = new Date(`1970-01-01T${newAppointment.time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    addAppointment({
      patient: newAppointment.patient,
      date: newAppointment.date,
      time: formattedTime,
      type: newAppointment.reason || "General",
      status: "Pending",
    });

    setNewAppointment({ patient: "", date: "", time: "", reason: "" });
    setOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Patient Name</Label>
                <Input
                  value={newAppointment.patient}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, patient: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
              <div>
                <Label>Reason</Label>
                <Textarea
                  value={newAppointment.reason}
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                Save Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        {appointments.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No appointments yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt, index) => (
                <tr key={index}>
                  <td>{apt.patient}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>{apt.type}</td>
                  <td>{apt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}