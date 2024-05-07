import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import qrCode from "../assets/qr.jpg";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { coustomAlert } from "../components/coustomAlert";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Buy() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  !token && navigate("/");

  const { plan = 'default' } = useParams();
  !plan && navigate("/");
  plan !== "basic" &&
    plan !== "standard" &&
    plan !== "premium" &&
    navigate("/");
  const [user, _] = useRecoilState(userAtom);
  const selectedPlan = planDetails(plan);
  const [file, setFile] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: user.email,
      amount: selectedPlan.price,
      upiId,
      credits: selectedPlan.credits,
      plan: plan ,
      image : file,
      date: new Date().toISOString(),
    };

    axios.post(`${BACKEND_URL}/api/browser/payment`, data, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      coustomAlert("success", res.data.message);
      navigate("/dashboard");
    }).catch((err) => {
      console.log(err);
      coustomAlert("error", "Error in buying credits, Please try again later.");
    });
    console.log(data);
  };

  return (
    <div className="bg-[#1C1C1C] min-h-[100vh] px-4 lg:px-28 py-24 text-white">
      <Navbar />
      <h1 className="text-3xl font-bold underline underline-offset-8 decoration-emerald-400 text-emerald-400 decoration-4 container">
        Buy Credits
      </h1>
      <Instructions />
      <div className="grid grid-cols-1 lg:grid-cols-2  mt-14 lg:mt-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <img src={qrCode} alt="qr code" className="w-1/2" />
        </div>
        <div className="flex flex-col p-3 mx-6  border border-gray-700 shadow-2xl shadow-gray-600/70 rounded-md gap-4">
          <h1 className="font-bold text-3xl font-serif">{plan}</h1>
          <Card label={"Name"} value={user.name} />
          <Card label="Email" value={user.email} />
          <Card label="Username" value={user.username} />
          <Card label="Price" value={`₹ ${selectedPlan.price}`} />
          <Card label="Credits" value={selectedPlan.credits.toString()} />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full border-b pb-2 border-gray-600 w-">
              <span className="text- text-gray-300 font-medium">UPI Id</span>
              <input
                className={`font-medium rounded-md mt-2 border-black ring-black bg-slate-700 p-2`}
                placeholder="Enter your UPI ID"
                required
                onChange={(event) => setUpiId(event.target.value)}
              ></input>
            </div>
            <div></div>
            <div className="flex flex-col py-4 border-b pb-4 border-gray-500">
              <label htmlFor="file" className="text-gray-300">
                Upload Payment Screenshot
              </label>
              <input
                type="file"
                className="text-gray-300  pt-1 rounded-md "
                accept="image/*"
                required
                onChange={(event) => {
                  const file = event.target.files && event.target.files[0];
                  if (file && file.size > 1024 * 1024) {
                    coustomAlert(
                      "error",
                      "File size exceeds 1MB. Please select a smaller file."
                    );
                    event.target.value = "";
                  } else {
                    const file = event.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFile(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                    coustomAlert("success", "File uploaded successfully.");
                  }
                }}
              />
            </div>
            <div className="flex justify-end my-2 mt-4">
              <button
                type="submit"
                className="bg-[#3ECF8E] text-[#1C1C1C] font-bold px-8 p-2 rounded-md  hover:bg-[#67f089] transition-all duration-300 ease-in-out hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

function Instructions() {
  return <div className="py-4 container">
  <h4 className="text-lg font-medium text-gray-400">Instructions</h4>
  <ul className="text-gray-400">
    <li>Step 1: Scan the QR code and pay via any UPI app.</li>
    <li>
      Step 2: Scan enter your UPI ID and Upload payment screentshot.
    </li>
    <li>Step 3: Your payment will be verified soon.</li>
    <li>Step 4: Credits will be added to your account.</li>
    <li>Step 5: You will be notified via Email.</li>
    <li>
      Step 6: If the process takes time then contact{" "}
      <a href="mailto:tc@shivamk.tech" className="text-blue-300 italic">
        tc@shivamk.tech
      </a>
    </li>
  </ul>
</div>
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex  items-baseline justify-between text-xl w-full border-b border-gray-600">
      <span className="text- text-gray-300 ">{label}</span>
      <span className="font-medium  pt-2">{value}</span>
    </div>
  );
}


function planDetails(planName: string ) {
  if (planName === "basic") {
    return {
      price: 169,
      credits: 10,
    };
  } else if (planName === "standard") {
    return {
      price: 299,
      credits: 50,
    };
  } else if (planName === "premium") {
    return {
      price: 499,
      credits: 100,
    };
  }else {
    return {
      price: 0,
      credits: 0,
    };
  }
}

export default Buy;
