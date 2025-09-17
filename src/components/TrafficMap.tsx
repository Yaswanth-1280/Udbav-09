import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrafficLight } from "./TrafficLight";
import { EmergencyVehicle } from "./EmergencyVehicle";
import { Navigation, ZoomIn, ZoomOut, Layers } from "lucide-react";

interface TrafficNode {
  id: string;
  x: number;
  y: number;
  type: "signal" | "emergency" | "congestion";
  status: string;
  density: "low" | "medium" | "high";
}

export const TrafficMap = () => {
  const [nodes, setNodes] = useState<TrafficNode[]>([
    { id: "signal-1", x: 25, y: 20, type: "signal", status: "green", density: "medium" },
    { id: "signal-2", x: 65, y: 35, type: "signal", status: "red", density: "high" },
    { id: "signal-3", x: 45, y: 60, type: "signal", status: "yellow", density: "low" },
    { id: "signal-4", x: 75, y: 75, type: "signal", status: "green", density: "medium" },
    { id: "emergency-1", x: 30, y: 40, type: "emergency", status: "active", density: "high" },
    { id: "emergency-2", x: 80, y: 25, type: "emergency", status: "responding", density: "medium" }
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    // Simulate traffic signal changes and vehicle movement
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (node.type === "signal") {
          // Cycle through traffic light states
          const states = ["green", "yellow", "red"];
          const currentIndex = states.indexOf(node.status);
          const nextIndex = (currentIndex + 1) % states.length;
          return { ...node, status: states[nextIndex] };
        }
        if (node.type === "emergency") {
          // Move emergency vehicles
          return {
            ...node,
            x: (node.x + (Math.random() - 0.5) * 2) % 100,
            y: (node.y + (Math.random() - 0.5) * 2) % 100
          };
        }
        return node;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getDensityColor = (density: string) => {
    switch (density) {
      case "high": return "bg-destructive/20 border-destructive";
      case "medium": return "bg-warning/20 border-warning";
      case "low": return "bg-success/20 border-success";
      default: return "bg-muted/20 border-border";
    }
  };

  return (
    <Card className="p-4 h-[600px] relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live Traffic Map</h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Real-time
          </Badge>
          <div className="flex space-x-1">
            <ZoomIn className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
            <ZoomOut className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
            <Layers className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
        </div>
      </div>

      {/* Map Grid */}
      <div className="relative w-full h-[500px] bg-secondary/20 rounded-lg overflow-hidden border">
        
        {/* Street Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {/* Horizontal streets */}
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="0" y1="35%" x2="100%" y2="35%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Vertical streets */}
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="45%" y1="0" x2="45%" y2="100%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="65%" y1="0" x2="65%" y2="100%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="hsl(var(--border))" strokeWidth="2" />
        </svg>

        {/* Traffic Density Overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[10%] bg-destructive/10 rounded-lg border border-destructive/30"></div>
          <div className="absolute top-[55%] left-[40%] w-[25%] h-[8%] bg-warning/10 rounded-lg border border-warning/30"></div>
          <div className="absolute top-[70%] right-[15%] w-[20%] h-[6%] bg-success/10 rounded-lg border border-success/30"></div>
        </div>

        {/* Traffic Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
              selectedNode === node.id ? "z-20 scale-125" : "z-10"
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
          >
            {node.type === "signal" && (
              <TrafficLight status={node.status} density={node.density} />
            )}
            {node.type === "emergency" && (
              <EmergencyVehicle status={node.status} />
            )}
          </div>
        ))}

        {/* Selected Node Info */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="p-3 bg-card/95 backdrop-blur-sm border-primary/50 shadow-glow">
              {(() => {
                const node = nodes.find(n => n.id === selectedNode);
                if (!node) return null;
                
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={node.type === "emergency" ? "destructive" : "secondary"}>
                        {node.type === "emergency" ? "Emergency Vehicle" : "Traffic Signal"}
                      </Badge>
                      <Badge variant="outline" className={getDensityColor(node.density).split(' ')[0]}>
                        {node.density} density
                      </Badge>
                    </div>
                    <p className="text-sm">
                      Status: <span className="font-medium">{node.status}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Location: {Math.round(node.x)}°, {Math.round(node.y)}°
                    </p>
                  </div>
                );
              })()}
            </Card>
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4">
          <Card className="p-3 bg-card/95 backdrop-blur-sm">
            <h4 className="text-xs font-medium mb-2">Traffic Density</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-success/40 border border-success"></div>
                <span className="text-xs">Low</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-warning/40 border border-warning"></div>
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-destructive/40 border border-destructive"></div>
                <span className="text-xs">High</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};