import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  Droplets, 
  Heart, 
  Calendar, 
  User,
  Menu,
  X,
  Phone
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "request", label: "Request Blood", icon: Droplets },
    { id: "donate", label: "Become Donor", icon: Heart },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "profile", label: "Profile", icon: User }
  ];

  const handleViewChange = (view: string) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block fixed top-4 left-4 right-4 z-50 shadow-strong bg-card/95 backdrop-blur-sm border-2">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ThalAI+
              </h1>
              <p className="text-xs text-muted-foreground">Thalassemia Support</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange(item.id)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <Button variant="emergency" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Emergency
          </Button>
        </div>
      </Card>

      {/* Mobile Navigation */}
      <Card className="md:hidden fixed top-4 left-4 right-4 z-50 shadow-strong bg-card/95 backdrop-blur-sm border-2">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              ThalAI+
            </h1>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-card/95 backdrop-blur-sm">
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange(item.id)}
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
              <Button variant="emergency" size="sm" className="w-full justify-start gap-3">
                <Phone className="h-4 w-4" />
                Emergency Helpline
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Mobile Bottom Navigation */}
      <Card className="md:hidden fixed bottom-4 left-4 right-4 z-50 shadow-strong bg-card/95 backdrop-blur-sm border-2">
        <div className="flex items-center justify-around p-2">
          {navigationItems.slice(0, 4).map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewChange(item.id)}
              className="flex flex-col items-center gap-1 h-auto p-2"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Navigation;