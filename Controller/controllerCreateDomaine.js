document.getElementById("domain-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const alert = document.createElement("div");
    const body = document.querySelector("body");
    alert.classList.add("alert","d-none" ,"alert-success");
    alert.textContent = "Domaine créé !";
    body.appendChild(alert);

    const formData = new FormData(document.getElementById("domain-form"));

    fetch("../api/Domain/apiCreateDomain.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
          alert.classList.remove("d-none");
          setTimeout(function(){ 
            window.location.href = "domaine-show-page.php";
          }, 3000);
        } else {
            throw new Error("Erreur lors de l'envoi des données");
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des données :", error);
    });
});







