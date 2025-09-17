import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Truck, Siren, Navigation } from "lucide-react";

interface EmergencyVehicle {
  id: string;
  type: "ambulance" | "fire" | "police";
  location: string;
  priority: "high" | "medium" | "low";
  eta: number;
  route: string;
}

export const EmergencyPanel = () => {
  const [emergencyVehicles] = useState<EmergencyVehicle[]>([
    {
      id: "amb-001",
      type: "ambulance",
      location: "Main St & 3rd Ave",
      priority: "high",
      eta: 2,
      route: "Route to General Hospital"
    },
    {
      id: "fire-002", 
      type: "fire",
      location: "Central Blvd & Oak",
      priority: "high",
      eta: 4,
      route: "Route to 1st Ave Emergency"
    },
    {
      id: "pol-003",
      type: "police",
      location: "Park Ave & Elm",
      priority: "medium", 
      eta: 6,
      route: "Patrol Route Alpha"
    }
  ]);

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "ambulance": return Truck;
      case "fire": return AlertTriangle;
      case "police": return Siren;
      default: return Truck;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-emergency border-emergency";
      case "medium": return "text-warning border-warning";
      case "low": return "text-muted-foreground border-muted";
      default: return "text-muted-foreground border-muted";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-emergency" />
          Emergency Response
        </h3>
        <Badge variant="destructive" className="animate-pulse">
          {emergencyVehicles.length} Active
        </Badge>
      </div>

      {/* Emergency Actions */}
      <div className="mb-4">
        <Button 
          variant="destructive" 
          className="w-full mb-2 bg-gradient-emergency border-0"
        >
          <Siren className="h-4 w-4 mr-2" />
          Emergency Override
        </Button>
        <Button variant="outline" className="w-full text-xs">
          Clear All Lanes
        </Button>
      </div>

      {/* Active Vehicles */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Active Vehicles</h4>
        {emergencyVehicles.map((vehicle) => {
          const Icon = getVehicleIcon(vehicle.type);
          return (
            <div key={vehicle.id} className="p-3 rounded-lg bg-emergency/5 border border-emergency/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-emergency" />
                  <span className="text-sm font-medium capitalize">{vehicle.type}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getPriorityColor(vehicle.priority)}`}
                >
                  {vehicle.priority}
                </Badge>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{vehicle.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="font-medium">{vehicle.eta} min</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Navigation className="h-3 w-3 mr-1" />
                  <span className="truncate">{vehicle.route}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 text-xs border-emergency/30 text-emergency hover:bg-emergency/10"
              >
                Clear Path
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};