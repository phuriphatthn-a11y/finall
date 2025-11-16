import { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "user" && password === "pass") {
      sessionStorage.setItem("isLogin", "true");
      window.location.href = "/";
    } else {
      alert("❌ Incorrect Login!");
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #0011aa, #000000 80%)",
      }}
    >
      {/* ⭐ Animated stars background */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}

      {/* ⭐ Login Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-10 rounded-2xl shadow-2xl backdrop-blur-md"
        style={{
          width: "420px",
          background:
            "linear-gradient(135deg, rgba(0,200,255,0.3), rgba(255,0,200,0.25))",
          border: "2px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 35px rgba(255,0,255,0.4)",
        }}
      >
        <h1 className="text-center text-3xl font-bold mb-2 text-white drop-shadow-lg">
          LOGIN SYSTEM
        </h1>
        <p className="text-center text-sm text-purple-200 mb-6">
          ACCESS GRANTED INTERFACE v2.9.1
        </p>

        {/* Username */}
        <input
          type="text"
          placeholder="Enter Username..."
          className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-purple-200 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password..."
          className="w-full p-3 rounded-lg mb-6 bg-white/20 text-white placeholder-purple-200 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
