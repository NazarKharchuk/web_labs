"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", Send);

  async function Send(e) {
    e.preventDefault();

    //let error = 
    Validator();


  }
});

function Validator() {
  //let error = 0;
  let req = document.querySelectorAll("._req");
  for (let index = 0; index < req.length; index++) {
    const input = req[index];
    RemoveError(input);
    if (input.classList.contains("_gmail")) {
      if (ValidGmail(input)) {
        AddError(input);
        //error++;
      }
    } else if (input.value == "") {
      AddError(input);
      //error++;
    }
  }
}

function AddError(input) {
  input.classList.add("_error");
}

function RemoveError(input) {
  input.classList.remove("_error");
}

function ValidGmail(input) {
  return !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
