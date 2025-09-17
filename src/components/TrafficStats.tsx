import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, MapPin, Users, TrendingUp, TrendingDown } from "lucide-react";

interface TrafficStatsProps {
  systemStatus: {
    activeSignals: number;
    emergencyVehicles: number;
    averageWaitTime: number;
    systemHealth: number;
  };
}

export const TrafficStats = ({ systemStatus }: TrafficStatsProps) => {
  const stats = [
    {
      label: "Active Signals",
      value: systemStatus.activeSignals,
      icon: MapPin,
      color: "text-primary",
      change: "+2",
      trend: "up"
    },
    {
      label: "Emergency Vehicles",
      value: systemStatus.emergencyVehicles,
      icon: Users,
      color: "text-emergency",
      change: "-1",
      trend: "down"
    },
    {
      label: "Avg Wait Time",
      value: `${Math.round(systemStatus.averageWaitTime)}s`,
      icon: Clock,
      color: "text-warning",
      change: "-5s",
      trend: "down"
    },
    {
      label: "System Health",
      value: `${systemStatus.systemHealth}%`,
      icon: Activity,
      color: "text-success",
      change: "+1%",
      trend: "up"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">System Overview</h3>
      
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-center space-x-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-success" />
              )}
              <span className="text-xs text-success">{stat.change}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          
          {stat.label === "System Health" && (
            <Progress 
              value={systemStatus.systemHealth} 
              className="mt-2 h-2"
            />
          )}
        </Card>
      ))}

      {/* Real-time Activity */}
      <Card className="p-4">
        <h4 className="font-medium mb-3 flex items-center">
          <Activity className="h-4 w-4 mr-2 text-primary" />
          Live Activity
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Signal Updates</span>
            <span className="font-medium">24/min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Route Optimizations</span>
            <span className="font-medium">12/min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Emergency Responses</span>
            <span className="font-medium">3 active</span>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Performance</h4>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Traffic Flow</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Response Time</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">AI Accuracy</span>
              <span className="text-sm font-medium">96%</span>
            </div>
            <Progress value={96} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};