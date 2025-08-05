import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Calendar, 
  Pill, 
  Activity, 
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Droplets
} from "lucide-react";

interface PatientData {
  name: string;
  bloodType: string;
  nextTransfusion: string;
  lastTransfusion: string;
  hemoglobinLevel: number;
  medications: Array<{ name: string; time: string; taken: boolean }>;
  upcomingAppointments: Array<{ doctor: string; date: string; type: string }>;
}

const PatientDashboard = () => {
  const [patientData] = useState<PatientData>({
    name: "Rahul Sharma",
    bloodType: "B+",
    nextTransfusion: "2024-01-15",
    lastTransfusion: "2024-01-01",
    hemoglobinLevel: 8.2,
    medications: [
      { name: "Deferasirox", time: "9:00 AM", taken: true },
      { name: "Folic Acid", time: "2:00 PM", taken: false },
      { name: "Vitamin D", time: "8:00 PM", taken: false },
    ],
    upcomingAppointments: [
      { doctor: "Dr. Priya Singh", date: "Jan 15", type: "Transfusion" },
      { doctor: "Dr. Amit Kumar", date: "Jan 22", type: "Check-up" },
    ]
  });

  const getHemoglobinStatus = (level: number) => {
    if (level < 7) return { status: "Critical", color: "destructive" };
    if (level < 9) return { status: "Low", color: "warning" };
    return { status: "Stable", color: "success" };
  };

  const hemoglobinStatus = getHemoglobinStatus(patientData.hemoglobinLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white shadow-strong">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {patientData.name}</h1>
            <p className="text-white/80 mt-1">Managing your thalassemia care</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{patientData.bloodType}</div>
            <div className="text-white/80 text-sm">Blood Type</div>
          </div>
        </div>
      </div>

      {/* Emergency SOS */}
      <Card className="border-2 border-destructive/20 bg-gradient-to-r from-destructive/5 to-destructive/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <h3 className="font-semibold text-destructive">Emergency Blood Request</h3>
                <p className="text-sm text-muted-foreground">Need urgent blood? Tap SOS</p>
              </div>
            </div>
            <Button variant="emergency" size="lg" className="font-semibold">
              SOS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Status */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-5 w-5 text-medical-red" />
              Hemoglobin Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{patientData.hemoglobinLevel} g/dL</div>
                <Badge variant={hemoglobinStatus.color as any} className="mt-1">
                  {hemoglobinStatus.status}
                </Badge>
              </div>
              <div className="w-16 h-16">
                <Progress 
                  value={(patientData.hemoglobinLevel / 15) * 100} 
                  className="rotate-90 origin-center"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Droplets className="h-5 w-5 text-medical-blue" />
              Next Transfusion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 15</div>
            <p className="text-sm text-muted-foreground mt-1">In 3 days</p>
            <Button variant="secondary" size="sm" className="mt-3 w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Heart className="h-5 w-5 text-medical-green" />
              Treatment Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 days</div>
            <p className="text-sm text-muted-foreground mt-1">Great consistency!</p>
            <div className="w-full bg-muted rounded-full h-2 mt-3">
              <div className="bg-success h-2 rounded-full w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medications */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-medical-blue" />
            Today's Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patientData.medications.map((med, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                med.taken 
                  ? 'bg-success-light border-success/30' 
                  : 'bg-card border-border hover:shadow-soft'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${med.taken ? 'bg-success' : 'bg-muted'}`} />
                <div>
                  <div className="font-medium">{med.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {med.time}
                  </div>
                </div>
              </div>
              <Button 
                variant={med.taken ? "success" : "outline"} 
                size="sm"
                disabled={med.taken}
              >
                {med.taken ? "Taken" : "Take"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-medical-orange" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patientData.upcomingAppointments.map((appointment, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{appointment.doctor}</div>
                  <div className="text-sm text-muted-foreground">{appointment.type}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{appointment.date}</div>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;