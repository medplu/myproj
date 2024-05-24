import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Logo from "../../../components/nav/Logo";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isLoading, isError, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (data.accountType === "professional" && data.doctorInfo) {
        navigate("/doctors-page", { state: { doctorInfo: data.doctorInfo, doctorId: data.doctorInfo.userId } });
      } else {
        navigate("/landing");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <Logo className="btn" />
          <h1 className="text-4xl font-extrabold text-white">Let's go.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">Don't have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
