'use client';

import CheckOtpForm from "@/components/auth/CheckOtpForm";
import LoginForm from "@/components/auth/LoginForm";
import { useState } from "react";

function Login() {
  const [setp, setStep] = useState(1);

  return (
    <div>
      <section className="auth_section book_section">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-4 offset-md-4">
               {setp == 1 && <LoginForm setStep={setStep}/>}    
               {setp == 2 && <CheckOtpForm/>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
