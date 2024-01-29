
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
                    fetch("../api/User/getAllUsersId.php", { method: "GET" })
                        .then((response) => response.json())
                        .then((users) => {
                            const promises = users.map((user) => {
                                const userId = user.id;
                                return Promise.all([
                                    loadUserProfile(userId),
                                    loadDomains(userId),
                                    loadCompanies(userId),
                                    getDomainOfUser(userId),
                                ]);
                            });

                            Promise.all(promises)
                                .then((results) => {
                                    results.forEach((userResults) => {
                                        userResults.forEach((result) => {
                                            document.body.appendChild(result);
                                        });
                                    });
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        });
                } else {
                    window.location.href = "./profil-page.php";
                }
            })
    });

function loadUserProfile(userId) {
    return new Promise((resolve, reject) => {
        fetch(`../api/User/apiProfilUnlock.php?id=${userId}`, {
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
                profileData = profileData[0];

                const container = document.createElement("div");
                container.classList.add("container-fluid", "mt-5");

                const heading = document.createElement("h1");
                heading.textContent = "User Profile:";
                container.appendChild(heading);

                const tableWrapper = document.createElement("div");
                tableWrapper.classList.add("table-responsive");

                const table = document.createElement("table");
                table.classList.add("table");

                const thead = document.createElement("thead");
                const tr = document.createElement("tr");

                const th1 = document.createElement("th");
                th1.textContent = "Field";
                tr.appendChild(th1);

                const th2 = document.createElement("th");
                th2.textContent = "Value";
                tr.appendChild(th2);

                const th3 = document.createElement("th");
                th3.textContent = "Action";
                tr.appendChild(th3);

                thead.appendChild(tr);
                table.appendChild(thead);

                const tbody = document.createElement("tbody");

                Object.entries(profileData).forEach(([key, value]) => {
                    if (key === "company_names" || key === "domain_names") {
                        return;
                    }

                    const tr = document.createElement("tr");

                    const td1 = document.createElement("td");
                    td1.textContent = key;
                    tr.appendChild(td1);

                    let td2;
                    if (key === "pfp") {
                        td2 = document.createElement("td");
                        const img = document.createElement("img");
                        img.src = "../img/imgPFP/" + value;
                        img.alt = "Profile Picture";
                        img.style.maxWidth = "100px";
                        td2.appendChild(img);
                        tr.appendChild(td2);

                        const td3 = document.createElement("td");
                        const uploadButton = document.createElement("button");
                        uploadButton.classList.add("btn", "btn-primary");
                        uploadButton.textContent = "Upload";
                        td3.appendChild(uploadButton);
                        tr.appendChild(td3);

                        uploadButton.addEventListener("click", () => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.style.display = "none";
                            document.body.appendChild(input);
                            input.click();
                            input.addEventListener("change", () => {
                                const file = input.files[0];
                                const extension = file.name.split(".").pop();
                                const newName = new Date().toISOString().replace(/[-:.]/g, "") + "." + extension;
                                const formData = new FormData();
                                formData.append("file", file, newName);
                                fetch("../api/User/apiUploadPFP.php", {
                                    method: "POST",
                                    body: formData,
                                })
                                    .then((response) => {
                                        if (response.ok) {
                                            td2.innerHTML = "";
                                            const newImg = document.createElement("img");
                                            newImg.src = "../img/imgPFP/" + newName;
                                            newImg.alt = "Profile Picture";
                                            newImg.style.maxWidth = "100px";
                                            td2.appendChild(newImg);
                                            const fieldRecup = td1.innerHTML;
                                            const formDataChange = new FormData();
                                            formDataChange.append("columnToChange", fieldRecup);
                                            formDataChange.append("value", newName);
                                            formDataChange.append("id", userId);
                                            changeProfile(formDataChange);
                                        } else {
                                            throw new Error("Erreur lors de l'upload de l'image");
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            });
                        });
                    } else if (key === "statutVisibilitee") {
                        td2 = document.createElement("td");
                        const select = document.createElement("select");
                        select.classList.add("form-control");
                        select.id = "statutVisibilitee-dropdown";

                        const option1 = document.createElement("option");
                        option1.value = "Public";
                        option1.textContent = "Public";
                        select.appendChild(option1);

                        const option2 = document.createElement("option");
                        option2.value = "Private";
                        option2.textContent = "Private";
                        select.appendChild(option2);

                        select.value = value;

                        td2.appendChild(select);

                        const validateButton = document.createElement("button");
                        validateButton.classList.add("btn", "btn-primary", "ml-2");
                        validateButton.textContent = "Validate";
                        td2.appendChild(validateButton);

                        validateButton.addEventListener("click", () => {
                            const newValue = select.value;
                            const fieldRecup = td1.innerHTML;
                            td2.innerHTML = newValue;
                            const formDataChange = new FormData();
                            formDataChange.append("columnToChange", fieldRecup);
                            formDataChange.append("value", newValue);
                            formDataChange.append("id", userId);
                            changeProfile(formDataChange);
                        });

                        tr.appendChild(td2);
                    } else if (key === "role") {
                        td2 = document.createElement("td");
                        const select = document.createElement("select");
                        select.classList.add("form-control");
                        select.id = "role-dropdown";

                        const option1 = document.createElement("option");
                        option1.value = "User";
                        option1.textContent = "User";
                        select.appendChild(option1);

                        const option2 = document.createElement("option");
                        option2.value = "Entreprise";
                        option2.textContent = "Entreprise";
                        select.appendChild(option2);

                        const option3 = document.createElement("option");
                        option3.value = "Admin";
                        option3.textContent = "Admin";
                        select.appendChild(option3);

                        select.value = value;

                        td2.appendChild(select);

                        const validateButton = document.createElement("button");
                        validateButton.classList.add("btn", "btn-primary", "ml-2");
                        validateButton.textContent = "Validate";
                        td2.appendChild(validateButton);

                        validateButton.addEventListener("click", () => {
                            const newValue = select.value;
                            const fieldRecup = td1.innerHTML;
                            td2.innerHTML = newValue;
                            const formDataChange = new FormData();
                            formDataChange.append("columnToChange", fieldRecup);
                            formDataChange.append("value", newValue);
                            formDataChange.append("id", userId);
                            changeProfile(formDataChange);
                        });
                        tr.appendChild(td2);
                    } else {
                        td2 = document.createElement("td");
                        if (key === "isVerified") {
                            td2.textContent = value === 1 ? "Yes" : "No";
                        } else {
                            td2.textContent = value;
                        }
                        tr.appendChild(td2);

                        const td3 = document.createElement("td");
                        const button = document.createElement("button");
                        button.classList.add("btn", "btn-primary");
                        button.textContent = "Modifier";
                        td3.appendChild(button);

                        button.addEventListener("click", () => {
                            const input = document.createElement("input");
                            input.type = "text";
                            input.value = value;
                            td2.innerHTML = "";
                            td2.appendChild(input);

                            const submitButton = document.createElement("button");
                            submitButton.classList.add("btn", "btn-primary");
                            submitButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
                            td3.innerHTML = "";
                            td3.appendChild(submitButton);

                            submitButton.addEventListener("click", () => {
                                const newValue = input.value;
                                const fieldRecup = td1.innerHTML;
                                td2.innerHTML = newValue;
                                td3.innerHTML = "";
                                td3.appendChild(button);
                                const formDataChange = new FormData();
                                formDataChange.append("columnToChange", fieldRecup);
                                formDataChange.append("value", newValue);
                                formDataChange.append("id", userId);
                                changeProfile(formDataChange);
                            });

                            input.addEventListener("keyup", (event) => {
                                if (event.keyCode === 13) {
                                    submitButton.click();
                                }
                            });
                        });

                        tr.appendChild(td3);
                    }
                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
                tableWrapper.appendChild(table);
                container.appendChild(tableWrapper);

                resolve(container);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

function changeProfile(formDataChange) {
    fetch("../api/User/apiUpdateProfilUnlock.php", {
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

function loadDomains(userId) {
    return new Promise((resolve, reject) => {
      fetch(`../api/Domain/apiDomain.php?id=${userId}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((domains) => {
          if (!Array.isArray(domains)) {
            domains = Object.values(domains);
          }
          const container = document.createElement("div");
          container.classList.add("container-fluid", "mt-5");
  
          const row = document.createElement("div");
          row.classList.add("row");
          container.appendChild(row);
  
          const col = document.createElement("div");
          col.classList.add("col-md-6", "mx-auto");
          row.appendChild(col);
  
          const formGroup = document.createElement("div");
          formGroup.classList.add(
            "form-group",
            "d-flex",
            "align-items-center"
          );
          col.appendChild(formGroup);
  
          const label = document.createElement("label");
          label.textContent = "Domains:";
          formGroup.appendChild(label);
  
          const dropdown = document.createElement("select");
          dropdown.classList.add("form-control", "mr-2");
          dropdown.id = "domain-dropdown";
  
          if (!Array.isArray(domains) || domains.length === 0) {
            const option = document.createElement("option");
            option.textContent = "No domains";
            dropdown.appendChild(option);
          } else {
            domains.forEach((domain) => {
              const option = document.createElement("option");
              option.value = domain.id;
              option.textContent = domain.Nom;
              dropdown.appendChild(option);
            });
          }
  
          formGroup.appendChild(dropdown);
  
          const button = document.createElement("button");
          button.classList.add("btn", "btn-primary");
          button.textContent = "Link Domain to User";
          button.addEventListener("click", () => {
            linkDomainToUser(dropdown, userId);
          });
          formGroup.appendChild(button);
  
          resolve(container);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

function linkDomainToUser(dropdown,userId) {
    const domainId = dropdown.value;
    const confirmation = confirm(
        `Are you sure you want to link domain ${domainId} to user ${userId}?`
    );
    if (confirmation) {
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("domain_id", domainId);
        fetch("../api/Domain/apiLinkDomainUser.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    alert("Domain linked to user successfully");
                } else {
                    throw new Error("Error linking domain to user");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


function loadCompanies(userId) {
    return new Promise((resolve, reject) => {
        fetch(`../api/Company/apiCompanyPDG.php?id=${userId}`, { method: "GET" })
            .then((response) => response.json())
            .then((companies) => {
                const container = document.createElement("div");
                container.classList.add("container-fluid", "mt-5");

                const heading = document.createElement("h2");
                heading.textContent = "Companies:";
                container.appendChild(heading);

                const tableWrapper = document.createElement("div");
                tableWrapper.classList.add("table-responsive");

                const table = document.createElement("table");
                table.classList.add("table");

                const thead = document.createElement("thead");
                const tr = document.createElement("tr");

                const th1 = document.createElement("th");
                th1.textContent = "ID";
                tr.appendChild(th1);

                const th2 = document.createElement("th");
                th2.textContent = "Name";
                tr.appendChild(th2);

                thead.appendChild(tr);
                table.appendChild(thead);

                const tbody = document.createElement("tbody");

                if (!Array.isArray(companies) || companies.length === 0) {
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.colSpan = 2;
                    td.textContent = "No companies";
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                } else {
                    companies.forEach((company) => {
                        const tr = document.createElement("tr");

                        const td1 = document.createElement("td");
                        td1.textContent = company.id;
                        tr.appendChild(td1);

                        const td2 = document.createElement("td");
                        td2.textContent = company.nom;
                        tr.appendChild(td2);

                        tbody.appendChild(tr);
                    });
                }

                table.appendChild(tbody);
                tableWrapper.appendChild(table);
                container.appendChild(tableWrapper);

                const buttonWrapper = document.createElement("div");
                buttonWrapper.classList.add("d-flex", "justify-content-center", "mt-3");

                const editButton = document.createElement("button");
                editButton.classList.add("btn", "btn-primary");
                editButton.textContent = "Edit Companies";
                editButton.addEventListener("click", () => {
                    window.location.href = "./company-edit-page.php";
                });

                buttonWrapper.appendChild(editButton);
                container.appendChild(buttonWrapper);

                resolve(container);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
};


function getDomainOfUser(userId) {
    return new Promise((resolve, reject) => {
        fetch(`../api/Domain/apiCheckDomain.php?id=${userId}`, { method: "GET" })
            .then((response) => response.json())
            .then((domains) => {
                const container = document.createElement("div");
                container.classList.add("container-fluid", "mt-5");

                const table = document.createElement("table");
                table.classList.add("table");
                container.appendChild(table);

                const thead = document.createElement("thead");
                table.appendChild(thead);

                const tr = document.createElement("tr");
                thead.appendChild(tr);

                const th1 = document.createElement("th");
                th1.textContent = "ID";
                tr.appendChild(th1);

                const th2 = document.createElement("th");
                th2.textContent = "Nom";
                tr.appendChild(th2);

                const th3 = document.createElement("th");
                th3.textContent = "Actions";
                tr.appendChild(th3);

                const tbody = document.createElement("tbody");
                table.appendChild(tbody);

                if (!Array.isArray(domains) || domains.length === 0) {
                    const tr = document.createElement("tr");
                    tbody.appendChild(tr);

                    const td = document.createElement("td");
                    td.colSpan = 3;
                    td.textContent = "No domains";
                    tr.appendChild(td);
                } else {
                    domains.forEach((domain) => {
                        const tr = document.createElement("tr");
                        tbody.appendChild(tr);

                        const td1 = document.createElement("td");
                        td1.textContent = domain.id;
                        tr.appendChild(td1);

                        const td2 = document.createElement("td");
                        td2.textContent = domain.Nom;
                        tr.appendChild(td2);

                        const td3 = document.createElement("td");
                        tr.appendChild(td3);

                        const button = document.createElement("button");
                        button.classList.add("btn", "btn-danger");
                        button.textContent = "Delete";
                        button.addEventListener("click", () => {
                            deleteDomain(domain.id, userId);
                            tr.remove();
                        });
                        td3.appendChild(button);
                    });
                }

                resolve(container);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
};


function deleteDomain(domainId, userId) {
    const formData = new FormData();
    formData.append("domainId", domainId);
    formData.append("userId", userId);

    fetch("../api/Domain/apiDeleteDomainLink.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                alert("Domain deleted successfully");
            } else {
                throw new Error("Error deleting domain");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
