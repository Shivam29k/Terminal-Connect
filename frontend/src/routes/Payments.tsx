import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";
import { coustomAlert } from "../components/coustomAlert";

interface Payment {
  email: string;
  username: string;
  amount: number;
  credits: number;
  upiId: string;
  plan: string;
  image: string;
  _id: string;
  date: string;
  __v: number;
}

function Payments() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  !token && navigate("/");

  const [payments, setPayments] = useState<Payment[]>([] as Payment[]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/browser/payment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPayments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleApprove = (payment: Payment) => {
    console.log(payment);
    axios
      .post(
        `${BACKEND_URL}/api/browser/approvepayment`,
        {
          email: payment.email,
          uniqueUsername: payment.username,
          credits: payment.credits,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        coustomAlert("success", res.data.message);
        setPayments(payments.filter((p) => p._id !== payment._id));
      })
      .catch((err) => {
        coustomAlert("error", err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="bg-[#1C1C1C] min-h-[100vh] pt-16 text-white">
      <Navbar />
      <div className=" container ">
        <div className=" text-3xl font-bold text-gray-300">Payment Details</div>
        {payments.map((payment) => {
          return (
            <div key={payment._id} className=" px-4 lg:px-28 py-24 text-white">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex justify-between w-full mr-6">
                      <span>@{payment.username}</span>
                      <span>₹ {payment.amount}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full grid  md:grid-cols-2">
                      <div className="">
                        <div>{payment.email}</div>
                        <div>Credits: {payment.credits}</div>
                        <div>UPI ID: {payment.upiId}</div>
                        <div>Plan: {payment.plan}</div>
                        <div>
                          Date:{" "}
                          {new Date(payment.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div>
                          Time:{" "}
                          {new Date(payment.date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                      </div>
                      <img src={payment.image} alt="" className="h-96" />
                    </div>
                    <div className="flex justify-between">
                      <button className="bg-red-500 font-bold text-xl px-4 py-2 rounded m-3">
                        Reject
                      </button>
                      <button className="bg-emerald-500 font-bold text-xl px-4 py-2 rounded m-3" onClick={()=>handleApprove(payment)}>
                        Approve
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Payments;
