"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import { getPayment } from "@/actions/contact";
import { useRouter } from "next/navigation";

function Payment({ cart, coupon, addressId }) {
  const [state, formAction] = useFormState(getPayment, {});
  const router = useRouter();
  useEffect(() => {
    toast(state?.message, { type: `${state?.status}` });
    if(state?.status == 'success') {
        router.push(state.url)
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input type="hidden" name="coupon" value={coupon.code} />
        <input type="hidden" name="address_id" value={addressId} />
        <SubmitButton title="پرداخت" style="btn btn-primary mt-4 btn-auth" />
      </form>
    </>
  );
}

export default Payment;
