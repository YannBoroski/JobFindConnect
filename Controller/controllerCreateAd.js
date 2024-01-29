const form = document.getElementById("advertisement-form");

function loadCompanies() {
  return fetch("../api/User/getUserID.php")
    .then((response) => response.text())
    .then((userId) => {
      return fetch(`../api/Company/apiCompanyPDG.php?id=${userId}`, { method: "GET" });
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error loading companies");
      }
    })
    .then((companies) => {
      const select = document.createElement("select");
      select.classList.add("form-control");
      select.id = "companies-dropdown";

      companies.forEach((company) => {
        const option = document.createElement("option");
        option.value = company.id;
        option.textContent = company.nom;
        select.appendChild(option);
      });

      const companiesFormGroup = document.createElement("div");
      companiesFormGroup.classList.add(
        "mb-3",
      );

      const advertisementButton = document.getElementById("advertisement-button");
      form.insertBefore(companiesFormGroup, advertisementButton);

      const companiesLabel = document.createElement("label");
      companiesLabel.textContent = "Companies:";
      companiesLabel.for = "companies-dropdown";
      companiesFormGroup.appendChild(companiesLabel);

      companiesFormGroup.appendChild(select);
    })
    .catch((error) => {
      console.error(error);
    });
}

function loadDomains() {
  return fetch("../api/User/getUserID.php")
    .then((response) => response.text())
    .then((userId) => {
      return fetch(`../api/Domain/apiDomain.php?id=${userId}`, {
        method: "GET",
      });
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error loading domains");
      }
    })
    .then((domains) => {
      if (domains && typeof domains === "object") {
        const select = document.createElement("select");
        select.classList.add("form-control");
        select.id = "domains-dropdown";

        Object.values(domains).forEach((domain) => {
          const option = document.createElement("option");
          option.value = domain.id;
          option.textContent = domain.Nom;
          select.appendChild(option);
        });

        const domainsFormGroup = document.createElement("div");
        domainsFormGroup.classList.add(
          "mb-3",
        );

        const advertisementButton = document.getElementById("advertisement-button");
        form.insertBefore(domainsFormGroup, advertisementButton);

        const domainsLabel = document.createElement("label");
        domainsLabel.textContent = "Domains:";
        domainsLabel.for = "domains-dropdown";
        domainsFormGroup.appendChild(domainsLabel);

        domainsFormGroup.appendChild(select);
      } else {
        throw new Error("Domains is not an object");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  formData.append('date_creation', date);

  const companiesDropdown = document.getElementById("companies-dropdown");
  const selectedCompanyId = companiesDropdown.options[companiesDropdown.selectedIndex].value;
  formData.append('company_id', selectedCompanyId);

  const domainsDropdown = document.getElementById("domains-dropdown");
  const selectedDomainId = domainsDropdown.options[domainsDropdown.selectedIndex].value;
  formData.append('domain_id', selectedDomainId);

  fetch('../api/Ad/apiCreateAd.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
    } else {
      throw new Error('Error sending form data');
    }
  })
  .catch(error => {
    console.error('Error sending form data:', error);
  });
});

loadDomains();
loadCompanies();