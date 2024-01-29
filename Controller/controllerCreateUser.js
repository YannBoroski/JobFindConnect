document.getElementById("inscription-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const alert = document.createElement("div");
  const body = document.querySelector("body");
  alert.classList.add("alert","d-none" ,"alert-success");
  alert.textContent = "Inscription réussie !";
  body.appendChild(alert);


  const formData = new FormData(document.getElementById("inscription-form"));

  fetch("../api/User/apiInscription.php", {
      method: "POST",
      body: formData
  })
  .then(response => {
      if (response.ok) {
        alert.classList.remove("d-none");
        setTimeout(function(){ 
          window.location.href = "login.php";
        }, 3000);
      } else {
          alert.classList.remove("d-none");
          alert.textContent = "Erreur lors de l'envoi des données: " + response + " !";
          throw new Error("Erreur lors de l'envoi des données");
      }
  })
  .catch(error => {
    alert.classList.remove("d-none");
    alert.classList.add("alert-danger");
    alert.textContent = "There is an issue with your form!";
      console.error("Erreur lors de l'envoi des données :", error);
  });
});