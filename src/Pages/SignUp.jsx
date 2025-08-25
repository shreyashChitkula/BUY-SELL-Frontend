import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserState } from "../utils/UserState";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

function SignUp() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const { registerUser } = useUserState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    contactNumber: "",
    password: "",
  });

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const [message, setMessage] = useState(""); // To display success or error message

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent the default form submission behavior

  //   try {
  //     const response = await fetch("http://localhost:3000/api/users/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData), // Send the form data as JSON
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       setMessage("User registered successfully!");
  //       console.log("response", response, "result", result);
  //       registerUser({ ...result.user, loggedIn: true });
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         age: "",
  //         email: "",
  //         contactNumber: "",
  //         password: "",
  //       });
  //       navigate("/");
  //     } else {
  //       setMessage(result.error || "An error occurred during sign-up.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessage("Failed to register. Please try again later.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData, // Automatically stringified by axios
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies)
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("User registered successfully!");
        console.log("response", response);
        registerUser({ ...response.data.user, loggedIn: true });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          email: "",
          contactNumber: "",
          password: "",
        });

        // Navigate to home
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error || "An error occurred during sign-up.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="signupForm">
      <div>
        <div className="min-h-screen flex justify-center items-center">
          <div className="p-8 flex-1">
            <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
              <div className="relative h-48 bg-rose-500 rounded-bl-4xl">
                <svg
                  className="absolute bottom-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Create an account
                </h1>
                <form className="mt-12" onSubmit={handleSubmit}>
                  {/* First Name */}
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="First Name"
                      required
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="mt-6 relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="Last Name"
                      required
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>

                  {/* Age */}
                  <div className="mt-6 relative">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="Age"
                      min="0"
                      max="100"
                      required
                    />
                    <label
                      htmlFor="age"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Age
                    </label>
                  </div>

                  {/* Email */}
                  <div className="mt-6 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="Email (e.g., john@iiit.ac.in)"
                      pattern="[a-zA-Z0-9._%+-]+@iiit\.ac\.in"
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email (IIIT Only)
                    </label>
                  </div>

                  {/* Contact Number */}
                  <div className="mt-6 relative">
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="text"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="1234567890"
                      maxLength="10"
                      required
                    />
                    <label
                      htmlFor="contactNumber"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Contact Number
                    </label>
                  </div>

                  {/* Password */}
                  <div className="mt-6 relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                      required
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  {/* <div className="mt-10 relative">
                    <ReCAPTCHA
                      className="peer place-items-center h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      sitekey="6LfvXMoqAAAAADCCx0joMH8FQPRMEciQdeLdAkF5"
                      onChange={onChange}
                    />
                  </div> */}

                  <input
                  // disabled={!verified}
                    type="submit"
                    value="Sign Up"
                    className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
                  />
                </form>

                {/* Message Display */}
                {message && (
                  <p className="mt-4 text-center text-sm text-gray-600">
                    {message}
                  </p>
                )}

               <Link
                  to="/signIn"
                  className="mt-4 block text-sm text-center font-medium text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
