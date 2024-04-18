"use client";

import { deletedForm } from "@/actions/contact";
import SubmitButton from "@/components/SubmitButton";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

function DeleteForm({addressId}) {
  const [stateDelete, formActionDelete] = useFormState(deletedForm, {});
  useEffect(() => {
    toast(stateDelete?.message, { type: `${stateDelete?.status}` });
  }, [stateDelete]);

  return (
    <>
      <div className="form-delete-address">
        <form action={formActionDelete}>
          <input type="hidden" value={addressId} name="address_id" />
          <SubmitButton title="حذف" style="btn btn-dark" />
        </form>
      </div>
    </>
  );
}

export default DeleteForm;
