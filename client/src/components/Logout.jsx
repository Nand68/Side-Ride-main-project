import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("/api/logout");
      if (res.ok) {
        toast.success("Logout success");
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={logout}
      className="flex items-center space-x-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 transition-all duration-200"
    >
      <LogOut className="w-4 h-4" />
      <span>Sign Out</span>
    </button>
  );
};

export default Logout;
