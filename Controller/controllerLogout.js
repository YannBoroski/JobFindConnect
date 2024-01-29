const disconnect = document.getElementById("disconnect");
disconnect.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("../api/User/apiLogout.php", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la déconnexion");
      }
    })
    .then((data) => {
      if (data.success) {
        window.location.href = "login.php";
      } else {
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