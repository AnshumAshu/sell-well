// src/components/AuthPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [mapUrl, setMapUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Get user's location for the map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapUrl(
          `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
        );
      },
      () => {
        // Fallback location
        setMapUrl("https://maps.google.com/maps?q=India&z=14&output=embed");
      }
    );
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignUp
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    // Prepare payload based on Sign Up / Sign In
    const payload = isSignUp
      ? formData
      : { phone: formData.phone, password: formData.password };

    try {
      const response = await axios.post(endpoint, payload);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      navigate("/dashboard"); // Redirect to dashboard after login/signup
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        {mapUrl && (
          <iframe
            width="100%"
            height="100%"
            title="map"
            src={mapUrl}
            style={{ filter: "contrast(1.2)" }}
          ></iframe>
        )}
      </div>

      <div className="container px-5 py-24 mx-auto flex">
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-sm border border-green-500 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-300"
        >
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            {isSignUp
              ? "Create your account to get started."
              : "Login to your account."}
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {isSignUp && (
            <>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={isSignUp}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
                />
              </div>

              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
                />
              </div>

              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
                />
              </div>
            </>
          )}

          {!isSignUp && (
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
              />
            </div>
          )}

          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-600 border-0 py-2 px-6 hover:bg-green-500 rounded text-lg"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-xs text-gray-500 mt-3">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-indigo-500 underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-indigo-500 underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
