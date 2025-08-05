import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Droplets, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Phone,
  User,
  Calendar,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BloodRequest {
  bloodType: string;
  urgency: string;
  unitsNeeded: string;
  patientName: string;
  contactNumber: string;
  hospital: string;
  address: string;
  requiredBy: string;
  additionalInfo: string;
}

const BloodRequestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BloodRequest>({
    bloodType: "",
    urgency: "",
    unitsNeeded: "",
    patientName: "",
    contactNumber: "",
    hospital: "",
    address: "",
    requiredBy: "",
    additionalInfo: ""
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (Within 2 hours)", color: "destructive" },
    { value: "urgent", label: "Urgent (Within 6 hours)", color: "warning" },
    { value: "routine", label: "Routine (Within 24 hours)", color: "success" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Blood Request Submitted",
      description: "Your request has been sent to nearby donors and blood banks.",
    });

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      bloodType: "",
      urgency: "",
      unitsNeeded: "",
      patientName: "",
      contactNumber: "",
      hospital: "",
      address: "",
      requiredBy: "",
      additionalInfo: ""
    });
  };

  const updateFormData = (field: keyof BloodRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getUrgencyBadge = (urgency: string) => {
    const level = urgencyLevels.find(l => l.value === urgency);
    return level ? (
      <Badge variant={level.color as any} className="ml-2">
        {level.label}
      </Badge>
    ) : null;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-hero text-white shadow-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Droplets className="h-6 w-6" />
            Blood Request Form
          </CardTitle>
          <p className="text-white/80">
            Submit your blood requirement and we'll notify nearby donors instantly
          </p>
        </CardHeader>
      </Card>

      {/* Form */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blood Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Droplets className="h-5 w-5 text-medical-red" />
                Blood Requirements
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type *</Label>
                  <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitsNeeded">Units Needed *</Label>
                  <Input
                    id="unitsNeeded"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="e.g., 2"
                    value={formData.unitsNeeded}
                    onChange={(e) => updateFormData("unitsNeeded", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Urgency Level *</Label>
                <div className="space-y-2">
                  {urgencyLevels.map(level => (
                    <div 
                      key={level.value}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                        formData.urgency === level.value 
                          ? 'border-primary bg-primary/5 shadow-soft' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => updateFormData("urgency", level.value)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="urgency"
                          value={level.value}
                          checked={formData.urgency === level.value}
                          className="text-primary"
                          readOnly
                        />
                        <span className="font-medium">{level.label}</span>
                        <Badge variant={level.color as any}>{level.value.toUpperCase()}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-medical-blue" />
                Patient Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChange={(e) => updateFormData("patientName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactNumber}
                    onChange={(e) => updateFormData("contactNumber", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital/Medical Center *</Label>
                <Input
                  id="hospital"
                  placeholder="Enter hospital name"
                  value={formData.hospital}
                  onChange={(e) => updateFormData("hospital", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address with landmarks"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requiredBy">Required By *</Label>
                <Input
                  id="requiredBy"
                  type="datetime-local"
                  value={formData.requiredBy}
                  onChange={(e) => updateFormData("requiredBy", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional details, medical conditions, or special requirements"
                  value={formData.additionalInfo}
                  onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                variant="emergency" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Blood Request
                  </>
                )}
              </Button>
              
              {formData.urgency && (
                <div className="mt-2 text-center">
                  {getUrgencyBadge(formData.urgency)}
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-muted/50 shadow-soft">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div className="text-sm">
              <p className="font-medium">Need immediate help?</p>
              <p className="text-muted-foreground">Call our 24/7 helpline: <span className="font-semibold text-primary">1800-BLOOD-1</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodRequestForm;