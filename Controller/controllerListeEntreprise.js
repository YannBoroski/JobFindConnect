async function loadCompanies() {
  try {
    const response = await fetch("../api/Company/apiEntrepriseListe.php");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des entreprises");
    }
    const data = await response.json();

    const table = document.getElementById("myTable");
    table.classList.add("table");
    table.classList.add("table-striped");

    const headerRow = table.createTHead().insertRow();
    const keyHeader = headerRow.insertCell();
    keyHeader.innerHTML = "";
    keyHeader.classList.add("col");
    const valueHeader = headerRow.insertCell();
    valueHeader.innerHTML = "<h1 class='display-4'> Entreprises </h1>";
    valueHeader.classList.add("col");

    const isAdminUser = await isAdmin();

    data.forEach((company, index) => {
      const row = table.insertRow();
      const keyCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = "../img/imgCompanies/" + company.Logo;
      img.alt = company.nom;
      img.classList.add("img-fluid","mx-auto","d-none", "d-sm-block");
      keyCell.classList.add("align-middle","d-sm-table-cell");
      keyCell.appendChild(img);
      row.appendChild(keyCell);
      const valueCell = row.insertCell();
      const valueTable = document.createElement("table");
      valueTable.classList.add("table");
      valueTable.classList.add("table-borderless");
      valueCell.appendChild(valueTable);
      Object.keys(company).forEach((innerKey) => {
        if (innerKey !== "id" && innerKey !== "logo" && innerKey !== "Pdg_id") {
          const innerRow = valueTable.insertRow();
          const innerKeyCell = innerRow.insertCell();
          if (innerKey === "estVerifiee") {
            innerKeyCell.innerHTML = "";
          } else {
            innerKeyCell.innerHTML = "<strong>" + innerKey + "</strong>";
          }
          const innerValueCell = innerRow.insertCell();
          if (innerKey === "estVerifiee" && company[innerKey] === 0) {
            innerValueCell.innerHTML = "";
          } else {
            innerValueCell.innerHTML = company[innerKey];
            if (innerKey === "estVerifiee" && company[innerKey] === 1) {
              innerValueCell.innerHTML = "Verified Company";
            }
          }
        }
      });
      if (isAdminUser) {
        const actionCell = row.insertCell();
        actionCell.classList.add("col");
        if (company.estVerifiee === 0) {
          const acceptButton = document.createElement("button");
          acceptButton.innerHTML = "Verify";
          acceptButton.classList.add("btn");
          acceptButton.classList.add("btn-success");
          actionCell.appendChild(acceptButton);
          acceptButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Add this line to prevent row from redirecting
            const confirmAccept = confirm("Are you sure you want to accept this company?");
            if (confirmAccept) {
              const row = event.target.closest("tr");
              acceptCompany(company.id, row);
            }
          });
        }
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        actionCell.appendChild(deleteButton);
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Add this line to prevent row from redirecting
          const confirmDelete = confirm("Are you sure you want to delete this company?");
          if (confirmDelete) {
            const row = event.target.closest("tr");
            deleteCompany(company.id, row);
          }
        });
      }
      row.addEventListener("click", () => {
        window.location.href = `./entreprise-show-page.php?id=${company.id}`;
      });
      
    });
  } catch (error) {
  }
}

function isAdmin() {
  return fetch("../api/User/getUserID.php")
    .then((response) => response.text())
    .then((userId) => {
      return fetch(`../api/User/apiIsAdmin.php?id=${userId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erreur lors de la vérification des droits d'administration");
          }
        })
        .then((isAdmin) => {
          return isAdmin;
        });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des droits d'administration :", error);
      return false;
    });
}

function acceptCompany(id, row) {
  formData = new FormData();
  formData.append("id", id);
  fetch("../api/Company/apiAcceptCompany.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        const actionCell = row.querySelector(".col");
        const verifyButton = actionCell.querySelector(".btn-success");
        actionCell.removeChild(verifyButton);
      } else {
        throw new Error("Erreur lors de l'envoi des données");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
    });
}

function deleteCompany(id, row) {
  formData = new FormData();
  formData.append("id", id);
  fetch("../api/Company/apiDeleteCompany.php", {
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

loadCompanies();