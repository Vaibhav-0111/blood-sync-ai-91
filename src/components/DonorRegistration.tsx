import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  User, 
  MapPin, 
  Phone, 
  Shield, 
  CheckCircle,
  Calendar,
  Droplets
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonorData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  weight: string;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  lastDonation: string;
  medicalConditions: string;
  medications: string;
  availability: string[];
  emergencyContact: string;
  consentTerms: boolean;
  consentData: boolean;
}

const DonorRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DonorData>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    weight: "",
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    lastDonation: "",
    medicalConditions: "",
    medications: "",
    availability: [],
    emergencyContact: "",
    consentTerms: false,
    consentData: false
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const availabilityOptions = [
    "Weekdays (Mon-Fri)",
    "Weekends (Sat-Sun)",
    "Emergency Only",
    "Anytime"
  ];

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Medical Info", icon: Heart },
    { id: 3, title: "Availability", icon: Calendar },
    { id: 4, title: "Consent", icon: Shield }
  ];

  const updateFormData = (field: keyof DonorData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    if (checked) {
      updateFormData("availability", [...formData.availability, option]);
    } else {
      updateFormData("availability", formData.availability.filter(item => item !== option));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Registration Successful!",
      description: "Welcome to ThalAI+ donor community. You'll receive verification confirmation soon.",
    });

    setIsSubmitting(false);
    setCurrentStep(1);
    
    // Reset form
    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      bloodType: "",
      weight: "",
      contactNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      lastDonation: "",
      medicalConditions: "",
      medications: "",
      availability: [],
      emergencyContact: "",
      consentTerms: false,
      consentData: false
    });
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.gender && 
               formData.bloodType && formData.weight && formData.contactNumber;
      case 2:
        return formData.address && formData.city;
      case 3:
        return formData.availability.length > 0;
      case 4:
        return formData.consentTerms && formData.consentData;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-secondary text-white shadow-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Heart className="h-6 w-6" />
            Become a Blood Donor Hero
          </CardTitle>
          <p className="text-white/80">
            Join our community of life-savers and help thalassemia patients in need
          </p>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-medical-blue" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Blood Type *</Label>
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
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="45"
                      placeholder="Minimum 45 kg"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
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
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Medical Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-medical-red" />
                  Address & Medical Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={(e) => updateFormData("state", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={(e) => updateFormData("pincode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastDonation">Last Blood Donation (if any)</Label>
                    <Input
                      id="lastDonation"
                      type="date"
                      value={formData.lastDonation}
                      onChange={(e) => updateFormData("lastDonation", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      placeholder="List any medical conditions, allergies, or health issues"
                      value={formData.medicalConditions}
                      onChange={(e) => updateFormData("medicalConditions", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="List any medications you're currently taking"
                      value={formData.medications}
                      onChange={(e) => updateFormData("medications", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Availability */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-medical-green" />
                  Availability Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>When are you available for donation? *</Label>
                    {availabilityOptions.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.availability.includes(option)}
                          onCheckedChange={(checked) => handleAvailabilityChange(option, checked as boolean)}
                        />
                        <Label htmlFor={option} className="text-sm font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="+91 98765 43210"
                      value={formData.emergencyContact}
                      onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                    />
                  </div>

                  {formData.availability.length > 0 && (
                    <div className="p-4 bg-success-light rounded-lg">
                      <p className="text-sm font-medium text-success-foreground">Selected Availability:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.availability.map(item => (
                          <Badge key={item} variant="success">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Consent */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-medical-orange" />
                  Terms & Consent
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consentTerms"
                        checked={formData.consentTerms}
                        onCheckedChange={(checked) => updateFormData("consentTerms", checked)}
                      />
                      <Label htmlFor="consentTerms" className="text-sm">
                        I agree to the <span className="text-primary underline cursor-pointer">Terms and Conditions</span> and confirm that all information provided is accurate.
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consentData"
                        checked={formData.consentData}
                        onCheckedChange={(checked) => updateFormData("consentData", checked)}
                      />
                      <Label htmlFor="consentData" className="text-sm">
                        I consent to sharing my contact information with verified blood recipients and medical institutions for emergency blood requests.
                      </Label>
                    </div>
                  </div>

                  <div className="bg-primary-light/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Important Guidelines:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Donors must be 18-65 years old and weigh at least 45kg</li>
                      <li>• Maintain 56 days gap between blood donations</li>
                      <li>• Undergo health screening before each donation</li>
                      <li>• Can donate blood every 3-4 months safely</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="success"
                  disabled={!isStepValid(4) || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Registration
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorRegistration;