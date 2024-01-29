function handleUserType() {
    fetch("../api/User/getUserID.php")
        .then((response) => response.text())
        .then((userId) => {
            fetch(`../api/User/apiProfil.php?id=${userId}`, {
                method: "GET",
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erreur lors de la récupération du profil");
                    }
                })
                .then((profileData) => {
                    if (profileData[0].role === "Admin") {
                        loadAllMessages();
                    } else if (profileData[0].role === "User") {
                        loadUserMessages(userId);
                    } else if (profileData[0].role === "Entreprise") {
                        loadEntrepriseMessages(userId);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
}

function loadAllMessages() {
  fetch("../api/Message/apiMessagesAll.php", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error while retrieving messages");
      }
    })
    .then((data) => {
      const table = document.getElementById("myTable");
      const headerRow = table.insertRow();
      const messageHeader = headerRow.insertCell();
      messageHeader.innerHTML = "Message";
      const statusHeader = headerRow.insertCell();
      statusHeader.innerHTML = "Status";
      const companyHeader = headerRow.insertCell();
      companyHeader.innerHTML = "Company";
      const userHeader = headerRow.insertCell();
      userHeader.innerHTML = "User";
      const firstNameHeader = headerRow.insertCell();
      firstNameHeader.innerHTML = "First Name";
      const lastNameHeader = headerRow.insertCell();
      lastNameHeader.innerHTML = "Last Name";
      const emailHeader = headerRow.insertCell();
      emailHeader.innerHTML = "Email";
      const phoneHeader = headerRow.insertCell();
      phoneHeader.innerHTML = "Phone";
      const acceptHeader = headerRow.insertCell();
      acceptHeader.innerHTML = "";
      const refuseHeader = headerRow.insertCell();
      refuseHeader.innerHTML = "";
      const deleteHeader = headerRow.insertCell();
      deleteHeader.innerHTML = "";
      data.forEach((message) => {
        const row = table.insertRow();
        row.setAttribute("id", "message-" + message.id);
        const messageCell = row.insertCell();
        messageCell.innerHTML = message.Message || "";
        const statusCell = row.insertCell();
        statusCell.innerHTML = message.Status || "";
        const companyCell = row.insertCell();
        companyCell.innerHTML = message.CompanyNom || "";
        const userCell = row.insertCell();
        userCell.innerHTML = message.username || "";
        const firstNameCell = row.insertCell();
        firstNameCell.innerHTML = message.firstName || "";
        const lastNameCell = row.insertCell();
        lastNameCell.innerHTML = message.lastName || "";
        const emailCell = row.insertCell();
        emailCell.innerHTML = message.email || "";
        const phoneCell = row.insertCell();
        phoneCell.innerHTML = message.phone || "";
        const acceptCell = row.insertCell();
        const acceptButton = document.createElement("button");
        acceptButton.innerHTML = "Accept";
        acceptButton.classList.add("btn");
        acceptButton.classList.add("btn-success");
        acceptButton.classList.add("d-flex");
        acceptButton.classList.add("justify-content-center");
        acceptButton.addEventListener("click", () => {
          acceptMessage(message.id);
        });
        acceptCell.appendChild(acceptButton);
        const refuseCell = row.insertCell();
        const refuseButton = document.createElement("button");
        refuseButton.innerHTML = "Refuse";
        refuseButton.classList.add("btn");
        refuseButton.classList.add("btn-danger");
        refuseButton.classList.add("d-flex");
        refuseButton.classList.add("justify-content-center");
        refuseButton.addEventListener("click", () => {
          refuseMessage(message.id);
        });
        refuseCell.appendChild(refuseButton);
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("d-flex");
        deleteButton.classList.add("justify-content-center");
        deleteButton.addEventListener("click", () => {
          deleteMessage(message.id);
        });
        deleteCell.appendChild(deleteButton);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function loadUserMessages(userId) {
  fetch(`../api/Message/apiMessagesUser.php?userId=${userId}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la récupération des messages");
      }
    })
    .then((data) => {
      const table = document.getElementById("myTable");
      const headerRow = table.insertRow();
      const messageHeader = headerRow.insertCell();
      messageHeader.innerHTML = "Message";
      const statusHeader = headerRow.insertCell();
      statusHeader.innerHTML = "Status";
      data.forEach((message) => {
        const row = table.insertRow();
        const messageCell = row.insertCell();
        messageCell.innerHTML = message.Message || "";
        const statusCell = row.insertCell();
        statusCell.innerHTML = message.Status || "";
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function loadEntrepriseMessages(userId) {
  fetch(`../api/Message/apiMessagesCompany.php?id=${userId}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la récupération des messages");
      }
    })
    .then((data) => {
      const table = document.getElementById("myTable");
      const headerRow = table.insertRow();
      const messageHeader = headerRow.insertCell();
      messageHeader.innerHTML = "Message";
      const statusHeader = headerRow.insertCell();
      statusHeader.innerHTML = "Status";
      const usernameHeader = headerRow.insertCell();
      usernameHeader.innerHTML = "";
      const firstNameHeader = headerRow.insertCell();
      firstNameHeader.innerHTML = "First Name";
      const lastNameHeader = headerRow.insertCell();
      lastNameHeader.innerHTML = "Last Name";
      const emailHeader = headerRow.insertCell();
      emailHeader.innerHTML = "Email";
      const phoneHeader = headerRow.insertCell();
      phoneHeader.innerHTML = "Phone";
      const profileHeader = headerRow.insertCell();
      profileHeader.innerHTML = "";
      const acceptHeader = headerRow.insertCell();
      acceptHeader.innerHTML = "";
      const refuseHeader = headerRow.insertCell();
      refuseHeader.innerHTML = "";
      data.forEach((message) => {
        const row = table.insertRow();
        row.setAttribute("id", `message-${message.id}`);
        const messageCell = row.insertCell();
        messageCell.innerHTML = message.Message || "";
        const statusCell = row.insertCell();
        statusCell.innerHTML = message.Status || "";
        const usernameCell = row.insertCell();
        usernameCell.innerHTML = message.username || "";
        const firstNameCell = row.insertCell();
        firstNameCell.innerHTML = message.firstName || "";
        const lastNameCell = row.insertCell();
        lastNameCell.innerHTML = message.lastName || "";
        const emailCell = row.insertCell();
        emailCell.innerHTML = message.email || "";
        const phoneCell = row.insertCell();
        phoneCell.innerHTML = message.phone || "";
        const profileCell = row.insertCell();
        const profileButton = document.createElement("button");
        profileButton.innerHTML = "Profile";
        profileButton.classList.add("btn");
        profileButton.classList.add("btn-primary");
        profileButton.classList.add("d-flex");
        profileButton.classList.add("justify-content-center");
        profileButton.addEventListener("click", () => {
          window.location.href = `../View/user-show-page.php?id=${message.idUser}`;
        });
        profileCell.appendChild(profileButton);
        const acceptCell = row.insertCell();
        if (message.Status === "Pending") {
          const acceptButton = document.createElement("button");
          acceptButton.innerHTML = "Accept";
          acceptButton.classList.add("btn");
          acceptButton.classList.add("btn-success");
          acceptButton.classList.add("d-flex");
          acceptButton.classList.add("justify-content-center");
          acceptButton.addEventListener("click", () => {
            const row = document.getElementById(`message-${message.id}`);
            const acceptButton = row.querySelector(".btn-success");
            const refuseButton = row.querySelector(".btn-danger");
            acceptButton.parentNode.removeChild(acceptButton);
            refuseButton.parentNode.removeChild(refuseButton);
            acceptMessage(message.id);
          });
          acceptButton.setAttribute("id", `accept-${message.id}`);
          acceptCell.appendChild(acceptButton);
        }
        const refuseCell = row.insertCell();
        if (message.Status === "Pending") {
          const refuseButton = document.createElement("button");
          refuseButton.innerHTML = "Refuse";
          refuseButton.classList.add("btn");
          refuseButton.classList.add("btn-danger");
          refuseButton.classList.add("d-flex");
          refuseButton.classList.add("justify-content-center");
          refuseButton.addEventListener("click", () => {
            const row = document.getElementById(`message-${message.id}`);
            const acceptButton = row.querySelector(".btn-success");
            const refuseButton = row.querySelector(".btn-danger");
            acceptButton.parentNode.removeChild(acceptButton);
            refuseButton.parentNode.removeChild(refuseButton);
            refuseMessage(message.id);
          });
          refuseButton.setAttribute("id", `refuse-${message.id}`);
          refuseCell.appendChild(refuseButton);
        }
      });
    })
    .catch((error) => {
      console.error(error);
      console.error("Failed to parse JSON data");
    });
}
  function acceptMessage(messageId) {
    const formData = new FormData();
    formData.append("id", messageId);
    formData.append("Status", "Accept");
    fetch("../api/Message/apiMessageStatusSet.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          const statusCell = document.getElementById("message-" + messageId).querySelectorAll("td")[1];
          statusCell.innerHTML = "Accept";
        } else {
          throw new Error("Erreur lors de l'acceptation du message");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  function refuseMessage(messageId) {
    const formData = new FormData();
    formData.append("id", messageId);
    formData.append("Status", "Refus");
    fetch("../api/Message/apiMessageStatusSet.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          const statusCell = document.getElementById("message-" + messageId).querySelectorAll("td")[1];
          statusCell.innerHTML = "Refus";
        } else {
          throw new Error("Erreur lors du refus du message");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  function deleteMessage(messageId) {
    const formData = new FormData();
    formData.append("id", messageId);
    fetch("../api/Message/apiDeleteMessage.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          const row = document.getElementById("message-" + messageId);
          row.parentNode.removeChild(row);
        } else {
          throw new Error("Erreur lors de la suppression du message");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
handleUserType();