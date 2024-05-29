import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
    accountType: "client",
    additionalInfo: {},
  });
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const { mutate, isError, isLoading, error: mutationError } = useMutation({
    mutationFn: async ({ email, username, fullName, password, accountType, additionalInfo }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password, accountType, additionalInfo }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create account");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
		e.preventDefault();
		mutate(formData);
	};


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdditionalInfoChange = (e) => {
    setFormData({
      ...formData,
      additionalInfo: { ...formData.additionalInfo, [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      {/* Left section with logo */}
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <Link to="/" className="flex items-center justify-center rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg active:opacity-85 disabled:pointer-events-none disabled:opacity-50">
          <div className="bg-yellow-400 p-2">
            <svg fill="#FFFFFF" width="18px" height="18px" viewBox="0 0 431.771 431.771">
              <path d="M332.314,239.837c2.292,6.147,8.154,10.219,14.711,10.219h69.044c8.664,0,15.701-7.029,15.701-15.701 c0-8.66-7.037-15.701-15.701-15.701h-58.144L326.647,134.7c-2.236-6.014-7.927-10.057-14.335-10.215 c-6.455-0.134-12.282,3.619-14.811,9.506l-28.236,65.866L232.733,63.702c-1.884-7.077-8.491-11.936-15.726-11.621 c-7.309,0.26-13.471,5.534-14.853,12.717l-43.703,226.947L127.473,169.25c-1.688-6.658-7.494-11.447-14.349-11.834 c-6.899-0.294-13.167,3.749-15.577,10.169l-22.506,60.018H15.699C7.025,227.603,0,234.631,0,243.304 c0,8.664,7.025,15.7,15.699,15.7h70.214c6.546,0,12.403-4.063,14.704-10.198l8.706-23.22l35.962,142.256 c1.773,6.993,8.057,11.862,15.214,11.862c0.156,0,0.307,0,0.463-0.008c7.356-0.217,13.573-5.507,14.966-12.728l44.15-229.239 l30.612,114.021c1.731,6.464,7.358,11.116,14.046,11.598c6.561,0.433,12.908-3.326,15.537-9.474l30.629-71.471L332.314,239.837z"/>
            </svg>
          </div>
          <div className="bg-blue-500 text-white p-2 font-bold">
            Medplus<sup>+</sup>
          </div>
        </Link>
      </div>

      {/* Right section with form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 mt-2">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              required
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 mt-2">
            <MdDriveFileRenameOutline />
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              name="fullName"
              onChange={handleInputChange}
              value={formData.fullName}
              required
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 mt-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </label>

          <label className="mt-4">
            <span>Account Type:</span>
            <select
              name="accountType"
              className="input input-bordered rounded mt-2 w-full"
              onChange={handleInputChange}
              value={formData.accountType}
              required
            >
              <option value="client">Client</option>
              <option value="professional">Professional</option>
              <option value="institution">Institution</option>
            </select>
          </label>

          {formData.accountType !== "client" && (
            <>
              {formData.accountType === "professional" && (
                <>
                  <label className="input input-bordered rounded flex items-center gap-2 mt-2">
                    <span>Professional Title</span>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Professional Title"
                      name="professionalTitle"
                      onChange={handleAdditionalInfoChange}
                      value={formData.additionalInfo.professionalTitle || ""}
                      required
                    />
                  </label>
                  <label className="input input-bordered rounded flex items-center gap-2 mt-2">
                    <span>Specialties</span>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Specialties (comma separated)"
                      name="specialties"
                      onChange={handleAdditionalInfoChange}
                      value={formData.additionalInfo.specialties || ""}
                      required
                    />
                  </label>
                </>
              )}
              {formData.accountType === "institution" && (
                <label className="input input-bordered rounded flex items-center gap-2 mt-2">
                  <span>Institution Name</span>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Institution Name"
                    name="institutionName"
                    onChange={handleAdditionalInfoChange}
                    value={formData.additionalInfo.institutionName || ""}
                    required
                  />
                </label>
              )}
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>

          {error && (
            <div className="text-red-500 text-center mt-2">
              Error: {error}
            </div>
          )}

          {isError && (
            <div className="text-red-500 text-center mt-2">
              Error: {mutationError.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
