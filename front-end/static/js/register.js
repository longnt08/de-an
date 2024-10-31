document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const houseNumInput = document.getElementById("houseNum");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const locationInput = document.getElementById("location");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      // collect data
      const formData = new FormData();
      formData.append("email", emailInput.value);
      formData.append("email", emailInput.value);
      formData.append("firstName", firstNameInput.value);
      formData.append("lastName", lastNameInput.value);
      formData.append("houseNum", houseNumInput.value);
      formData.append("phone", phoneInput.value);
      formData.append("password", passwordInput.value);
      formData.append("confirmPassword", confirmPasswordInput.value);
      formData.append("location", locationInput.value);

      // send POST request to the Flask API
      try {
        const response = await fetch("http://127.0.0.1:5000/register", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          window.location.href = "/front-end/login.html";
        } else {
          alert(`error: ${result.message}`);
        }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later");
    }
  });
  });