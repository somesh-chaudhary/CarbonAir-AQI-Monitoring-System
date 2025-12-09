import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Bell,
  Trash2,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Alert {
  id: string;
  city: string;
  threshold: number;
  condition: "above" | "below";
}

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      city: "Bangalore",
      threshold: 100,
      condition: "above",
    },
    {
      id: "2",
      city: "Delhi",
      threshold: 200,
      condition: "above",
    },
  ]);
  const [newCity, setNewCity] = useState("");
  const [newThreshold, setNewThreshold] = useState("100");

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity) {
      toast.error("Please enter a city name");
      return;
    }

    const newAlert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      city: newCity,
      threshold: parseInt(newThreshold),
      condition: "above",
    };

    setAlerts([...alerts, newAlert]);
    setNewCity("");
    toast.success("Alert created successfully");
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
    toast.info("Alert deleted");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Alerts & Notifications
          </h2>
          <p className="text-muted-foreground">
            Manage your air quality thresholds.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
            <CardDescription>
              Get notified when AQI exceeds specific levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAddAlert}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="city">City Name</Label>
                <Input
                  id="city"
                  placeholder="e.g. Mumbai"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">
                    AQI Threshold
                  </Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newThreshold}
                    onChange={(e) =>
                      setNewThreshold(e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select defaultValue="above">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">
                        Above
                      </SelectItem>
                      <SelectItem value="below">
                        Below
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Create Alert
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Bell className="h-4 w-4" /> Active Alerts
          </h3>
          {alerts.length === 0 ? (
            <div className="text-center p-8 border rounded-lg border-dashed text-muted-foreground">
              No active alerts. Create one to get started.
            </div>
          ) : (
            alerts.map((alert) => (
              <Card
                key={alert.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {alert.city}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Alert when AQI &gt; {alert.threshold}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteAlert(alert.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};