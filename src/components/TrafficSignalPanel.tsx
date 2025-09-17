import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings, Play, Pause, RotateCcw } from "lucide-react";

export const TrafficSignalPanel = () => {
  const [autoMode, setAutoMode] = useState(true);
  const [signalTiming, setSignalTiming] = useState([45]);
  const [isRunning, setIsRunning] = useState(true);

  const signalStates = [
    { id: "main-5th", location: "Main St & 5th Ave", status: "green", timing: 23 },
    { id: "central-oak", location: "Central Blvd & Oak", status: "red", timing: 15 },
    { id: "park-elm", location: "Park Ave & Elm", status: "yellow", timing: 3 },
    { id: "first-pine", location: "1st St & Pine", status: "green", timing: 31 }
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Traffic Signals
        </h3>
        <Badge variant={autoMode ? "secondary" : "outline"}>
          {autoMode ? "AUTO" : "MANUAL"}
        </Badge>
      </div>

      {/* Control Settings */}
      <div className="space-y-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto Mode</span>
          <Switch checked={autoMode} onCheckedChange={setAutoMode} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Signal Timing</span>
            <span className="text-sm font-medium">{signalTiming[0]}s</span>
          </div>
          <Slider
            value={signalTiming}
            onValueChange={setSignalTiming}
            max={90}
            min={15}
            step={5}
            className="w-full"
            disabled={autoMode}
          />
        </div>

        <div className="flex space-x-2">
          <Button
            variant={isRunning ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1"
          >
            {isRunning ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Signal Status List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Active Signals</h4>
        {signalStates.map((signal) => (
          <div key={signal.id} className="p-2 rounded-lg bg-secondary/30 border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">{signal.location}</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  signal.status === 'green' ? 'border-traffic-green text-traffic-green' :
                  signal.status === 'yellow' ? 'border-traffic-yellow text-traffic-yellow' :
                  'border-traffic-red text-traffic-red'
                }`}
              >
                {signal.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Next change in</span>
              <span className="text-xs font-medium">{signal.timing}s</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};