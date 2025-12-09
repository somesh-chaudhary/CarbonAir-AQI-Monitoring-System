import React from 'react';
import { BarChart3, Trophy, AlertTriangle, User, Settings, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export type ViewType = 'dashboard' | 'rankings' | 'alerts' | 'profile';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, className }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className={cn("hidden lg:flex flex-col w-64 border-r h-[calc(100vh-4rem)] sticky top-16 bg-card/50 backdrop-blur-sm", className)}>
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "secondary" : "ghost"}
            className={cn("w-full justify-start", currentView === item.id && "bg-secondary font-medium")}
            onClick={() => onViewChange(item.id as ViewType)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
      
      <div className="mt-auto p-4 border-t space-y-4">
         <div className="px-4 py-2">
           <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
             <Leaf className="h-4 w-4 text-green-500" />
             <span>My Contribution</span>
           </div>
           <div className="h-2 bg-secondary rounded-full overflow-hidden">
             <div className="h-full bg-green-500 w-[70%]" />
           </div>
           <p className="text-xs text-muted-foreground mt-1">70% to daily goal</p>
         </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <h4 className="font-bold text-sm mb-1">CarbonAir Premium</h4>
          <p className="text-xs text-blue-100 mb-3">Get detailed historical reports & health alerts.</p>
          <Button size="sm" variant="secondary" className="w-full text-xs hover:bg-white/90">Upgrade Plan</Button>
        </div>
      </div>
    </div>
  );
};
