"use server";

async function create(state, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const text = formData.get('text');
    if(name === "" || email === "" || subject === "" || text === ""){
        return{
               status: "error",
               message: "تمام موارد فرم تماس الزامی است ."
            }
    }
}

export { create };