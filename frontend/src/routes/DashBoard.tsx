import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { chatAtom } from "../store/atoms/chat";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { coustomAlert } from "../components/coustomAlert";

function DashBoard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  !token && navigate("/");

  return (
    <div className="bg-[#1C1C1C] text-[#3ECF8E] min-h-[100vh] px-4 lg:px-28 py-24">
      <Navbar />
      <div className="flex justify-center mb-6">
        <Welcome />
      </div>
      <div className="md:grid grid-cols-7">
        <UserChat className="col-span-5" />
        <UserAccInfo className="col-span-2" />
      </div>
    </div>
  );
}

function Welcome() {
  const [user, _] = useRecoilState(userAtom);
  return (
    <div className="p-2 px-3 shadow-md shadow-white/10 pl-1 rounded-full bg-[#292929] w-fit ">
      <span className=" rounded-full bg-green-500/10 p-1.5">{user.name}</span>{" "}
      <span className="text-slate-400">This is your dashboard</span>
    </div>
  );
}

function UserAccInfo({ className: classx }: { className?: string }) {
  const [user, _] = useRecoilState(userAtom);
  return (
    <div
      className={`${classx} bg-[#333333] mt-6 ml-1 rounded-md overflow-auto text-pretty  break-words `}
    >
      <div className="border-b p-2 border-gray-400">
        <h3 className="text-white font-bold">{user.name}</h3>
        <p className="text-xs">{user.email}</p>
        <p className="text-xs">@{user.username}</p>
      </div>
      <div className="text-white p-2 border-b border-gray-400">
        <h3 className="text-white font-bold">Credits: {user.credits}</h3>
        <p className="text-xs italic">1 message = 1 credit</p>
      </div>
      <div className="p-2">
        <p className="font-bold text-white">Get Credits</p>
        <div className="flex flex-col gap-2 mt-2">
          <PlanCard name="Basic" price={169} credits={10} />
          <div>
            <p className="text-xs">(recommended)</p>
            <PlanCard
              name="Standard"
              price={299}
              credits={50}
              className="bg-gray-900 border-4 border-green-500 "
            />
          </div>
          <PlanCard name="Premium" price={499} credits={100} />
        </div>
      </div>
    </div>
  );
}

function PlanCard({
  name,
  price,
  credits,
  className: classx,
}: {
  name: string;
  price: number;
  credits: number;
  onClick?: () => void;
  className?: string;
}) {

  const navigate = useNavigate();
  return (
    <div className={`bg-gray-900/80 rounded-lg text-white p-2 ${classx}`}>
      <p className="font-bold ">{name}</p>
      <p className="font-medium text-sm text-gray-300">
        {credits} credits will be added in your account
      </p>
      <p className="font-medium text-sm text-gray-300 mt">Price: ₹ {price}</p>
      <button
        onClick={() => navigate("/buy/" + name.toLowerCase())}
        className="bg-green-600 rounded-lg p-2 py-1 mt-1"
      >
        buy Now
      </button>
    </div>
  );
}

function UserChat({ className: classx }: { className?: string }) {
  const token = localStorage.getItem("token");
  const [chat, setChat] = useRecoilState(chatAtom);
  const [message, setMessage] = useState("");
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    getChat();
    const interval = setInterval(() => {
      getChat();
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  const getChat = () => {
    axios
      .get(`${BACKEND_URL}/api/browser/getchat`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setChat(res.data);
      });
  };

  const sendMessage = () => {
    if(user.credits < 1) return coustomAlert("error", "You don't have enough credits to send the message, Please buy credits to continue.");
    axios
      .post(
        `${BACKEND_URL}/api/browser/sendchat`,
        { message: message, sender: "browser" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        coustomAlert("success", response.data.message);
        getChat();
        // update user function
        axios
          .get(`${BACKEND_URL}/api/browser/user`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        coustomAlert(
          "error",
          "Error Sneding the message, Please try again later."
        );
      });
  };

  const clearChat = () => {
    axios
      .delete(`${BACKEND_URL}/api/browser/clearchat`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        coustomAlert("success", response.data.message);
        getChat();
      })
      .catch((err) => {
        console.log(err);
        coustomAlert(
          "error",
          "Error Clearing the chat, Please try again later."
        );
      });
  };
  return (
    <div className={`${classx}`}>
      <p>Terminal-Connect</p>
      <div className="h-[600px]  bg-white/50 rounded ">
        <div className="h-full w-full flex flex-col gap-2 p-3 overflow-y-auto">
          {chat.map((ch, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                ch.sender == "browser"
                  ? "bg-green-800 ml-auto"
                  : "bg-slate-800 mr-auto"
              }`}
            >
              <span className="text-white  text-xs font-thin">{ch.sender}</span>
              <p
                className="text-white "
                dangerouslySetInnerHTML={{
                  __html: ch.message.replace(/\n/g, "<br>"),
                }}
              ></p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between p-3 bg-slate-800 rounded">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          className="w-5/6 rounded bg-white/60  text-black p-3 font-medium"
        ></textarea>
        <div className="font-bold  grid grid-rows-2 ml-1">
          <button
            onClick={sendMessage}
            className="bg-green-500/30 text-3xl p-1 rounded mb-0.5 flex gap-5 justify-center items-center text-green-300 hover:text-green-500 fill-green-300 hover:fill-green-500"
          >
            <span className="">Send</span>

            <svg
              className="h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
            </svg>
          </button>
          <button
            onClick={clearChat}
            className="bg-red-500/30 text-3xl p-1 rounded mt-0.5 flex gap-5 justify-center items-center fill-red-300 hover:fill-red-500 text-red-300 hover:text-red-500"
          >
            <span className="">Clear</span>
            <svg
              className="h-6 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
