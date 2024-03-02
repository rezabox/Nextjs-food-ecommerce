"use client";
import { ResendOtp } from "@/actions/contact";
import React, { useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";

function ResendButton() {
  const [stateResendOtp, formActionResendOtp] = useFormState(ResendOtp, {});

  useEffect(() => {
    toast(stateResendOtp?.message, { type: `${stateResendOtp?.status}` });
    if (stateResendOtp?.status === "success") {
      setMinutes(2);
      setSeconds(30);
    }
  }, [stateResendOtp]);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <div>
      <div className="resend-otp-btn">
        {seconds > 0 || minutes > 0 ? (
          <div className="mb-1 me-3">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        ) : (
          <form action={formActionResendOtp}>
            <SubmitButton title="ارسال دوباره" style="btn btn-dark" />
          </form>
        )}
      </div>
    </div>
  );
}

export default ResendButton;
