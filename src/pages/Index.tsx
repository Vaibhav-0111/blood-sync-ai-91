import { useState } from "react";
import Navigation from "@/components/Navigation";
import PatientDashboard from "@/components/PatientDashboard";
import BloodRequestForm from "@/components/BloodRequestForm";
import DonorRegistration from "@/components/DonorRegistration";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <PatientDashboard />;
      case "request":
        return <BloodRequestForm />;
      case "donate":
        return <DonorRegistration />;
      case "schedule":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Schedule Management</h2>
            <p className="text-muted-foreground">Coming soon in Phase 2...</p>
          </div>
        );
      case "profile":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="text-muted-foreground">Coming soon in Phase 2...</p>
          </div>
        );
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content */}
      <main className="pt-24 pb-20 md:pb-8 px-4 max-w-7xl mx-auto">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;