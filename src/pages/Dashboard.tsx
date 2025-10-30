import { Users, Calendar, ListTodo, Pill, Bell, MessageSquare } from "lucide-react";
import StatCard from "@/components/StatCard";
import RoleBadges from "@/components/RoleBadges";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppointments } from "@/context/AppointmentsContext"; // ✅ use your context here

export default function Dashboard() {
  // ✅ Get appointments from context
  const { appointments } = useAppointments();

  // ✅ Filter upcoming appointments dynamically
  const upcomingAppointments = appointments.filter((apt) => apt.status !== "Completed");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <RoleBadges activeRole="Doctor" />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 ml-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">Dr. Alex Morgan</p>
              <p className="text-xs text-muted-foreground">Cardiologist</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              AM
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value="1,248"
          icon={Users}
          iconColor="bg-blue-100 text-primary"
          trend={{ value: "12% from last month", positive: true }}
        />
        <StatCard
          title="Today's Appointments"
          value={appointments.length.toString()}
          subtitle={`Completed: ${
            appointments.filter((a) => a.status === "Completed").length
          }/${appointments.length}`}
          icon={Calendar}
          iconColor="bg-green-100 text-success"
        />
        <StatCard
          title="Pending Tasks"
          value="8"
          subtitle="4 high priority"
          icon={ListTodo}
          iconColor="bg-amber-100 text-warning"
        />
        <StatCard
          title="Prescriptions"
          value="42"
          subtitle="3 awaiting approval"
          icon={Pill}
          iconColor="bg-purple-100 text-violet-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Overview */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Appointments Overview</h2>
            <Badge variant="outline">This Month</Badge>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-secondary/50">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 min-h-[400px]">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="border-r border-b last:border-r-0 p-2 hover:bg-secondary/30 cursor-pointer transition-colors"
                >
                  <span className="text-sm text-muted-foreground">{((i % 31) + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ✅ Upcoming Appointments (Dynamic) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Upcoming Appointments</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              No upcoming appointments.
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((apt, idx) => (
                <div key={idx} className="p-4 rounded-lg border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{apt.patient}</p>
                      <p className="text-sm text-muted-foreground">{apt.type}</p>
                    </div>
                    <Badge
                      variant={apt.status === "Confirmed" ? "default" : "secondary"}
                      className={apt.status === "Confirmed" ? "bg-success" : ""}
                    >
                      {apt.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {apt.date} — {apt.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}