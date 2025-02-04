import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch("/api/admin/logout");
      if (res.ok) {
        toast.success("Logout success");
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return <button onClick={logout} className="text-xl font-bold">Logout</button>;
};

export default AdminLogout;