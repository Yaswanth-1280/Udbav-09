import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrafficMap } from "@/components/TrafficMap";
import { TrafficStats } from "@/components/TrafficStats";
import { EmergencyPanel } from "@/components/EmergencyPanel";
import { TrafficSignalPanel } from "@/components/TrafficSignalPanel";
import { AlertTriangle, MapPin, Activity, Users } from "lucide-react";

interface SystemAlert {
  id: string;
  type: "emergency" | "congestion" | "signal";
  message: string;
  location: string;
  timestamp: Date;
}

const Index = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: "1",
      type: "emergency",
      message: "Emergency vehicle approaching Main St & 5th Ave",
      location: "Main St & 5th Ave",
      timestamp: new Date()
    },
    {
      id: "2", 
      type: "congestion",
      message: "Heavy traffic detected on Central Blvd",
      location: "Central Blvd",
      timestamp: new Date()
    }
  ]);

  const [systemStatus, setSystemStatus] = useState({
    activeSignals: 24,
    emergencyVehicles: 3,
    averageWaitTime: 45,
    systemHealth: 98
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        averageWaitTime: Math.max(20, Math.min(90, prev.averageWaitTime + (Math.random() - 0.5) * 10)),
        emergencyVehicles: Math.max(0, Math.min(8, prev.emergencyVehicles + (Math.random() > 0.7 ? 1 : -1)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Traffic Control</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Urban Traffic Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-success border-success/50">
                System Online
              </Badge>
              <Badge variant="secondary">
                {systemStatus.systemHealth}% Health
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-6 grid grid-cols-12 gap-6">
        
        {/* Left Sidebar - Controls */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <TrafficSignalPanel />
          <EmergencyPanel />
          
          {/* System Alerts */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
              Active Alerts
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-start justify-between">
                    <Badge 
                      variant={alert.type === "emergency" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{alert.message}</p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {alert.location}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center - Map */}
        <div className="col-span-12 lg:col-span-6">
          <TrafficMap />
        </div>

        {/* Right Sidebar - Stats */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <TrafficStats systemStatus={systemStatus} />
          
          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Emergency Mode
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Optimize Routes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;