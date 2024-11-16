document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem('username');
    let houseNum = localStorage.getItem('houseNum');
    const email = localStorage.getItem('email');
    let phone = localStorage.getItem('phone');
    let location = localStorage.getItem('location');

    document.getElementById('userName').innerText = username;
    document.getElementById('houseNum').innerHTML = `<strong>House number: </strong> ${houseNum}`;
    document.getElementById('email').innerHTML = `<strong>Email: </strong> ${email}`;
    document.getElementById('phone').innerHTML = `<strong>Phone: </strong> ${phone}`;
    document.getElementById('location').innerHTML = `<strong>Location: </strong> ${location}`;
})
