

import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Verify.css";

const Verify = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url, token } = useContext(StoreContext);

  const verifyPayment = async () => {

    try {

      console.log("Payment success:", success);
      console.log("Order ID:", orderId);
      console.log("Token:", token);

      if (!token) {
        toast.error("Please login again");

        setTimeout(() => {
          navigate("/");
        }, 2000);

        return;
      }

      const response = await axios.post(
        url + "/api/order/verify",
        {
          success,
          orderId
        },
        {
          headers: {
            token: token
          }
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.success) {

        toast.success("Payment successful!");

        setTimeout(() => {
          navigate("/myorders");
        }, 2000);

      } else {

        toast.error(response.data.message || "Payment failed!");

        setTimeout(() => {
          navigate("/");
        }, 2000);

      }

    } catch (error) {

      console.log("Verification error:", error);

      toast.error(
        error.response?.data?.message || "Error verifying payment"
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);

    }
  };

  useEffect(() => {

    if (success && orderId) {
      verifyPayment();
    } else {
      navigate("/");
    }

  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
