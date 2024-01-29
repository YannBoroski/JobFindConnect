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
if (profileData[0].role === "Admin" || profileData[0].role === "Entreprise") {
document.getElementById("inscription-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const alert = document.createElement("div");
    const body = document.querySelector("body");
    alert.classList.add("alert", "d-none", "alert-success");
    alert.textContent = "Inscription réussie !";
    body.appendChild(alert);

    const formData = new FormData(document.getElementById("inscription-form"));

    fetch("../api/User/getUserID.php")
    .then((response) => response.text())
    .then((userId) => {
        formData.append('Pdg_id', userId);

        fetch("../api/Company/apiCreateEntreprise.php", {
            method: "POST",
            body: formData
        })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error);
            });
        } else {
            alert.classList.remove("d-none");

        }
    })
    .catch(error => {
        alert.classList.remove("d-none");
        alert.classList.add("alert-danger");
        alert.textContent = "Erreur lors de l'envoi des données: " + error.message + " !";
    });
})
});
}else {
    const formulaire = document.getElementById("inscription-form");
    formulaire.remove();
    const alert = document.createElement("div");
    const body = document.querySelector("body");
    alert.classList.add("alert", "alert-danger");
    alert.textContent = "Vous n'avez pas un compte entreprise ou administrateur !";
    body.appendChild(alert);
} 
}) 
})