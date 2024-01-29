function loadAdvertisements() {
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
          loadAllAdvertisements();
        } else if (profileData[0].role === "User") {
          loadUserAdvertisements(userId);
        } else if (profileData[0].role === "Entreprise") {
          loadEntrepriseAdvertisements(userId);
        }
      }) 
    });
  }
  
  function loadAllAdvertisements() {
    fetch("../api/Ad/apiAllAdvertisements.php", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while retrieving advertisements");
        }
      })
      .then((data) => {
        const table = document.getElementById("myTable");
        const headerRow = table.insertRow();
        const titleHeader = headerRow.insertCell();
        titleHeader.innerHTML = "Title";
        const descriptionHeader = headerRow.insertCell();
        descriptionHeader.innerHTML = "Description";
        const jobTypeHeader = headerRow.insertCell();
        jobTypeHeader.innerHTML = "Job Type";
        const salaryRangeHeader = headerRow.insertCell();
        salaryRangeHeader.innerHTML = "Salary Range";
        const locationHeader = headerRow.insertCell();
        locationHeader.innerHTML = "Location";
        const companyHeader = headerRow.insertCell();
        companyHeader.innerHTML = "Company";
        const domainNameHeader = headerRow.insertCell();
        domainNameHeader.innerHTML = "Domain Name";
        const editHeader = headerRow.insertCell();
        const deleteHeader = headerRow.insertCell();
        data.forEach((ad) => {
          const row = table.insertRow();
          const titleCell = row.insertCell();
          const descriptionCell = row.insertCell();
          const jobTypeCell = row.insertCell();
          const salaryRangeCell = row.insertCell();
          const locationCell = row.insertCell();
          const companyCell = row.insertCell();
          companyCell.innerHTML = ad.CompanyNom || ""; 
          const domainNameCell = row.insertCell();
          domainNameCell.innerHTML = ad.DomainNom || ""; 
          const editCell = row.insertCell();
          const editButton = document.createElement("button");
          editButton.innerHTML = "Edit";
          editButton.classList.add("btn");
          editButton.classList.add("btn-primary");
          editButton.classList.add("d-flex"); 
          editButton.classList.add("justify-content-center"); 
          editCell.appendChild(editButton);
          const deleteCell = row.insertCell();
          const deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.classList.add("btn");
          deleteButton.classList.add("btn-danger");
          deleteButton.classList.add("d-flex"); 
          deleteButton.classList.add("justify-content-center");
          deleteCell.appendChild(deleteButton);

          editButton.addEventListener("click", () => {
            titleCell.innerHTML = "";
            const newTitleInput = document.createElement("input");
            newTitleInput.type = "text";
            newTitleInput.value = ad.titre || "";
            titleCell.appendChild(newTitleInput);
  
            descriptionCell.innerHTML = "";
            const newDescriptionInput = document.createElement("input");
            newDescriptionInput.type = "text";
            newDescriptionInput.value = ad.description || "";
            descriptionCell.appendChild(newDescriptionInput);
  
            jobTypeCell.innerHTML = "";
            const newJobTypeInput = document.createElement("input");
            newJobTypeInput.type = "text";
            newJobTypeInput.value = ad.job_type || "";
            jobTypeCell.appendChild(newJobTypeInput);
  
            salaryRangeCell.innerHTML = "";
            const newSalaryRangeInput = document.createElement("input");
            newSalaryRangeInput.type = "text";
            newSalaryRangeInput.value = ad.Salary_range || "";
            salaryRangeCell.appendChild(newSalaryRangeInput);
  
            locationCell.innerHTML = "";
            const newLocationInput = document.createElement("input");
            newLocationInput.type = "text";
            newLocationInput.value = ad.location || "";
            locationCell.appendChild(newLocationInput);
  
                      
            newTitleInput.addEventListener("keypress", (event) => {
              if (event.key === "Enter") {

                ChangeValue(ad.id, "titre", newTitleInput.value);

                titleCell.innerHTML = newTitleInput.value;
              }
            });
  
            newDescriptionInput.addEventListener("keypress", (event) => {
              if (event.key === "Enter") {
 
                ChangeValue(ad.id, "description", newDescriptionInput.value);

                descriptionCell.innerHTML = newDescriptionInput.value;
              }
            });
  
            newJobTypeInput.addEventListener("keypress", (event) => {
              if (event.key === "Enter") {
                ChangeValue(ad.id, "job_type", newJobTypeInput.value);
                jobTypeCell.innerHTML = newJobTypeInput.value;
              }
            });
  
            newSalaryRangeInput.addEventListener("keypress", (event) => {
              if (event.key === "Enter") {
                ChangeValue(ad.id, "Salary_range", newSalaryRangeInput.value);
                salaryRangeCell.innerHTML = newSalaryRangeInput.value;
              }
            });
  
            newLocationInput.addEventListener("keypress", (event) => {
              if (event.key === "Enter") {
                ChangeValue(ad.id, "location", newLocationInput.value);
                locationCell.innerHTML = newLocationInput.value;
              }
            });
          });
  

          deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this advertisement?")) {
 
              table.deleteRow(row.rowIndex);

              DeleteAd(ad.id);
            }
          });

          titleCell.innerHTML = ad.titre || "";
          descriptionCell.innerHTML = ad.description || "";
          jobTypeCell.innerHTML = ad.job_type || "";
          salaryRangeCell.innerHTML = ad.Salary_range || "";
          locationCell.innerHTML = ad.location || "";
        });
      });
  }

  function DeleteAd(id) {
    const formData = new FormData();
    formData.append("id", id);
  
    fetch("../api/Ad/apiDeleteAd.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
        } else {
          throw new Error("Error while deleting ad");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function ChangeValue(id, column, value) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("columnToChange", column);
    formData.append("value", value);
  
    fetch("../api/Ad/apiUpdateAd.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
        } else {
          throw new Error("Error while updating ad");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  function loadUserAdvertisements(userId) {
    fetch(`../api/Ad/apiUserAdvertisements.php?userId=${userId}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Erreur lors de la récupération des annonces pour l'utilisateur");
        }
      })
      .then((data) => {
        const cardContainer = document.getElementById("cardContainer");
        data.forEach((ad) => {
          const card = document.createElement("div");
          card.classList.add("card");
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          const title = document.createElement("h5");
          title.classList.add("card-title");
          title.innerHTML = ad.titre || "";
          const company = document.createElement("a");
          company.classList.add("card-text");
          company.href = `../View/entreprise-show-page.php?id=${ad.CompanyId}`;
          company.innerHTML = `Company: ${ad.CompanyNom || ""}`;
          const learnMoreButton = document.createElement("button");
          learnMoreButton.innerHTML = "Learn More";
          learnMoreButton.classList.add("btn");
          learnMoreButton.classList.add("btn-success");
          learnMoreButton.classList.add("d-flex");
          learnMoreButton.classList.add("justify-content-center");
          learnMoreButton.classList.add("btn-learn-more");
          learnMoreButton.addEventListener("click", () => {
            const jobType = document.createElement("p");
            jobType.classList.add("card-text");
            jobType.innerHTML = `Job Type: ${ad.job_type || ""}`;
            const salaryRange = document.createElement("p");
            salaryRange.classList.add("card-text");
            salaryRange.innerHTML = `Salary Range: ${ad.Salary_range || ""}`;
            const location = document.createElement("p");
            location.classList.add("card-text");
            location.innerHTML = `Location: ${ad.location || ""}`;
            const description = document.createElement("p");
            description.classList.add("card-text");
            description.innerHTML = ad.description || "";
            const domainName = document.createElement("p");
            domainName.classList.add("card-text");
            domainName.innerHTML = `Domain Name: ${ad.DomainNom || ""}`;
            if (learnMoreButton.classList.contains("btn-hide-content")) {
              cardBody.removeChild(jobType);
              cardBody.removeChild(salaryRange);
              cardBody.removeChild(location);
              cardBody.removeChild(description);
              cardBody.removeChild(domainName);
              learnMoreButton.classList.remove("btn-hide-content");
              learnMoreButton.classList.add("btn-learn-more");
              learnMoreButton.innerHTML = "Learn More";
            } else {
              cardBody.appendChild(jobType);
              cardBody.appendChild(salaryRange);
              cardBody.appendChild(location);
              cardBody.appendChild(description);
              cardBody.appendChild(domainName);
              learnMoreButton.classList.remove("btn-learn-more");
              learnMoreButton.classList.add("btn-hide-content");
              learnMoreButton.innerHTML = "Hide Content";
              learnMoreButton.addEventListener("click", () => {
                cardBody.removeChild(jobType);
                cardBody.removeChild(salaryRange);
                cardBody.removeChild(location);
                cardBody.removeChild(description);
                cardBody.removeChild(domainName);
                learnMoreButton.classList.remove("btn-hide-content");
                learnMoreButton.classList.add("btn-learn-more");
                learnMoreButton.innerHTML = "Learn More";
              }, { once: true });
            }
          });
          const applyButton = document.createElement("button");
          applyButton.innerHTML = "Apply to";
          applyButton.classList.add("btn");
          applyButton.classList.add("btn-success");
          applyButton.classList.add("d-flex");
          applyButton.classList.add("justify-content-center");
          applyButton.style.marginLeft = "auto";
          applyButton.style.marginRight = "10px";
          applyButton.addEventListener("click", () => {
            const form = document.createElement("form");
            const messageInput = document.createElement("input");
            const submitButton = document.createElement("button");
            const cancelButton = document.createElement("button");
            messageInput.type = "text";
            messageInput.placeholder = "Enter your message";
            submitButton.type = "submit";
            submitButton.innerHTML = "Submit";
            submitButton.classList.add("btn");
            submitButton.classList.add("btn-success");
            cancelButton.innerHTML = "Cancel";
            cancelButton.classList.add("btn");
            cancelButton.classList.add("btn-danger");
            cancelButton.addEventListener("click", () => {
              cardBody.removeChild(form);
            });
            form.appendChild(messageInput);
            form.appendChild(submitButton);
            form.appendChild(cancelButton);
            form.addEventListener("submit", (event) => {
              event.preventDefault();
              applyTo(ad.id, userId, messageInput.value);
              cardBody.removeChild(form);
            });
            cardBody.appendChild(form);
          });
          cardBody.appendChild(title);
          cardBody.appendChild(company);
          cardBody.appendChild(learnMoreButton);
          cardBody.appendChild(applyButton);
          card.appendChild(cardBody);
          cardContainer.appendChild(card);
        });
      });
  }
  
  function applyTo(adId, userId, message) {
    const formData = new FormData();
    formData.append("adId", adId);
    formData.append("userId", userId);
    formData.append("message", message);
  
    fetch("../api/Message/apiApply.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
        } else {
          throw new Error("Error while sending application");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function applyToOffline(adId, userId, message, firstName, lastName, email, phone) {
    const formData = new FormData();
    formData.append("adId", adId);
    formData.append("userId", userId);
    formData.append("message", message);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
  
    fetch("../api/Message/apiApply.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
        } else {
          throw new Error("Error while sending application");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  function loadEntrepriseAdvertisements(userId) {
    fetch(`../api/Company/apiCompanyPDG.php?id_Pdg=${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while retrieving companies");
        }
      })
      .then((companies) => {
        const table = document.getElementById("myTable");
        const headerRow = table.insertRow();
        const titleHeader = headerRow.insertCell();
        titleHeader.innerHTML = "Title";
        const descriptionHeader = headerRow.insertCell();
        descriptionHeader.innerHTML = "Description";
        const jobTypeHeader = headerRow.insertCell();
        jobTypeHeader.innerHTML = "Job Type";
        const salaryRangeHeader = headerRow.insertCell();
        salaryRangeHeader.innerHTML = "Salary Range";
        const locationHeader = headerRow.insertCell();
        locationHeader.innerHTML = "Location";
        const companyHeader = headerRow.insertCell();
        companyHeader.innerHTML = "Company";
        const domainNameHeader = headerRow.insertCell();
        domainNameHeader.innerHTML = "Domain Name";
        const editHeader = headerRow.insertCell();
        const deleteHeader = headerRow.insertCell();
        companies.forEach((company) => {
          fetch(`../api/Ad/apiCompanyAdvertisements.php?id=${company.id}`, {
            method: "GET",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Error while retrieving advertisements");
              }
            })
            .then((data) => {
              data.forEach((ad) => {
                const row = table.insertRow();
                const titleCell = row.insertCell();
                titleCell.innerHTML = ad.titre || "";
                const descriptionCell = row.insertCell();
                descriptionCell.innerHTML = ad.description || "";
                const jobTypeCell = row.insertCell();
                jobTypeCell.innerHTML = ad.job_type || "";
                const salaryRangeCell = row.insertCell();
                salaryRangeCell.innerHTML = ad.Salary_range || "";
                const locationCell = row.insertCell();
                locationCell.innerHTML = ad.location || "";
                const companyCell = row.insertCell();
                const companyLink = document.createElement("a");
                companyLink.href = `../View/entreprise-show-page.php?id=${company.id}`;
                companyLink.innerHTML = company.nom || "";
                companyCell.innerHTML = "";
                companyCell.appendChild(companyLink);
                const domainNameCell = row.insertCell();
                domainNameCell.innerHTML = ad.Nom || ""; 
                const editCell = row.insertCell();
                const editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.classList.add("btn");
                editButton.classList.add("btn-primary");
                editButton.classList.add("d-flex");
                editButton.classList.add("justify-content-center");
                editCell.appendChild(editButton);
                const deleteCell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.classList.add("btn");
                deleteButton.classList.add("btn-danger");
                deleteButton.classList.add("d-flex");
                deleteButton.classList.add("justify-content-center");
                deleteCell.appendChild(deleteButton);
  
                editButton.addEventListener("click", () => {
                  titleCell.innerHTML = "";
                  const newTitleInput = document.createElement("input");
                  newTitleInput.type = "text";
                  newTitleInput.value = ad.titre || "";
                  titleCell.appendChild(newTitleInput);
  
                  descriptionCell.innerHTML = "";
                  const newDescriptionInput = document.createElement("input");
                  newDescriptionInput.type = "text";
                  newDescriptionInput.value = ad.description || "";
                  descriptionCell.appendChild(newDescriptionInput);
  
                  jobTypeCell.innerHTML = "";
                  const newJobTypeInput = document.createElement("input");
                  newJobTypeInput.type = "text";
                  newJobTypeInput.value = ad.job_type || "";
                  jobTypeCell.appendChild(newJobTypeInput);
  
                  salaryRangeCell.innerHTML = "";
                  const newSalaryRangeInput = document.createElement("input");
                  newSalaryRangeInput.type = "text";
                  newSalaryRangeInput.value = ad.Salary_range || "";
                  salaryRangeCell.appendChild(newSalaryRangeInput);
  
                  locationCell.innerHTML = "";
                  const newLocationInput = document.createElement("input");
                  newLocationInput.type = "text";
                  newLocationInput.value = ad.location || "";
                  locationCell.appendChild(newLocationInput);
  
                  newTitleInput.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                      ChangeValue(ad.id, "titre", newTitleInput.value);
                      titleCell.innerHTML = newTitleInput.value;
                    }
                  });
  
                  newDescriptionInput.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                      ChangeValue(ad.id, "description", newDescriptionInput.value);
                      descriptionCell.innerHTML = newDescriptionInput.value;
                    }
                  });
  
                  newJobTypeInput.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                      ChangeValue(ad.id, "job_type", newJobTypeInput.value);
                      jobTypeCell.innerHTML = newJobTypeInput.value;
                    }
                  });
  
                  newSalaryRangeInput.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                      ChangeValue(ad.id, "Salary_range", newSalaryRangeInput.value);
                      salaryRangeCell.innerHTML = newSalaryRangeInput.value;
                    }
                  });
  
                  newLocationInput.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                      ChangeValue(ad.id, "location", newLocationInput.value);
                      locationCell.innerHTML = newLocationInput.value;
                    }
                  });
                });
  
                deleteButton.addEventListener("click", () => {
                  if (confirm("Are you sure you want to delete this advertisement?")) {
                    table.deleteRow(row.rowIndex);
                    DeleteAd(ad.id);
                  }
                });
              });
            });
        });
      });
  }
  function loadAdvertisementsNotConnected() {
    fetch("../api/Ad/apiAllAdvertisements.php", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Erreur lors de la récupération des annonces");
        }
      })
      .then((data) => {
        const cardContainer = document.getElementById("cardContainer");
        data.forEach((ad) => {
          const card = document.createElement("div");
          card.classList.add("card");
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          const title = document.createElement("h5");
          title.classList.add("card-title");
          title.innerHTML = ad.titre || "";
          const companyCell = document.createElement("p");
          companyCell.classList.add("card-text");
          const companyLink = document.createElement("a");
          companyLink.href = `../View/entreprise-show-page.php?id=${ad.CompanyId}`;
          companyLink.innerHTML = ad.CompanyNom || "";
          companyCell.appendChild(companyLink);
          const learnMoreButton = document.createElement("button");
          learnMoreButton.innerHTML = "Learn More";
          learnMoreButton.classList.add("btn");
          learnMoreButton.classList.add("btn-success");
          learnMoreButton.classList.add("d-flex");
          learnMoreButton.classList.add("justify-content-center");
          learnMoreButton.classList.add("btn-learn-more");
          learnMoreButton.addEventListener("click", () => {
            const jobType = document.createElement("p");
            jobType.classList.add("card-text");
            jobType.innerHTML = `Job Type: ${ad.job_type || ""}`;
            const salaryRange = document.createElement("p");
            salaryRange.classList.add("card-text");
            salaryRange.innerHTML = `Salary Range: ${ad.Salary_range || ""}`;
            const location = document.createElement("p");
            location.classList.add("card-text");
            location.innerHTML = `Location: ${ad.location || ""}`;
            const description = document.createElement("p");
            description.classList.add("card-text");
            description.innerHTML = ad.description || "";
            const domainName = document.createElement("p");
            domainName.classList.add("card-text");
            domainName.innerHTML = `Domain Name: ${ad.DomainNom || ""}`;
            if (learnMoreButton.classList.contains("btn-hide-content")) {
              cardBody.removeChild(jobType);
              cardBody.removeChild(salaryRange);
              cardBody.removeChild(location);
              cardBody.removeChild(description);
              cardBody.removeChild(domainName);
              learnMoreButton.classList.remove("btn-hide-content");
              learnMoreButton.classList.add("btn-learn-more");
              learnMoreButton.innerHTML = "Learn More";
            } else {
              cardBody.appendChild(jobType);
              cardBody.appendChild(salaryRange);
              cardBody.appendChild(location);
              cardBody.appendChild(description);
              cardBody.appendChild(domainName);
              learnMoreButton.classList.remove("btn-learn-more");
              learnMoreButton.classList.add("btn-hide-content");
              learnMoreButton.innerHTML = "Hide Content";
              learnMoreButton.addEventListener("click", () => {
                cardBody.removeChild(jobType);
                cardBody.removeChild(salaryRange);
                cardBody.removeChild(location);
                cardBody.removeChild(description);
                cardBody.removeChild(domainName);
                learnMoreButton.classList.remove("btn-hide-content");
                learnMoreButton.classList.add("btn-learn-more");
                learnMoreButton.innerHTML = "Learn More";
              }, { once: true });
            }
          });
          const applyButton = document.createElement("button");
          applyButton.innerHTML = "Apply to";
          applyButton.classList.add("btn");
          applyButton.classList.add("btn-success");
          applyButton.classList.add("d-flex");
          applyButton.classList.add("justify-content-center");
          applyButton.style.marginLeft = "auto";
          applyButton.style.marginRight = "10px";
          applyButton.addEventListener("click", () => {
            const form = document.createElement("form");
            const firstNameInput = document.createElement("input");
            const lastNameInput = document.createElement("input");
            const emailInput = document.createElement("input");
            const phoneInput = document.createElement("input");
            const messageInput = document.createElement("input");
            const submitButton = document.createElement("button");
            const cancelButton = document.createElement("button");
            firstNameInput.type = "text";
            firstNameInput.placeholder = "First Name";
            lastNameInput.type = "text";
            lastNameInput.placeholder = "Last Name";
            emailInput.type = "email";
            emailInput.placeholder = "Email";
            phoneInput.type = "tel";
            phoneInput.placeholder = "Phone";
            messageInput.type = "text";
            messageInput.placeholder = "Enter your message";
            submitButton.type = "submit";
            submitButton.innerHTML = "Submit";
            submitButton.classList.add("btn");
            submitButton.classList.add("btn-success");
            cancelButton.innerHTML = "Cancel";
            cancelButton.classList.add("btn");
            cancelButton.classList.add("btn-danger");
            cancelButton.addEventListener("click", () => {
              cardBody.removeChild(form);
            });
            form.appendChild(firstNameInput);
            form.appendChild(lastNameInput);
            form.appendChild(emailInput);
            form.appendChild(phoneInput);
            form.appendChild(messageInput);
            form.appendChild(submitButton);
            form.appendChild(cancelButton);
            form.addEventListener("submit", (event) => {
              event.preventDefault();
              applyToOffline(ad.id, 31, messageInput.value, firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value);
              cardBody.removeChild(form);
            });
            cardBody.appendChild(form);
          });
          cardBody.appendChild(title);
          cardBody.appendChild(companyCell);
          cardBody.appendChild(learnMoreButton);
          cardBody.appendChild(applyButton);
          card.appendChild(cardBody);
          cardContainer.appendChild(card);
        });
      });
  }