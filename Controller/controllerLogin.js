const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch("../api/User/apiLogin.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la connexion");
      }
    })
    .then((data) => {
      if (data.success) {
        window.location.href = "profil-page.php";
      } else {
        const anciennealert = document.querySelector(".alert");
        if (anciennealert) {
          anciennealert.remove();
        }
        const alert = document.createElement("div");
        alert.classList.add("alert", "alert-danger");
        alert.textContent = data.message;
        form.prepend(alert);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});