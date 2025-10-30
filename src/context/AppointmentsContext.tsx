import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of an appointment
export interface Appointment {
  patient: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

// Define what the context will provide
interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
}

// Create the context
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const AppointmentsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom hook to use context easily
export const useAppointments = (): AppointmentsContextType => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentsProvider");
  }
  return context;
};