interface TrafficLightProps {
  status: string;
  density: string;
}

export const TrafficLight = ({ status, density }: TrafficLightProps) => {
  const getLightClass = (color: string, isActive: boolean) => {
    const baseClass = "w-2 h-2 rounded-full transition-all duration-300";
    if (!isActive) return `${baseClass} bg-muted/50`;
    
    switch (color) {
      case "red": return `${baseClass} bg-traffic-red shadow-[0_0_8px_hsl(var(--traffic-red))]`;
      case "yellow": return `${baseClass} bg-traffic-yellow shadow-[0_0_8px_hsl(var(--traffic-yellow))]`;
      case "green": return `${baseClass} bg-traffic-green shadow-[0_0_8px_hsl(var(--traffic-green))]`;
      default: return `${baseClass} bg-muted/50`;
    }
  };

  const getDensityRing = () => {
    switch (density) {
      case "high": return "ring-2 ring-destructive/50";
      case "medium": return "ring-2 ring-warning/50";
      case "low": return "ring-2 ring-success/50";
      default: return "ring-2 ring-muted/50";
    }
  };

  return (
    <div className={`relative p-1 bg-card/90 backdrop-blur-sm rounded-lg border shadow-sm ${getDensityRing()}`}>
      <div className="flex flex-col space-y-1">
        <div className={getLightClass("red", status === "red")}></div>
        <div className={getLightClass("yellow", status === "yellow")}></div>
        <div className={getLightClass("green", status === "green")}></div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
      </div>
    </div>
  );
};