"use strict";

const form = document.forms[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const ageInput = document.getElementById("age");

  const newParticipant = {
    fullname: fullnameInput.value,
    email: emailInput.value,
    age: ageInput.value,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newParticipant),
  };

  fullnameInput.value = "";
  emailInput.value = "";
  ageInput.value = "";

  fetch("http://localhost:3000/v1/auth/register", option)
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});
