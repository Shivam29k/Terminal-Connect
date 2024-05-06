import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(()=>{
    token && navigate("/dashboard");
  }, [token])
  // navigate('/');
  return (
    <div className="flex bg-[#1C1C1C] text-[#3ECF8E] min-h-[100vh] w-full items-center flex-col gap-3">
      <Navbar />
      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold">Welcome to Terminal-Connect</h1>
        <p>Connect to your terminal from anywhere in the world</p>
      </div>

    </div>
  )
}

export default Home