document.getElementById('registerBtn').addEventListener("click", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const houseNumInput = document.getElementById("houseNum");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const locationInput = document.getElementById("location");
    const relation = document.getElementById('relation');

    let dob = document.getElementById('dob').value;
    if (dob) {
      const [year, month, day] = dob.split("-");
      dob = `${day}-${month}-${year}`;
    }

    // collect data
    const formData = new FormData();
    formData.append("email", emailInput.value);
    formData.append("firstName", firstNameInput.value);
    formData.append("lastName", lastNameInput.value);
    formData.append("houseNum", houseNumInput.value);
    formData.append("phone", phoneInput.value);
    formData.append("password", passwordInput.value);
    formData.append("confirmPassword", confirmPasswordInput.value);
    formData.append("location", locationInput.value);
    formData.append("dob", dob);
    formData.append('relation', relation.value);

    // send POST request to the Flask API
    try {
      const response = await fetch("http://127.0.0.1:5000/users/register", {
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
