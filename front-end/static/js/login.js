document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      try {
        const response = await fetch("http://127.0.0.1:5000/users/login", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (response.ok) {

            localStorage.setItem('user_id', result.user['_id']);
            localStorage.setItem('username', result.user['username']);
            localStorage.setItem('email', result.user['email']);
            localStorage.setItem('houseNum', result.user['houseNum']);
            localStorage.setItem('phone', result.user['phone']);
            localStorage.setItem('location', result.user['location']);

            alert(result.message);
            window.location.href = "http://127.0.0.1:5501/front-end/index.html";
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again later");
      }
    });
  });