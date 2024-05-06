import { InputFeild } from "./InputFeild";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BarLoader } from "react-spinners";
import { coustomAlert } from "./coustomAlert";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp";
import { BsInfoCircleFill } from "react-icons/bs";

interface SignupInput {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface SigninInput {
  username: string;
  password: string;
}

function Auth({ type }: { type: "signup" | "signin" }) {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({} as SignupInput);
  const [otpCard, setOtpCard] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const sendOtp = (event:any) => {
    event.preventDefault();
    setLoading(true)
    axios
      .post(`${BACKEND_URL}/api/browser/request-otp`, {
        email: postInputs.email,
        name: postInputs.name
      })
      .then(() => {
        coustomAlert("success", "Otp sent to email");
        setOtpCard(true);
        setLoading(false)
      })
      .catch((err) => {
        coustomAlert("error", err.response.data.error);
      });
  };

  const verifyOtp = (event: any) => {
    setLoading(true)
    if (otp.length != 6) {
      return coustomAlert("error", "Please enter a valid otp");
    }
    axios
      .post(`${BACKEND_URL}/api/browser/verify-otp`, {
        email: postInputs.email,
        otp: otp,
      })
      .then(() => {
        coustomAlert("success", "Otp verified");
        handleSubmit(event);
        setLoading(false);
      })
      .catch((err) => {
        coustomAlert("error", err.response.data.message);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (type == "signup") {
      setLoading(true);
      axios
        .post(`${BACKEND_URL}/api/browser/${type}`, postInputs)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          coustomAlert("success", "User created Successfully.");
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          coustomAlert("error", err.response.data.error);
          console.log(err);
        });
    } else {
      const signinInput: SigninInput = {
        username: postInputs.username,
        password: postInputs.password,
      };
      setLoading(true);
      axios
        .post(`${BACKEND_URL}/api/browser/signin`, signinInput)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          // alert("User signed in successfully");
          coustomAlert("success", "User signed in successfully.");
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          // alert("Error signing in user");
          coustomAlert("error", err.response.data.error);
          console.log(err);
        });
    }
  };

  return (
    <div className="overflow-hidden items-center text-slate-700  w-[28rem] border  rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-1  transition-all duration-300  border-gray-300">
      <BarLoader color="#36d7b7" width={500} loading={loading} height={5} />
      {otpCard ? (
        <>
          <div className="h-96 flex items-center justify-center flex-col gap-5 text-lg text-black">
            <p className="w-5/6 text-center">Enter the OTP Sent on Email {postInputs.email}</p>
            <p className="text-sm italic flex items-center gap-2 top-2">  <BsInfoCircleFill/> OTP valid for only 5 Minutes <button onClick={sendOtp} className="underline italic">resend OTP</button></p>
            <InputOTP maxLength={6} onChange={(e)=>setOtp(e)} >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <button
              onClick={verifyOtp}
              className="bg-slate-700 hover:bg-black px-6 text-white py-2 rounded-md text-xl mt-4 shadow hover:shadow-lg hover:-translate-y-1 transition-all font-semibold"
            > Verify Otp </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center  flex-col gap-5  p-6 px-3 sm:px-6">
            <div className="flex items-center  w-full gap-2 border rounded-full p-2 bg-slate-200">
              <a
                className="bg-slate-200 rounded-full h-10 w-10 flex items-center justify-center   hover:shadow-md hover:scale-105 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <FaHome className="" size={25} />
              </a>
              <IoIosArrowForward size={25} />
              <div className="text-2xl font-bold text-center">
                {type == "signup" ? "Create an account" : "Sign in to account"}
              </div>
            </div>

            <form
              className="mt-2 w-full flex flex-col gap-3"
              onSubmit={type == "signup" ? sendOtp : handleSubmit}
            >
              {type == "signup" && (
                <>
                  <InputFeild
                    label="Fullname"
                    placeholder="Enter your name"
                    type="text"
                    autocomplete="name"
                    onChange={(e) => {
                      setPostInputs({
                        ...postInputs,
                        name: e.target.value,
                      });
                    }}
                  />
                  <InputFeild
                    label="Email"
                    placeholder="abc@example.com"
                    type="email"
                    autocomplete="email"
                    onChange={(e) => {
                      setPostInputs({
                        ...postInputs,
                        email: e.target.value,
                      });
                    }}
                  />
                </>
              )}

              <InputFeild
                label="Username"
                placeholder={
                  type == "signup"
                    ? "Create an unique username"
                    : "Enter your username"
                }
                type="text"
                autocomplete="username"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />
              <InputFeild
                label="Password"
                placeholder="********"
                type="password"
                autocomplete="current-password"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />

              <button
                type="submit"
                className="bg-slate-700 hover:bg-black text-white py-2 rounded-md text-xl mt-4 shadow hover:shadow-lg hover:-translate-y-1 transition-all font-semibold"
              >
                {type == "signup" ? "Sign up" : "Sign in"}
              </button>
            </form>

            <div className="text-slate-500 text-center">
              {type == "signup"
                ? "Already have an account ?"
                : "Don't have an account ?"}{" "}
              <a
                onClick={() =>
                  navigate(type == "signup" ? "/signin" : "/signup")
                }
                className="text-blue-500 underline hover:text-blue-700 transition-all font-medium cursor-pointer"
              >
                {type == "signup" ? "Sign in" : "Sign up"}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
