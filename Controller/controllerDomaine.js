function loadDomains() {
  fetch("../api/User/getUserID.php")
    .then((response) => response.text())
    .then((userId) => {
      fetch(`../api/Domain/apiDomain.php?id=${userId}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erreur lors de la récupération des domaines");
          }
        })
        .then((data) => {
          const table = document.getElementById("myTable");
          const headerRow = table.createTHead().insertRow();
          const keyHeader = headerRow.insertCell();
          keyHeader.innerHTML = "";
          keyHeader.classList.add("col");
          const valueHeader = headerRow.insertCell();
          valueHeader.innerHTML = "Value";
          valueHeader.classList.add("col");
          if (data.admin) {
            const actionHeader = headerRow.insertCell();
            actionHeader.innerHTML = "Action";
            actionHeader.classList.add("col");
          }
          table.classList.add("table");
          table.classList.add("table-striped");
          table.classList.add("table-bordered"); // Add a border to the table
          table.classList.add("table-hover"); // Highlight rows on hover

          Object.keys(data).forEach((key, index) => {
            if (key !== "admin" && key !== "id" && key !== "estValide") {
              const row = table.insertRow();
              const keyCell = document.createElement("td");
              keyCell.innerHTML = key;
              row.appendChild(keyCell);
              const valueCell = row.insertCell();
              const valueTable = document.createElement("table");
              valueTable.classList.add("table"); // Add a Bootstrap table class
              valueTable.classList.add("table-sm"); // Make the table smaller
              valueCell.appendChild(valueTable);
              Object.keys(data[key]).forEach((innerKey) => {
                if (
                  innerKey !== "id" &&
                  innerKey !== "estValide" &&
                  innerKey !== "img"
                ) {
                  const innerRow = valueTable.insertRow();
                  const innerKeyCell = innerRow.insertCell();
                  innerKeyCell.innerHTML = innerKey;
                  const innerValueCell = innerRow.insertCell();
                  innerValueCell.innerHTML = data[key][innerKey];
                  if (data.admin) {
                    const updateButton = document.createElement("button");
                    updateButton.innerHTML = "Update";
                    updateButton.classList.add("btn");
                    updateButton.classList.add("btn-primary");
                    innerValueCell.appendChild(updateButton);
          
                    updateButton.addEventListener("click", () => {
                      const input = document.createElement("input");
                      input.type = "text";
                      input.value = data[key][innerKey];
                      innerValueCell.innerHTML = "";
                      innerValueCell.appendChild(input);
          
                      const submitButton = document.createElement("button");
                      submitButton.classList.add("btn", "btn-primary");
                      submitButton.innerHTML =
                        '<i class="fas fa-arrow-right"></i>';
                      innerValueCell.appendChild(submitButton);
          
                      submitButton.addEventListener("click", () => {
                        const newValue = input.value;
                        const formDataChange = new FormData();
                        formDataChange.append("columnToChange", innerKey);
                        formDataChange.append("value", newValue);
                        formDataChange.append("id", data[key].id);
                        changeDomain(formDataChange);
                        const updateButton = document.createElement("button");
                        updateButton.innerHTML = "Update";
                        updateButton.classList.add("btn");
                        updateButton.classList.add("btn-primary");
                        innerValueCell.innerHTML = newValue;
                        innerValueCell.appendChild(updateButton);
                        updateButton.addEventListener("click", () => {
                          const input = document.createElement("input");
                          input.type = "text";
                          input.value = newValue;
                          innerValueCell.innerHTML = "";
                          innerValueCell.appendChild(input);
          
                          const submitButton = document.createElement("button");
                          submitButton.classList.add("btn", "btn-primary");
                          submitButton.innerHTML =
                            '<i class="fas fa-arrow-right"></i>';
                          innerValueCell.appendChild(submitButton);
          
                          submitButton.addEventListener("click", () => {
                            const newValue = input.value;
                            const formDataChange = new FormData();
                            formDataChange.append("columnToChange", innerKey);
                            formDataChange.append("value", newValue);
                            formDataChange.append("id", data[key].id);
                            changeDomain(formDataChange);
                            innerValueCell.innerHTML = newValue;
                            innerValueCell.appendChild(updateButton);
                          });
          
                          input.addEventListener("keyup", (event) => {
                            if (event.keyCode === 13) {
                              submitButton.click();
                            }
                          });
                        });
                      });
          
                      input.addEventListener("keyup", (event) => {
                        if (event.keyCode === 13) {
                          submitButton.click();
                        }
                      });
                    });
                  }
                }
              });
              if (data.admin) {
                const actionCell = row.insertCell();
                actionCell.classList.add("col");
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.classList.add("btn");
                deleteButton.classList.add("btn-danger");
                actionCell.appendChild(deleteButton);
                if (data[key].estValide === 0) {
                  const acceptButton = document.createElement("button");
                  acceptButton.innerHTML = "Accept";
                  acceptButton.classList.add("btn");
                  acceptButton.classList.add("btn-success");
                  actionCell.appendChild(acceptButton);
                  acceptButton.addEventListener("click", (event) => {
                    const confirmAccept = confirm(
                      "Are you sure you want to accept this domain?"
                    );
                    if (confirmAccept) {
                      acceptDomain(data[key].id, event.target);
                    }
                  });
                }
                deleteButton.addEventListener("click", (event) => {
                  const confirmDelete = confirm("Are you sure you want to delete this domain?");
                  if (confirmDelete) {
                    const row = event.target.closest("tr");
                    deleteDomain(data[key].id, row);
                  }
                });
              }
            }
          });
        });
    });
}

function changeDomain(formDataChange) {
  fetch("../api/Domain/apiUpdateDomain.php", {
    method: "POST",
    body: formDataChange,
  })
    .then((response) => {
      if (response.ok) {
      } else {
        throw new Error("Erreur lors de l'envoi des données");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
    });
}
function deleteDomain(id, row) {
  formData = new FormData();
  formData.append("id", id);
  fetch("../api/Domain/apiDeleteDomain.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        row.parentNode.removeChild(row);
      } else {
        throw new Error("Erreur lors de l'envoi des données");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
    });
}

function acceptDomain(id, button) {
  formData = new FormData();
  formData.append("id", id);
  fetch("../api/Domain/apiAcceptDomain.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        button.parentNode.removeChild(button);
      } else {
        throw new Error("Erreur lors de l'envoi des données");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
    });
}

loadDomains();
