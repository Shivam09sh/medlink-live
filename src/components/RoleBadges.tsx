import { Badge } from "@/components/ui/badge";

interface RoleBadgesProps {
  activeRole?: string;
}

const roles = [
  { name: "Super Admin", color: "bg-violet-500 hover:bg-violet-600" },
  { name: "Doctor", color: "bg-emerald-500 hover:bg-emerald-600" },
  { name: "Nurse", color: "bg-amber-500 hover:bg-amber-600" },
  { name: "Patient", color: "bg-rose-500 hover:bg-rose-600" },
];

export default function RoleBadges({ activeRole = "Doctor" }: RoleBadgesProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {roles.map((role) => (
        <Badge
          key={role.name}
          className={`${role.color} text-white border-0 px-4 py-1.5 cursor-pointer transition-all ${
            role.name === activeRole ? "shadow-lg scale-105" : "opacity-70"
          }`}
        >
          {role.name}
        </Badge>
      ))}
    </div>
  );
}
