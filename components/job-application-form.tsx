"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CheckCircle,
  User,
  Briefcase,
  FileText,
  Send,
  Eye,
  PartyPopper,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import myLogo from "../public/brightlight.jpg";

interface FormData {
  // Section 1 - Personal Info
  fullName: string;
  email: string;
  phone: string;
  education: string;
  fieldOfStudy: string;
  position: string;

  // School Teacher Questions
  teachingQualification?: string;
  teachingExperience?: string;
  subjects?: string[];
  gradeLevels?: string[];
  curriculum?: string[];
  classroomManagement?: string;
  engageStudents?: string;
  lessonPlans?: string;
  availability?: string;

  // Bus Assistant Questions
  busAssistantRole?: string;
  childExperience?: string;
  morningAfternoonAvailable?: string;
  childSafety?: string;

  // School Cleaner Questions
  schoolEnvironmentExperience?: string;
  livesNearSchool?: string;
  startAvailability?: string;

  // Child Minder Questions
  childMindingExperience?: string;
  outdoorSafety?: string;
  workWithTeacher?: string;
  multipleChildren?: string;

  // Files
  coverLetter?: File;
  resume?: File;
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Role Questions", icon: Briefcase },
  { id: 3, title: "Upload Documents", icon: Upload },
  { id: 4, title: "Review & Submit", icon: Eye },
];

const positions = [
  "School Teacher",
  "School Cleaner",
  "Bus Assistant",
  "Assistant School Teacher",
  "Child Minder",
];

const educationLevels = [
  "SSCE",
  "NCE",
  "OND",
  "HND",
  "BACHELORS DEGREE",
  "MASTER DEGREE",
];

const subjects = [
  "Mathematics",
  "English Language",
  "Science",
  "Social Studies",
  "Arts & Crafts",
  "Music",
  "Physical Education",
];

const gradeLevels = [
  "Early Years / Pre-K",
  "Kindergarten",
  "Lower Primary (Grades 1–3)",
  "Upper Primary (Grades 4–6)",
];

const curriculumOptions = [
  "British Curriculum (e.g., EYFS, Key Stages, IGCSE, A-Levels)",
  "American Curriculum",
  "Nigerian Curriculum (e.g., UBE, WAEC, NECO)",
  "International Baccalaureate (IB)",
  "Montessori",
  "Cambridge Curriculum",
  "Canadian Curriculum",
  "French Curriculum",
  "No, I haven't worked with any specific curriculum",
];

export default function JobApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    fieldOfStudy: "",
    position: "",
    subjects: [],
    gradeLevels: [],
    curriculum: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const updateFormData = (field: string, value: string | File | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.education)
        newErrors.education = "Education level is required";
      if (!formData.fieldOfStudy.trim())
        newErrors.fieldOfStudy = "Field of study is required";
      if (!formData.position) newErrors.position = "Position is required";
    }

    if (step === 2) {
      if (formData.position === "School Teacher" || formData.position === "Assistant School Teacher") {        if (!formData.teachingQualification)
          newErrors.teachingQualification = "This field is required";
        if (!formData.teachingExperience?.trim())
          newErrors.teachingExperience = "This field is required";
        if (!formData.subjects || formData.subjects.length === 0)
          newErrors.subjects = "Please select at least one subject";
        if (!formData.gradeLevels || formData.gradeLevels.length === 0)
          newErrors.gradeLevels = "Please select at least one grade level";
        if (!formData.curriculum || formData.curriculum.length === 0)
          newErrors.curriculum = "Please select at least one curriculum option";
        if (!formData.classroomManagement?.trim())
          newErrors.classroomManagement = "This field is required";
        if (!formData.engageStudents?.trim())
          newErrors.engageStudents = "This field is required";
        if (!formData.lessonPlans)
          newErrors.lessonPlans = "Please select an option";
        if (!formData.availability?.trim())
          newErrors.availability = "This field is required";
      }

      if (formData.position === "Bus Assistant") {
        if (!formData.busAssistantRole?.trim())
          newErrors.busAssistantRole = "This field is required";
        if (!formData.childExperience?.trim())
          newErrors.childExperience = "This field is required";
        if (!formData.morningAfternoonAvailable?.trim())
          newErrors.morningAfternoonAvailable = "This field is required";
        if (!formData.childSafety?.trim())
          newErrors.childSafety = "This field is required";
      }

      if (formData.position === "School Cleaner") {
        if (!formData.schoolEnvironmentExperience?.trim())
          newErrors.schoolEnvironmentExperience = "This field is required";
        if (!formData.livesNearSchool?.trim())
          newErrors.livesNearSchool = "This field is required";
        if (!formData.startAvailability?.trim())
          newErrors.startAvailability = "This field is required";
      }

      if (formData.position === "Child Minder") {
        if (!formData.childMindingExperience?.trim())
          newErrors.childMindingExperience = "This field is required";
        if (!formData.outdoorSafety?.trim())
          newErrors.outdoorSafety = "This field is required";
        if (!formData.workWithTeacher?.trim())
          newErrors.workWithTeacher = "This field is required";
        if (!formData.multipleChildren?.trim())
          newErrors.multipleChildren = "This field is required";
      }
    }

    if (step === 3) {
      if (!formData.coverLetter)
        newErrors.coverLetter = "Cover letter is required";
      if (!formData.resume) newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 0 || validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          [field]:
            "File size must be less than 10MB. Please choose a smaller file.",
        }));
        return;
      }

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }

      updateFormData(field, file);
    }
  };

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    const currentValues = (formData[field as keyof FormData] as string[]) || [];
    if (checked) {
      updateFormData(field, [...currentValues, value]);
    } else {
      updateFormData(
        field,
        currentValues.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      setIsSubmitting(true)

      try {
        // Filter formData to only include relevant fields based on position
        const filteredData: any = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          education: formData.education,
          fieldOfStudy: formData.fieldOfStudy,
          position: formData.position,
        }

        // Add position-specific fields only if they're relevant
        if (formData.position === "School Teacher" || formData.position === "Assistant School Teacher") {
          filteredData.teachingQualification = formData.teachingQualification
          filteredData.teachingExperience = formData.teachingExperience
          filteredData.subjects = formData.subjects?.join(", ")
          filteredData.gradeLevels = formData.gradeLevels?.join(", ")
          filteredData.curriculum = formData.curriculum?.join(", ")
          filteredData.classroomManagement = formData.classroomManagement
          filteredData.engageStudents = formData.engageStudents
          filteredData.lessonPlans = formData.lessonPlans
          filteredData.availability = formData.availability
        } else if (formData.position === "Bus Assistant") {
          filteredData.busAssistantRole = formData.busAssistantRole
          filteredData.childExperience = formData.childExperience
          filteredData.morningAfternoonAvailable = formData.morningAfternoonAvailable
          filteredData.childSafety = formData.childSafety
        } else if (formData.position === "School Cleaner") {
          filteredData.schoolEnvironmentExperience = formData.schoolEnvironmentExperience
          filteredData.livesNearSchool = formData.livesNearSchool
          filteredData.startAvailability = formData.startAvailability
        } else if (formData.position === "Child Minder") {
          filteredData.childMindingExperience = formData.childMindingExperience
          filteredData.outdoorSafety = formData.outdoorSafety
          filteredData.workWithTeacher = formData.workWithTeacher
          filteredData.multipleChildren = formData.multipleChildren
        }

        const form = new FormData()
        Object.entries(filteredData).forEach(([key, value]) => {
          if (value instanceof File) {
            form.append(key, value)
          } else if (value) {
            form.append(key, value as string)
          }
        })

        // Add files
        if (formData.coverLetter) {
          form.append("coverLetter", formData.coverLetter)
        }
        if (formData.resume) {
          form.append("resume", formData.resume)
        }

        const response = await fetch("https://usebasin.com/f/cab5adc1635c", {
          method: "POST",
          body: form,
          headers: { Accept: "application/json" },
        })

        if (response.ok) {
          setIsSubmitted(true)
        } else {
          const errorData = await response.json()
          console.error("Submission error:", errorData)
          alert("Something went wrong. Please try again.")
        }
      } catch (error) {
        console.error("Network error:", error)
        alert("Error submitting form.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }


  const renderWelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <Image
            src={myLogo}
            alt="EduRepublic Logo"
            width={100}
            height={30}
            className="rounded-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-white">
          Welcome to Brightlight School
        </h1>
        <p className="text-md text-white max-w-md mx-auto">
          Ready to join our educational team? Let's start your application
          journey.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-lg bg-white/5 border border-picton-blue-50">
            <User className="w-8 h-8 text-picton-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Personal Info</h3>
            <p className="text-sm text-gray-300">Tell us about yourself</p>
          </div>

          <div className="p-4 rounded-lg bg-white/20 border border-slate-50">
            <Briefcase className="w-8 h-8 text-picton-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Role Selection</h3>
            <p className="text-sm text-gray-300">Choose your position</p>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-slate-50">
            <FileText className="w-8 h-8 text-picton-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Documents</h3>
            <p className="text-sm text-gray-300">Share your credentials</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-100">
            This will take approximately 5-10 minutes
          </p>
          <p className="text-sm text-gray-300">
            All fields marked with * are required
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Section 1 of 5</h2>
        <p className="text-gray-300">Personal Information & Position</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-100 font-medium">
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData("fullName", e.target.value)}
            className={`mt-1 ${
              errors.fullName ? "border-red-500" : "border-gray-400"
            } focus:border-picton-blue-300 focus:ring-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-100 font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={`mt-1 ${
              errors.email ? "border-red-500" : "border-gray-400"
            } focus:border-picton-blue-300 focus:ring-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-100 font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className={`mt-1 ${
              errors.phone ? "border-red-500" : "border-gray-400"
            } focus:border-picton-blue-300 focus:ring-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-100 font-medium">
            Highest Level of Education *
          </Label>
          <Select
            value={formData.education}
            onValueChange={(value) => updateFormData("education", value)}
          >
            <SelectTrigger
              className={`mt-1 ${
                errors.education ? "border-red-500" : "border-gray-400"
              } focus:border-picton-blue-300 focus:ring-picton-blue-300 bg-white/10 text-white`}
            >
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.education && (
            <p className="text-red-400 text-sm mt-1">{errors.education}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fieldOfStudy" className="text-gray-100 font-medium">
            Field of Study *
          </Label>
          <Input
            id="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={(e) => updateFormData("fieldOfStudy", e.target.value)}
            className={`mt-1 ${
              errors.fieldOfStudy ? "border-red-500" : "border-gray-400"
            } focus:border-picton-blue-300 focus:ring-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
            placeholder="e.g., Education, Mathematics, English"
          />
          {errors.fieldOfStudy && (
            <p className="text-red-400 text-sm mt-1">{errors.fieldOfStudy}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-100 font-medium">
            What Position are you applying for? *
          </Label>
          <Select
            value={formData.position}
            onValueChange={(value) => updateFormData("position", value)}
          >
            <SelectTrigger
              className={`mt-1 ${
                errors.position ? "border-red-500" : "border-gray-400"
              } focus:border-picton-blue-300 focus:ring-picton-blue-300 bg-white/10 text-white`}
            >
              <SelectValue placeholder="Choose a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position && (
            <p className="text-red-400 text-sm mt-1">{errors.position}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => {
    if (!formData.position) return null;

    const getSectionNumber = () => {
      switch (formData.position) {
        case "School Teacher":
          return "Section 2 of 5";
        case "Bus Assistant":
          return "Section 3 of 5";
        case "School Cleaner":
          return "Section 4 of 5";
        case "Child Minder":
          return "Section 5 of 5";
        default:
          return "Section 2 of 5";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {getSectionNumber()}
          </h2>
          <p className="text-gray-300">{formData.position} Questions</p>
        </div>

        {(formData.position === "School Teacher" || formData.position === "Assistant School Teacher") && (
                    <div className="space-y-4">
            <div>
              <Label className="text-gray-100 font-medium">
                Do you have a valid teaching qualification or certification? *
              </Label>
              <RadioGroup
                value={formData.teachingQualification || ""}
                onValueChange={(value) =>
                  updateFormData("teachingQualification", value)
                }
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="qual-yes" />
                  <Label htmlFor="qual-yes" className="text-gray-300 font-light">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="qual-no" />
                  <Label htmlFor="qual-no" className="text-gray-300 font-light">
                    No
                  </Label>
                </div>
              </RadioGroup>
              {errors.teachingQualification && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.teachingQualification}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teachingExperience"
                className="text-gray-100 font-medium"
              >
                How many years of teaching experience do you have at the primary
                level? *
              </Label>
              <Input
                id="teachingExperience"
                value={formData.teachingExperience || ""}
                onChange={(e) =>
                  updateFormData("teachingExperience", e.target.value)
                }
                className={`mt-1 ${
                  errors.teachingExperience
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., 3 years"
              />
              {errors.teachingExperience && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.teachingExperience}
                </p>
              )}
            </div>

            <div className="mt-12">
              <Label className="text-gray-100 font-medium">
                Which subjects are you most comfortable teaching? (Select all
                that apply) *
              </Label>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={formData.subjects?.includes(subject) || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "subjects",
                          subject,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`subject-${subject}`}
                      className="text-gray-300 font-light"
                    >
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>

              {errors.subjects && (
                <p className="text-red-400 text-sm mt-1">{errors.subjects}</p>
              )}
            </div>

            <div className="mt-12">
              <Label className="text-gray-100 font-medium">
                Which grade levels are you most confident teaching? (Select all
                that apply) *
              </Label>
              <div className="mt-2 space-y-2">
                {gradeLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`grade-${level}`}
                      checked={formData.gradeLevels?.includes(level) || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "gradeLevels",
                          level,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`grade-${level}`}
                      className="text-gray-300 font-light"
                    >
                      {level}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.gradeLevels && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.gradeLevels}
                </p>
              )}
            </div>

            <div className="mt-12">
              <Label className="text-gray-100 font-medium">
                Have you previously worked with a specific curriculum? If yes,
                which one? *
              </Label>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {curriculumOptions.map((curriculum) => (
                  <div key={curriculum} className="flex items-center space-x-2">
                    <Checkbox
                      id={`curriculum-${curriculum}`}
                      checked={
                        formData.curriculum?.includes(curriculum) || false
                      }
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "curriculum",
                          curriculum,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`curriculum-${curriculum}`}
                      className="text-gray-300 font-light"
                    >
                      {curriculum}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.curriculum && (
                <p className="text-red-400 text-sm mt-1">{errors.curriculum}</p>
              )}
            </div>

            <div className="mt-12">
              <Label
                htmlFor="classroomManagement"
                className="text-gray-100 font-medium"
              >
                Describe one classroom management strategy you use effectively.
                *
              </Label>
              <Textarea
                id="classroomManagement"
                value={formData.classroomManagement || ""}
                onChange={(e) =>
                  updateFormData("classroomManagement", e.target.value)
                }
                className={`mt-1 ${
                  errors.classroomManagement
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe your classroom management strategy"
                rows={3}
              />
              {errors.classroomManagement && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.classroomManagement}
                </p>
              )}
            </div>

            <div className="mt-12">
              <Label
                htmlFor="engageStudents"
                className="text-gray-100 font-medium"
              >
                How do you engage young learners and maintain their attention
                during lessons? *
              </Label>
              <Textarea
                id="engageStudents"
                value={formData.engageStudents || ""}
                onChange={(e) =>
                  updateFormData("engageStudents", e.target.value)
                }
                className={`mt-1 ${
                  errors.engageStudents ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe how you engage young learners"
                rows={3}
              />
              {errors.engageStudents && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.engageStudents}
                </p>
              )}
            </div>

            <div className="mt-12">
              <Label className="text-gray-100 font-medium">
                Are you experienced in preparing lesson plans and assessments? *
              </Label>
              <RadioGroup
                value={formData.lessonPlans || ""}
                onValueChange={(value) => updateFormData("lessonPlans", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="lesson-yes" />
                  <Label htmlFor="lesson-yes" className="text-gray-300 font-light">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="lesson-no" />
                  <Label htmlFor="lesson-no" className="text-gray-300 font-light">
                    No
                  </Label>
                </div>
              </RadioGroup>
              {errors.lessonPlans && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.lessonPlans}
                </p>
              )}
            </div>

            <div className="mt-12">
              <Label
                htmlFor="availability"
                className="text-gray-100 font-medium"
              >
                Are you available for immediate employment or do you require
                notice? *
              </Label>
              <Input
                id="availability"
                value={formData.availability || ""}
                onChange={(e) => updateFormData("availability", e.target.value)}
                className={`mt-1 ${
                  errors.availability ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Available immediately / 2 weeks notice required"
              />
              {errors.availability && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.availability}
                </p>
              )}
            </div>
          </div>
        )}

        {formData.position === "Bus Assistant" && (
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="busAssistantRole"
                className="text-gray-100 font-medium"
              >
                What do you understand to be the role of a school bus assistant?
                *
              </Label>
              <Textarea
                id="busAssistantRole"
                value={formData.busAssistantRole || ""}
                onChange={(e) =>
                  updateFormData("busAssistantRole", e.target.value)
                }
                className={`mt-1 ${
                  errors.busAssistantRole ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe your understanding of the bus assistant role"
                rows={4}
              />
              {errors.busAssistantRole && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.busAssistantRole}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="childExperience"
                className="text-gray-100 font-medium"
              >
                Do you have experience working with children or in a school
                environment? *
              </Label>
              <Textarea
                id="childExperience"
                value={formData.childExperience || ""}
                onChange={(e) =>
                  updateFormData("childExperience", e.target.value)
                }
                className={`mt-1 ${
                  errors.childExperience ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe your experience with children"
                rows={3}
              />
              {errors.childExperience && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.childExperience}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="morningAfternoonAvailable"
                className="text-gray-100 font-medium"
              >
                Are you available early in the morning and in the afternoons for
                school runs? *
              </Label>
              <Input
                id="morningAfternoonAvailable"
                value={formData.morningAfternoonAvailable || ""}
                onChange={(e) =>
                  updateFormData("morningAfternoonAvailable", e.target.value)
                }
                className={`mt-1 ${
                  errors.morningAfternoonAvailable
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Yes, available 6:30 AM - 8:30 AM and 2:00 PM - 4:00 PM"
              />
              {errors.morningAfternoonAvailable && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.morningAfternoonAvailable}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="childSafety"
                className="text-gray-100 font-medium"
              >
                How do you make sure children are safely seated and behaving
                well during the ride? *
              </Label>
              <Textarea
                id="childSafety"
                value={formData.childSafety || ""}
                onChange={(e) => updateFormData("childSafety", e.target.value)}
                className={`mt-1 ${
                  errors.childSafety ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe your approach to ensuring child safety and good behavior"
                rows={4}
              />
              {errors.childSafety && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.childSafety}
                </p>
              )}
            </div>
          </div>
        )}

        {formData.position === "School Cleaner" && (
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="schoolEnvironmentExperience"
                className="text-gray-100 font-medium"
              >
                Have you worked in a school or child-focused environment before?
                *
              </Label>
              <Input
                id="schoolEnvironmentExperience"
                value={formData.schoolEnvironmentExperience || ""}
                onChange={(e) =>
                  updateFormData("schoolEnvironmentExperience", e.target.value)
                }
                className={`mt-1 ${
                  errors.schoolEnvironmentExperience
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Yes, worked at ABC Primary School for 2 years"
              />
              {errors.schoolEnvironmentExperience && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.schoolEnvironmentExperience}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="livesNearSchool"
                className="text-gray-100 font-medium"
              >
                Do you live close to the school (Ajah/Badore area)? *
              </Label>
              <Input
                id="livesNearSchool"
                value={formData.livesNearSchool || ""}
                onChange={(e) =>
                  updateFormData("livesNearSchool", e.target.value)
                }
                className={`mt-1 ${
                  errors.livesNearSchool ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Yes, I live in Ajah"
              />
              {errors.livesNearSchool && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.livesNearSchool}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="startAvailability"
                className="text-gray-100 font-medium"
              >
                How soon are you available to start? *
              </Label>
              <Input
                id="startAvailability"
                value={formData.startAvailability || ""}
                onChange={(e) =>
                  updateFormData("startAvailability", e.target.value)
                }
                className={`mt-1 ${
                  errors.startAvailability
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Immediately / 1 week notice"
              />
              {errors.startAvailability && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.startAvailability}
                </p>
              )}
            </div>
          </div>
        )}

        {formData.position === "Child Minder" && (
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="childMindingExperience"
                className="text-gray-100 font-medium"
              >
                Can you tell me about your previous experience working with
                children? *
              </Label>
              <Textarea
                id="childMindingExperience"
                value={formData.childMindingExperience || ""}
                onChange={(e) =>
                  updateFormData("childMindingExperience", e.target.value)
                }
                className={`mt-1 ${
                  errors.childMindingExperience
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe your experience working with children"
                rows={4}
              />
              {errors.childMindingExperience && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.childMindingExperience}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="outdoorSafety"
                className="text-gray-100 font-medium"
              >
                How do you ensure the safety of children when they are playing
                outside? *
              </Label>
              <Textarea
                id="outdoorSafety"
                value={formData.outdoorSafety || ""}
                onChange={(e) =>
                  updateFormData("outdoorSafety", e.target.value)
                }
                className={`mt-1 ${
                  errors.outdoorSafety ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="Describe your approach to outdoor safety"
                rows={4}
              />
              {errors.outdoorSafety && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.outdoorSafety}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="workWithTeacher"
                className="text-gray-100 font-medium"
              >
                Can you work alongside a teacher or assistant in a classroom
                setting? *
              </Label>
              <Input
                id="workWithTeacher"
                value={formData.workWithTeacher || ""}
                onChange={(e) =>
                  updateFormData("workWithTeacher", e.target.value)
                }
                className={`mt-1 ${
                  errors.workWithTeacher ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Yes, I work well in team environments"
              />
              {errors.workWithTeacher && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.workWithTeacher}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="multipleChildren"
                className="text-gray-100 font-medium"
              >
                Are you comfortable working with more than one child at a time?
                *
              </Label>
              <Input
                id="multipleChildren"
                value={formData.multipleChildren || ""}
                onChange={(e) =>
                  updateFormData("multipleChildren", e.target.value)
                }
                className={`mt-1 ${
                  errors.multipleChildren ? "border-red-500" : "border-gray-400"
                } focus:border-picton-blue-300 bg-white/10 text-white placeholder:text-gray-300`}
                placeholder="e.g., Yes, I can manage groups of up to 10 children"
              />
              {errors.multipleChildren && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.multipleChildren}
                </p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Upload your documents
        </h2>
        <p className="text-gray-300">
          Please upload your cover letter and CV/Resume
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-100 font-medium">
            Kindly upload your cover letter in PDF or Word format *
          </Label>
          <div
            className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              errors.coverLetter
                ? "border-red-400 bg-red-900/20"
                : "border-gray-400 hover:border-picton-blue-300 hover:bg-picton-blue-900/20"
            }`}
          >
            <input
              ref={(el) => (fileInputRefs.current["coverLetter"] = el)}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                handleFileUpload("coverLetter", e.target.files?.[0] || null)
              }
              className="hidden"
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-300 mb-2">
              {formData.coverLetter
                ? formData.coverLetter.name
                : "Click to upload cover letter"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRefs.current["coverLetter"]?.click()}
              className="border-picton-blue-300 text-picton-blue-300 hover:bg-picton-blue-900/20 bg-transparent"
            >
              {formData.coverLetter ? "Change File" : "Choose File"}
            </Button>
            <p className="text-sm text-gray-400 mt-2">
              PDF, DOC, or DOCX (max 10MB)
            </p>
          </div>
          {errors.coverLetter && (
            <p className="text-red-400 text-sm mt-1">{errors.coverLetter}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-100 font-medium">
            Kindly upload your CV/Resume in PDF or Word format *
          </Label>
          <div
            className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              errors.resume
                ? "border-red-400 bg-red-900/20"
                : "border-gray-400 hover:border-picton-blue-300 hover:bg-picton-blue-900/20"
            }`}
          >
            <input
              ref={(el) => (fileInputRefs.current["resume"] = el)}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                handleFileUpload("resume", e.target.files?.[0] || null)
              }
              className="hidden"
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-300 mb-2">
              {formData.resume
                ? formData.resume.name
                : "Click to upload CV/Resume"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRefs.current["resume"]?.click()}
              className="border-picton-blue-300 text-picton-blue-300 hover:bg-picton-blue-900/20 bg-transparent"
            >
              {formData.resume ? "Change File" : "Choose File"}
            </Button>
            <p className="text-sm text-gray-400 mt-2">
              PDF, DOC, or DOCX (max 10MB)
            </p>
          </div>
          {errors.resume && (
            <p className="text-red-400 text-sm mt-1">{errors.resume}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderReviewScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Review Your Application
        </h2>
        <p className="text-gray-300">
          Please review all information before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white/5 rounded-lg p-4 border border-gray-400">
          <h3 className="text-lg font-semibold text-picton-blue-300 mb-3">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Full Name:</span>
              <p className="text-white font-medium">{formData.fullName}</p>
            </div>
            <div>
              <span className="text-gray-400">Email:</span>
              <p className="text-white font-medium">{formData.email}</p>
            </div>
            <div>
              <span className="text-gray-400">Phone:</span>
              <p className="text-white font-medium">{formData.phone}</p>
            </div>
            <div>
              <span className="text-gray-400">Education:</span>
              <p className="text-white font-medium">{formData.education}</p>
            </div>
            <div>
              <span className="text-gray-400">Field of Study:</span>
              <p className="text-white font-medium">{formData.fieldOfStudy}</p>
            </div>
            <div>
              <span className="text-gray-400">Position:</span>
              <p className="text-white font-medium">{formData.position}</p>
            </div>
          </div>
        </div>

        {/* Position-specific Information */}
        <div className="bg-white/5 rounded-lg p-4 border border-gray-400">
          <h3 className="text-lg font-semibold text-picton-blue-300 mb-3">
            Position-Specific Responses
          </h3>
          <div className="space-y-3 text-sm">
            {formData.position === "School Teacher" && (
              <>
                <div>
                  <span className="text-gray-400">Teaching Qualification:</span>
                  <p className="text-white">{formData.teachingQualification}</p>
                </div>
                <div>
                  <span className="text-gray-400">Teaching Experience:</span>
                  <p className="text-white">{formData.teachingExperience}</p>
                </div>
                <div>
                  <span className="text-gray-400">Subjects:</span>
                  <p className="text-white">{formData.subjects?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-gray-400">Grade Levels:</span>
                  <p className="text-white">
                    {formData.gradeLevels?.join(", ")}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Curriculum Experience:</span>
                  <p className="text-white">
                    {formData.curriculum?.join(", ")}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">
                    Lesson Plans Experience:
                  </span>
                  <p className="text-white">{formData.lessonPlans}</p>
                </div>
                <div>
                  <span className="text-gray-400">Availability:</span>
                  <p className="text-white">{formData.availability}</p>
                </div>
              </>
            )}

            {formData.position === "Bus Assistant" && (
              <>
                <div>
                  <span className="text-gray-400">Understanding of Role:</span>
                  <p className="text-white">{formData.busAssistantRole}</p>
                </div>

                <div>
                  <span className="text-gray-400">Child Experience:</span>
                  <p className="text-white">{formData.childExperience}</p>
                </div>

                <div>
                  <span className="text-gray-400">
                    Morning/Afternoon Availability:
                  </span>
                  <p className="text-white">
                    {formData.morningAfternoonAvailable}
                  </p>
                </div>


                <div>
                  <span className="text-gray-400">Child Safety:</span>
                  <p className="text-white">{formData.childSafety}</p>
                </div>

              </>
            )}

            {formData.position === "School Cleaner" && (
              <>
                <div>
                  <span className="text-gray-400">
                    School Environment Experience:
                  </span>
                  <p className="text-white">
                    {formData.schoolEnvironmentExperience}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Lives Near School:</span>
                  <p className="text-white">{formData.livesNearSchool}</p>
                </div>
                <div>
                  <span className="text-gray-400">Start Availability:</span>
                  <p className="text-white">{formData.startAvailability}</p>
                </div>
              </>
            )}

            {formData.position === "Child Minder" && (
              <>
                <div>
                  <span className="text-gray-400">
                    Child Minding Experience:
                  </span>
                  <p className="text-white">
                    {formData.childMindingExperience}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">
                    Outdoor Safety Approach:
                  </span>
                  <p className="text-white">{formData.outdoorSafety}</p>
                </div>
                <div>
                  <span className="text-gray-400">Work with Teacher:</span>
                  <p className="text-white">{formData.workWithTeacher}</p>
                </div>
                <div>
                  <span className="text-gray-400">Multiple Children:</span>
                  <p className="text-white">{formData.multipleChildren}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white/5 rounded-lg p-4 border border-gray-400">
          <h3 className="text-lg font-semibold text-picton-blue-300 mb-3">
            Uploaded Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Cover Letter:</span>
              <p className="text-white font-medium">
                {formData.coverLetter?.name}
              </p>
            </div>
            <div>
              <span className="text-gray-400">CV/Resume:</span>
              <p className="text-white font-medium">{formData.resume?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-picton-blue-900/20 border border-picton-blue-300/30 rounded-lg p-4">
        <p className="text-picton-blue-200 text-sm">
          By submitting this application, you confirm that all information
          provided is accurate and complete.
        </p>
      </div>
    </motion.div>
  );

  const renderSuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-picton-blue-300/20 border border-picton-blue-300/30">
            <PartyPopper className="w-16 h-16 text-picton-blue-300" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">
          Application Submitted!
        </h1>
        <p className="text-lg text-gray-200 max-w-md mx-auto">
          Thank you for applying to Brightlight School. We've received your
          application successfully.
        </p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-gray-400 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-picton-blue-300 mb-3">
          What's Next?
        </h3>
        <div className="space-y-3 text-sm text-gray-100">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-picton-blue-300 mt-0.5 flex-shrink-0" />
            <p>We'll review your application within 3-5 business days</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-picton-blue-300 mt-0.5 flex-shrink-0" />
            <p>You'll receive an email confirmation shortly</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-picton-blue-300 mt-0.5 flex-shrink-0" />
            <p>If selected, we'll contact you for an interview</p>
          </div>
        </div>
      </div>


    </motion.div>
  );

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="backdrop-blur-md bg-white/20 shadow-xl rounded-2xl p-8 border border-gray-400">
          {renderSuccessScreen()}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Progress Steps - Only show when not on welcome screen */}
      {currentStep > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-picton-blue-300 border-picton-blue-300 text-gray-900"
                        : isActive
                        ? "border-picton-blue-300 text-picton-blue-300 bg-transparent"
                        : "border-gray-400 text-gray-400 bg-transparent"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                        currentStep > step.id
                          ? "bg-picton-blue-300"
                          : "bg-gray-400"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-300">
              Step {currentStep} of {steps.length}:{" "}
              {steps[currentStep - 1].title}
            </p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <Card className="backdrop-blur-md bg-white/10 shadow-xl rounded-2xl p-8 border border-gray-400">
        <AnimatePresence mode="wait">
          {currentStep === 0 && renderWelcomeScreen()}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderReviewScreen()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-400">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 border-slate-50 text-gray-100 hover:bg-gray-200/20 disabled:opacity-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === 0 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-cerise-400 hover:bg-cerise-300 text-gray-900 border-0 font-medium px-8"
            >
              Start Application
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : currentStep < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2  bg-cerise-400 hover:bg-cerise-300 text-gray-900 border-0 font-medium"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : currentStep === 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-picton-blue-300 hover:bg-picton-blue-400 text-gray-900 border-0 font-medium"
            >
              Review Application
              <Eye className="w-4 h-4" />
            </Button>
          ) : (
            <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-picton-blue-300 hover:bg-picton-blue-400 text-gray-900 border-0 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-gray-900 border-t-transparent rounded-full" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
