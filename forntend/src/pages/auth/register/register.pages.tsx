import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authSvc from "../auth.service";

export type RegisterDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  title: string;
  industry: string;
  location: string;
  experience: string;
  skills: string[];
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const registerSchema = Yup.object({
    name: Yup.string().min(2).required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    title: Yup.string().required("Professional title is required"),
    industry: Yup.string().required("Industry is required"),
    location: Yup.string().required("Location is required"),
    experience: Yup.string().required("Experience level is required"),
    skills: Yup.array()
      .of(Yup.string().required())
      .required("Skills are required")
      .min(3, "At least 3 skills are required"),
  });

  const {control,register,handleSubmit,setValue,formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      title: "",
      industry: "",
      location: "",
      experience: "",
      skills: [],
    },
  });

  const addSkill = () => {
    const trimmed = currentSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updatedSkills = [...skills, trimmed];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills, { shouldValidate: true });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills, { shouldValidate: true });
  };

  const submitHandle = async (data: RegisterDataType) => {
    try {
      const response = await authSvc.register(data);
      console.log(response);
      toast.success("registered sucessfully activate your account")
      navigate("/")
    } catch(exception){
      console.log(exception);
      // toast.error(exception?.data?.message)
    } finally{
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-[#222831] text-[#EEEEEE] flex flex-col">
      {/* Header */}
      <header className="bg-[#393E46] shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold">ProConnect</Link>
          <Link to="/" className="text-[#EEEEEE] hover:text-[#00ADB5]">
            Already a member? <span className="font-medium">Sign In</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#393E46] rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Panel */}
            <div className="hidden md:block md:w-1/3 bg-[#222831] p-8 flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Join Our Network</h2>
                <p className="opacity-80 mb-6">
                  Connect with professionals across industries and grow your opportunities
                </p>
                <div className="flex justify-center">
                  <div className="h-1 w-16 bg-[#00ADB5]"></div>
                </div>
              </div>
              <div className="mt-10 space-y-4">
                {["Create your profile", "Get verified", "Start connecting"].map((step, i) => (
                  <div className="flex items-center" key={i}>
                    <div className="h-10 w-10 rounded-full bg-[#00ADB5] flex items-center justify-center text-white mr-4">
                      {i + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-2/3 p-8 md:p-12">
              <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
              <p className="opacity-80 mb-8">Fill in your details to get started</p>

              <form onSubmit={handleSubmit(submitHandle)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <InputField label="Full Name" error={errors.name?.message}>
                    <input {...register("name")} className={inputClass(errors.name)} />
                  </InputField>

                  <InputField label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email")} className={inputClass(errors.email)} />
                  </InputField>

                  <InputField label="Password" error={errors.password?.message}>
                    <input type="password" {...register("password")} className={inputClass(errors.password)} />
                  </InputField>

                  <InputField label="Confirm Password" error={errors.confirmPassword?.message}>
                    <input type="password" {...register("confirmPassword")} className={inputClass(errors.confirmPassword)} />
                  </InputField>

                  <InputField label="Professional Title" error={errors.title?.message}>
                    <input {...register("title")} className={inputClass(errors.title)} />
                  </InputField>

                  <InputField label="Industry" error={errors.industry?.message}>
                    <select {...register("industry")} className={inputClass(errors.industry)}>
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                  </InputField>

                  <InputField label="Location" error={errors.location?.message}>
                    <input {...register("location")} className={inputClass(errors.location)} />
                  </InputField>

                  <InputField label="Experience Level" error={errors.experience?.message}>
                    <select {...register("experience")} className={inputClass(errors.experience)}>
                      <option value="">Select Experience</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-7 years">5-7 years</option>
                      <option value="7-10 years">7-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </InputField>
                </div>

                {/* Skills Input */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Skills (Add at least 3)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      className={inputClass()}
                      placeholder="Type a skill and press Add"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-6 py-3 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] rounded transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#222831] text-[#00ADB5]"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-[#EEEEEE] hover:text-[#00ADB5]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.skills.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] font-medium rounded shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Create Professional Profile"}
                  </button>
                </div>

                <div className="text-center opacity-80 text-sm">
                  Already have an account?{" "}
                  <Link to="/" className="text-[#00ADB5] hover:text-[#EEEEEE] font-medium">
                    Sign in here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#393E46] py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="opacity-80">
            &copy; {new Date().getFullYear()} ProConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// 🔧 Helpers
const inputClass = (error?: any) =>
  `w-full px-4 py-3 bg-[#222831] border ${
    error ? "border-red-500" : "border-[#393E46]"
  } rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE] transition-all`;

const InputField = ({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default RegisterPage;
