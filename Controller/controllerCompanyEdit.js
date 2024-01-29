function loadCompanies() {
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
          loadCompanyProfileAdmin().then((container) => {
            document.body.appendChild(container);
          });
        } else if (profileData[0].role === "Entreprise") {
          loadCompanyProfile().then((container) => {
            document.body.appendChild(container);
          });
        }
      }) 
    });
  }
function loadCompanyProfile() {
  return new Promise((resolve, reject) => {
    fetch("../api/User/getUserID.php")
      .then((response) => response.text())
      .then((pdgID) => {
        fetch(`../api/Company/apiCompanyPDG.php?id=${pdgID}`, {
          method: "GET",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error retrieving company profile");
            }
          })
          .then((companyList) => {
            const container = document.createElement("div");
            container.classList.add("container-fluid", "mt-5");

            companyList.forEach((companyData) => {
              const companyTitle = document.createElement("h1");
              companyTitle.textContent = companyData.nom;
              container.appendChild(companyTitle);

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

              Object.entries(companyData).forEach(([key, value]) => {
                if (key === "id" || key === "Pdg_id" || key === "estVerifiee") {
                  return;
                }

                const tr = document.createElement("tr");

                const td1 = document.createElement("td");
                td1.textContent = key;
                tr.appendChild(td1);

                let td2;
                if (key === "Logo") {
                  td2 = document.createElement("td");
                  const img = document.createElement("img");
                  img.src = "../img/imgCompanies/" + value;
                  img.alt = "Company Logo";
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
                      fetch("../api/Company/apiUploadLogo.php", {
                        method: "POST",
                        body: formData,
                      })
                        .then((response) => {
                          if (response.ok) {
                            td2.innerHTML = "";
                            const newImg = document.createElement("img");
                            newImg.src = "../img/imgCompanies/" + newName;
                            newImg.alt = "Company Logo";
                            newImg.style.maxWidth = "100px";
                            td2.appendChild(newImg);
                            const fieldRecup = td1.innerHTML;
                            const formDataChange = new FormData();
                            formDataChange.append("columnToChange", fieldRecup);
                            formDataChange.append("value", newName);
                            formDataChange.append("id", companyData.id);
                            changeCompanyProfile(formDataChange);
                          } else {
                            throw new Error("Error uploading image");
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    });
                  });
                } else {
                  td2 = document.createElement("td");
                  td2.textContent = value;
                  tr.appendChild(td2);

                  const td3 = document.createElement("td");
                  if (key !== "domain_names") {
                    const button = document.createElement("button");
                    button.classList.add("btn", "btn-primary");
                    button.textContent = "Edit";
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
                        formDataChange.append("id", companyData.id);
                        changeCompanyProfile(formDataChange);
                      });

                      input.addEventListener("keyup", (event) => {
                        if (event.keyCode === 13) {
                          submitButton.click();
                        }
                      });
                    });
                  }
                  tr.appendChild(td3);
                }
                tbody.appendChild(tr);
              });

              table.appendChild(tbody);
              tableWrapper.appendChild(table);
              container.appendChild(tableWrapper);
            });

            resolve(container);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
  });
}

function loadCompanyProfileAdmin() {
  return new Promise((resolve, reject) => {
    fetch(`../api/Company/apiEntrepriseListe.php`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error retrieving company profile");
        }
      })
      .then((companyList) => {
        const container = document.createElement("div");
        container.classList.add("container-fluid", "mt-5");

        companyList.forEach((companyData) => {
          const companyTitle = document.createElement("h1");
          companyTitle.textContent = companyData.nom;
          container.appendChild(companyTitle);

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

          Object.entries(companyData).forEach(([key, value]) => {
            if (key === "id" || key === "Pdg_id" || key === "estVerifiee") {
              return;
            }

            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.textContent = key;
            tr.appendChild(td1);

            let td2;
            if (key === "Logo") {
              td2 = document.createElement("td");
              const img = document.createElement("img");
              img.src = "../img/imgCompanies/" + value;
              img.alt = "Company Logo";
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
                  fetch("../api/Company/apiUploadLogo.php", {
                    method: "POST",
                    body: formData,
                  })
                    .then((response) => {
                      if (response.ok) {
                        td2.innerHTML = "";
                        const newImg = document.createElement("img");
                        newImg.src = "../img/imgCompanies/" + newName;
                        newImg.alt = "Company Logo";
                        newImg.style.maxWidth = "100px";
                        td2.appendChild(newImg);
                        const fieldRecup = td1.innerHTML;
                        const formDataChange = new FormData();
                        formDataChange.append("columnToChange", fieldRecup);
                        formDataChange.append("value", newName);
                        formDataChange.append("id", companyData.id);
                        changeCompanyProfile(formDataChange);
                      } else {
                        throw new Error("Error uploading image");
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
              });
            } else {
              td2 = document.createElement("td");
              td2.textContent = value;
              tr.appendChild(td2);

              const td3 = document.createElement("td");
              if (key !== "domain_names") {
                const button = document.createElement("button");
                button.classList.add("btn", "btn-primary");
                button.textContent = "Edit";
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
                    formDataChange.append("id", companyData.id);
                    changeCompanyProfile(formDataChange);
                  });

                  input.addEventListener("keyup", (event) => {
                    if (event.keyCode === 13) {
                      submitButton.click();
                    }
                  });
                });
              }
              tr.appendChild(td3);
            }
            tbody.appendChild(tr);
          });

          table.appendChild(tbody);
          tableWrapper.appendChild(table);
          container.appendChild(tableWrapper);
        });

        resolve(container);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}
function changeCompanyProfile(formDataChange) {
  fetch("../api/Company/apiUpdateCompany.php", {
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
loadCompanies();