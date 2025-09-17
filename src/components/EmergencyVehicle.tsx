import { Truck } from "lucide-react";

interface EmergencyVehicleProps {
  status: string;
}

export const EmergencyVehicle = ({ status }: EmergencyVehicleProps) => {
  return (
    <div className="relative">
      <div className={`p-2 rounded-lg border-2 transition-all duration-300 ${
        status === "active" 
          ? "bg-emergency/20 border-emergency shadow-emergency animate-pulse" 
          : "bg-destructive/20 border-destructive/50"
      }`}>
        <Truck className={`h-4 w-4 ${
          status === "active" ? "text-emergency" : "text-destructive"
        }`} />
      </div>
      
      {/* Priority indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emergency animate-ping"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emergency"></div>
      
      {/* Direction indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-emergency"></div>
      </div>
    </div>
  );
};