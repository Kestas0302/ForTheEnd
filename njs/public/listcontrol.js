"use strict";
function displayParticipants(participants) {
  document.querySelector("main").innerHTML = "";
  participants.forEach((participant) => {
    const participantBox = document.createElement("div");
    participantBox.className = "participant-box";

    //participant info
    const participantInfo = document.createElement("div");
    const participantId = document.createElement("div");
    const participantFullname = document.createElement("div");
    const participantEmail = document.createElement("div");
    const participantAge = document.createElement("div");

    participantInfo.className = "participant-info";
    participantId.className = "id";
    participantFullname.className = "fullname";
    participantEmail.className = "email";
    participantAge.className = "age";

    participantId.textContent = participant.id;
    participantFullname.textContent = participant.fullname;
    participantEmail.textContent = participant.email;
    participantAge.textContent = participant.age;
    participantInfo.append(
      participantId,
      participantFullname,
      participantEmail,
      participantAge
    );

    //delete participant
    const participantDelete = document.createElement("div");
    participantDelete.className = "participant-delete";
    participantDelete.textContent = "Delete";

    //appending
    participantBox.append(participantInfo, participantDelete);
    document.querySelector("main").append(participantBox);
  });

  const deleteButtons = document.querySelectorAll(".participant-delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      deleteBox(i + 1);
      console.log(deleteButtons.length);
    });
  }
}

function getData() {
  fetch("http://localhost:3000/participants")
    .then((resp) => resp.json())
    .then((response) => displayParticipants(response));
}

getData();

function deleteBox(i) {
  const option = {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(i),
  };

  fetch(`http://localhost:3000/participants/${i}`, option)
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      getData();
    })
    .catch((e) => console.error(e));
}
