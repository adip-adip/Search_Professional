import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { toast } from "react-toastify";
import authSvc from "../auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth.context";
import LoadingComponent from "../../../component/common/loading/loading.components";

export type CredentialsType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const loginDTO = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8).required()
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth: any = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginDTO),
    mode: "onChange",
  });

  const submitEvent = async (credentials: CredentialsType) => {
    console.log(credentials)
    setLoading(true);
    try {
      const response = await authSvc.login(credentials);
      toast.success(response.message);
      navigate(`/home`);
    } catch (exception: any) {
      console.log(exception);
      toast.error(exception?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const loginCheck = async () => {
    try {
      if (auth.loggedInUser) {
        toast.success("You are already logged in");
        navigate(`/home`);
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token') || null;
    if (token) {
      loginCheck();
    }
  }, [auth]);

  return (
    <div className="min-h-screen w-full bg-[#222831] text-[#EEEEEE] flex flex-col">
      {/* Header */}
      <header className="bg-[#393E46] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-semibold">ProConnect</Link>
            <Link to="/register" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">
              Don't have an account? <span className="font-medium">Register</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#393E46] rounded-xl shadow-xl overflow-hidden p-8 md:p-10">
          <h1 className="text-2xl font-semibold text-[#EEEEEE] mb-2">Welcome Back</h1>
          <p className="text-[#EEEEEE] opacity-80 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit(submitEvent)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#EEEEEE] opacity-80 mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE] transition-all"
              />
              {errors.email && (
                <span className="text-sm text-[#FF6B6B] mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#EEEEEE] opacity-80 mb-1">Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="password"
                className="w-full px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE] transition-all"
              />
              {errors.password && (
                <span className="text-sm text-[#FF6B6B] mt-1 block">{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#00ADB5] hover:text-[#008E9B] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] font-medium rounded-lg shadow-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <LoadingComponent size="sm" className="mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-[#EEEEEE] opacity-80 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00ADB5] hover:text-[#EEEEEE] font-medium">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#393E46] py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#EEEEEE] opacity-80">&copy; {new Date().getFullYear()} ProConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;