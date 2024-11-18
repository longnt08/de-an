let headerLink = document.getElementsByClassName("header-link");
let mainTitle = document.querySelector(".main-title");
let dynamicContent = document.querySelector(".dynamic-content");
let deMuc = 0;
news();
console.log(headerLink[0]);
for (let i = 0; i < headerLink.length; i++) {
  headerLink[i].onclick = function (e, index) {
    mainTitle.textContent = e.target.innerText;
    headerLink[deMuc].removeAttribute("style");
    e.target.setAttribute(
      "style",
      "background-color: rgb(116, 175, 117); color: white"
    );
    deMuc = i;
    chang3_11(deMuc);
  };
}
function chang3_11(option) {
  switch (option) {
    case 0:
      news();
      break;
    case 1:
      services();
      break;
    case 2:
      payment();
      break;
    case 3:
      feedback();
      break;
    case 4:
      aboutUs();
      break;
    default:
      console.log("Lỗi!!!");
  }
  return 0;
}

function news() {
  fetch('https://newsapi.org/v2/everything?q=apple&from=2024-11-09&to=2024-11-09&sortBy=popularity&apiKey=c729330d5f0f4e61a0ab21e0687641d7')
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
    articles.forEach(article => {
      dynamicContent.innerHTML = `
      <h2 style="margin: 10px 10px;">${article.title}</h2>
      <p style="margin-bottom: 10px;">${article.description}</p>
      <img src="${article.urlToImage}" style="width: 80%; border-radius: 10px">
      <p style="font-size: 16px;">${article.content}</p>
      `
    })

  })
  .catch(error => console.error("Error: ", error));
  dynamicContent.setAttribute("style",
     "border-radius: 10px; height: 480px; text-align: center; background-color: white; overflow-Y: auto;");

}

// hàm tạo thẻ service
function createService(service) {
  const serviceDiv = document.createElement('div');
  serviceDiv.classList.add('services_1');

  // tao the img cho dich
  const img = document.createElement('img'); 
  img.alt = service.service_name;
  img.src = service.img;


  // tao the span chua ten
  const serviceName = document.createElement('span');
  serviceName.id = 'name_services';
  serviceName.innerHTML = service.service_name;

  // them img va name vao service
  serviceDiv.appendChild(img);
  serviceDiv.appendChild(serviceName);

  return serviceDiv;
}

function services () {
  dynamicContent.innerHTML = '';
  fetch('http://127.0.0.1:5000/services/load_services', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(services => {
    if(!Array.isArray(services)) {
      console.error("data is not an array", services);
      return;
    } else {
      services.forEach(service => {
        dynamicContent.appendChild(createService(service));
        localStorage.setItem(`${service.service_name}`, `${service._id}`);
      }) 
      dynamicContent.setAttribute(
        "style",
        `height: ${
          window.innerHeight - 130
        }px; display: flex; flex-wrap: wrap; gap: 10px; overflow: auto;`
      );
      var services_1 = document.getElementsByClassName("services_1");
      for (let i = 0; i < services_1.length; i++) {
        services_1[i].onclick = function () {
          form(services[i].service_name);
        };
      }
    }
  })
  .catch(error => console.error("Error:", error));
}

// Trang đăng ký dịch vụ
function form(serviceName) {
  dynamicContent.innerHTML = `
  <div class="services_form_1">
    <div class="services_form_1_1"><</div>
    <div class="services_form_1_2">ĐĂNG KÝ DỊCH VỤ</div>
  </div>
  <div class="services_form_2">
    <div class="container-form">
        <h2 id="serviceName">${serviceName}</h2>
        <form>
            <label for="name">Tên của bạn:</label>
            <input type="text" id="name" name="name" placeholder="Nhập tên" required>

            <label for="address">Số nhà:</label>
            <input type="text" id="address" name="address" placeholder="Nhập số nhà" required>

            <label for="service_time">Thời gian sử dụng dịch vụ:</label>
            <select id="service_time" name="service_time" required>
                <option value="" disabled selected>Chọn thời gian</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
            </select>

            <button id="submitBtn" type="submit">Đăng ký</button>
        </form>
    </div>
  </div>`;
  const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
      
        const data = {
            user_id: localStorage.getItem('user_id'),
            service_name: serviceName,
            username: localStorage.getItem('username'),
            houseNum: localStorage.getItem('houseNum'),
            using_time: document.getElementById('service_time').value 
        };
      
        fetch('http://127.0.0.1:5000/services/registration', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert(data.success);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));
    });

  let services_form_2 = document.querySelector(".services_form_2");
  let services_form_1_1 = document.querySelector(".services_form_1_1");
  services_form_1_1.onclick = function () {
    services();
  };
  dynamicContent.setAttribute("style", "display: flex; flex-direction: column;");
  services_form_2.setAttribute(
    "style",
    `background-color: rgba(255, 255, 255, 1);  border-radius: 6px; margin-top: 10px; width: 100%; height: ${
      window.innerHeight - 190
    }px;`
  );
  window.addEventListener("resize", function () {
    services_form_2.setAttribute(
      "style",
      `background-color: rgba(255, 255, 255, 1);  border-radius: 6px; margin-top: 10px; width: 100%; height: ${
        window.innerHeight - 190
      }px;`
    );
  });
}


// Trang thanh toán
function payment() {
  let dynamicContentinnerHTML = `<table class = "table">
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên</th>
        <th>Dịch vụ</th>
        <th>Thời gian</th>
        <th>Địa Điểm</th>
        <th>Trạng Thái</th>
      </tr>
    </thead>
    <tbody>`;
  for (let i = 0; i < 20; i++)
    dynamicContentinnerHTML += `<tr>
        <td>${2 * i + 1}</td>
        <td>Pham Anh</td>
        <td>Sân bóng</td>
        <td>9/10/2023</td>
        <td>HN</td>
        <td>đã thanh toán</td>
      </tr>
      <tr>
        <td>${2 * i + 2}</td>
        <td>Pham Anh</td>
        <td>Tiền điện tháng 10</td>
        <td>9/10/2023</td>
        <td>HN</td>
        <td>đã thanh toán</td>
      </tr>`;
  dynamicContentinnerHTML += `
    </tbody>
  </table>`;
  dynamicContent.innerHTML = dynamicContentinnerHTML;
  dynamicContent.setAttribute(
    "style",
    `height: ${
      window.innerHeight - 130
    }px; overflow: auto; padding: 0;
    background-color: white;
    border-radius: 6px;`
  );
}

// Trang phản hồi
function feedback() {
  dynamicContent.innerHTML = `
  <div class="feedback-container">
    <div class="form-container">
      <form id="feedbackForm">
        <h2>Phản Hồi Người Dùng</h2>
        
        <!-- Loại phản hồi -->
        <label for="feedbackType" style="margin-left: 30px; font-weight: bold;">Loại phản hồi</label>
        <select id="feedbackType" name="feedbackType" style="width: 60%; margin-left: 30px;" required>
          <option value="" disabled selected>---</option>
          <option value="Đề xuất">Đề xuất</option>
          <option value="Phàn nàn">Phàn nàn</option>
          <option value="Khác">Khác</option>
        </select>
        
        <div class="user-info">
          <div class="form-group">
            <label for="name">Họ và Tên</label>
            <input type="text" id="name" name="name" placeholder="Nhập họ tên" required/>
          </div>
        
          <div class="form-group">
            <label for="houseNum">Số nhà</label>
            <input type="number" id="houseNumInput" name="houseNum" placeholder="Nhập số nhà" required/>
          </div>
        
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="tel" id="phoneInput" name="phone" placeholder="Nhập số điện thoại" required/>
          </div>
        
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="emailInput" name="email" placeholder="Nhập email" required/>
          </div>

        </div>

        <div class="btn-group">
          <div class="content-feedback">
            <label for="feedbackContent" >Nội dung phản hồi</label>
            <textarea id="feedbackContent" name="feedbackContent" placeholder="Nhập nội dung phản hồi" rows="5" required></textarea>
          </div>
          <button id="submitBtn" type="submit">Gửi Phản Hồi</button>
        </div>
        
      </form>
    </div>
  </div>
  `;

  document.getElementById('submitBtn').addEventListener('click', async function(e) {
    e.preventDefault();

    const feedback_data = {
      user_id: localStorage.getItem('user_id'),
      username: document.getElementById('name').value,
      feedback_type: document.getElementById('feedbackType').value,
      houseNum: document.getElementById('houseNumInput').value,
      phone: document.getElementById('phoneInput').value,
      email: document.getElementById('emailInput').value,
      feedback_content: document.getElementById('feedbackContent').value
    }

    console.log(feedback_data);

    try {
      const response = await fetch('http://127.0.0.1:5000/users/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback_data)
      });

      const data = await response.json();

      if (data.success) {
        alert(data.success);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error: ", error);
      alert('An error occurred. Please try again');
    }
  });
}


// sua thong tin ca nhan
document.getElementById('editProfileBtn').addEventListener('click',  function(e) {
  e.preventDefault();

  dynamicContent.innerHTML = `
    <div class="update-container">
      <div class="edit-profile-form">
        <h2>Chỉnh sửa thông tin cá nhân</h2>
        
        <div class="form-update">
          <label for="name">Username</label>
          <input type="text" id="nameUpdate" name="name" placeholder="Nhập họ tên" required>
        </div>
      
        <div class="form-update">
          <label for="phone">Số điện thoại</label>
          <input type="tel" id="phoneUpdate" name="phoneUpdate" placeholder="Nhập số điện thoại" required>
        </div>
      
        <div class="form-update">
          <label for="location">Địa chỉ</label>
          <input type="text" id="locationUpdate" name="location" placeholder="Nhập địa chỉ" required>
        </div>
      
        <div class="form-update">
          <label for="birthdate">Ngày tháng năm sinh</label>
          <input type="date" id="dobUpdate" name="birthdate" required>
        </div>
      
        <button id="updateInfoBtn" type="submit">Lưu thông tin</button>
      </div>
    </div>
  `;
    document.getElementById('updateInfoBtn').addEventListener('click', async function(e) {
      e.preventDefault();

      // lay thong tin update
      const username = document.getElementById('nameUpdate').value
      const phone = document.getElementById('phoneUpdate').value
      const location = document.getElementById('locationUpdate').value
      let dob = document.getElementById('dobUpdate').value;
      if (dob) {
        const [year, month, day] = dob.split("-");
        dob = `${day}-${month}-${year}`;
      }
      const data_update = {
        username: username,
        phone: phone,
        location: location,
        dob: dob,
        user_id: localStorage.getItem('user_id')
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/users/update_info', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_update)
        })
  
        const data = await response.json();

        if (data.success) {
          // xoa thong tin cu khoi localStorage
          localStorage.removeItem('username');
          localStorage.removeItem('phone');
          localStorage.removeItem('location');
          
          // cap nhat thong tin moi vao localStorage
          localStorage.setItem('username', username);
          localStorage.setItem('phone', phone);
          localStorage.setItem('location', location);

          alert(data.success);
        } else {
          alert(data.message);
        }
      } catch(error) {
        console.error("Error:", error);
        alert('An error occurred. Please try again');
      }

  })
})

// Trang About us
function aboutUs() {
  dynamicContent.innerHTML = `
  <div class="container-abu">
    <!-- Tiêu đề chính -->
    <h1>Welcome to Sky Tower Apartments</h1>

    <!-- Phần giới thiệu chung -->
    <div class="intro">
      <p>
        Discover the height of luxury and comfort with breathtaking
        views of the city. Sky Tower Apartments offers modern living
        spaces designed to provide residents with an elegant and serene
        environment.
      </p>
    </div>

    <!-- Bộ sưu tập ảnh -->
    <div class="gallery">
      <img
        src="./static/images/flat2.png"
        alt="Apartment Exterior"/>
      <img
        src="./static/images/flat1.png"
        alt="Living Room"/>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0fjF9xTCdGHVOoC0nZtN-h4bgp3C-4Vgsw&s"
        alt="Swimming Pool"/>
    </div>

    <!-- Thông tin chi tiết -->
    <div class="details">
      <p class = "p_abu">Location: 123 Skyline Blvd, Metropolis</p>
      <p class = "p_abu">Amenities: Gym, Pool, Rooftop Lounge, Concierge Service</p>
      <p class = "p_abu">Contact us: +123 456 789 | info@skytower.com</p>
    </div>
  </div>
  `;
  dynamicContent.setAttribute(
    "style",
    `height: ${
      window.innerHeight - 130
    }px; font-family: Arial, sans-serif; overflow: auto; background-color: white;`
  );
}

// info
let notificationCard = document.querySelector(".notification-card");
let profile_card = document.querySelector(".profile-card");
profile_card.setAttribute("style", `left: ${window.innerWidth - 360}px`);
window.addEventListener("resize", function () {
  profile_card.setAttribute("style", `left: ${window.innerWidth - 360}px`);
});
let isHovering1 = false;
let isHovering2 = false;
notificationCard.addEventListener("mouseover", () => {
  isHovering1 = true;
  profile_card.style.display = "block";
});

profile_card.addEventListener("mouseover", () => {
  isHovering2 = true;
  profile_card.style.display = "block";
});

notificationCard.addEventListener("mouseout", () => {
  isHovering1 = false;
  checkAndHide();
});

profile_card.addEventListener("mouseout", () => {
  isHovering2 = false;
  checkAndHide();
});

function checkAndHide() {
  if (!isHovering1 && !isHovering2) {
    profile_card.style.display = "none";
  }
}


// hàm tạo table thành viên gia đình
function createFamilyTable(data) {
  const table = document.createElement('table');
  table.boder = "1";

  // tao tieu de cua bang
  const headerRow = document.createElement('tr');
  const headers = ['STT', 'Họ tên', 'Số điện thoại', 'Quan hệ với chủ hộ']
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.innerText = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // tao cac hang du lieu
  data.forEach((item, index) => {
    const row = document.createElement('tr');

    // cot STT
    const sttCell = document.createElement('td');
    sttCell.innerText = index + 1;
    row.appendChild(sttCell);

    // cot Ho ten
    const nameCell = document.createElement('td');
    nameCell.innerText = item.username;
    row.appendChild(nameCell);

    // cot SDT
    const phoneCell = document.createElement('td');
    phoneCell.innerText = item.phone;
    row.appendChild(phoneCell);

    // cot Quan he voi chu ho
    const relationCell = document.createElement('td');
    relationCell.innerText = item.relation;
    row.appendChild(relationCell);

    table.appendChild(row);
  });

  return table;
}

// hàm tạo bảng các dịch vụ đã đăng ký
function createServicesTable(service) {
  const table = document.createElement('table');
  table.boder = "1";

  // tao tieu de cua bang
  const headerRow = document.createElement('tr');
  const headers = ['STT', 'Tên dịch vụ', 'Thời gian sử dụng', 'Ngày đăng ký']
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.innerText = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // tao cac hang du lieu
  service.forEach((item, index) => {
    const row = document.createElement('tr');

    // cot STT
    const sttCell = document.createElement('td');
    sttCell.innerText = index + 1;
    row.appendChild(sttCell);

    // cot Ten dich vu
    const nameCell = document.createElement('td');
    nameCell.innerText = item.service_name;
    row.appendChild(nameCell);

    // cot Thoi gian su dung
    const phoneCell = document.createElement('td');
    phoneCell.innerText = item.using_time;
    row.appendChild(phoneCell);

    // cot ngay dang ky
    const relationCell = document.createElement('td');
    relationCell.innerText = item.register_date;
    row.appendChild(relationCell);

    table.appendChild(row);
  });

  return table;
}

// hàm tạo table các phản hồi đã gửi
function createFeecbackTable(feedback) {
  const table = document.createElement('table');
  table.boder = "1";

  // tao tieu de cua bang
  const headerRow = document.createElement('tr');
  const headers = ['STT', 'Loại phản hồi', 'Nội dung', 'Ngày gửi']
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.innerText = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // tao cac hang du lieu
  feedback.forEach((item, index) => {
    const row = document.createElement('tr');

    // cot STT
    const sttCell = document.createElement('td');
    sttCell.innerText = index + 1;
    row.appendChild(sttCell);

    // cot loai phan hoi
    const nameCell = document.createElement('td');
    nameCell.innerText = item.type;
    row.appendChild(nameCell);

    // cot noi dung
    const phoneCell = document.createElement('td');
    phoneCell.innerText = item.content;
    row.appendChild(phoneCell);

    // cot ngay gui
    const relationCell = document.createElement('td');
    relationCell.innerText = item.sent_date;
    row.appendChild(relationCell);

    table.appendChild(row);
  });

  return table;
}

// trang info
document.getElementById('infoLink').addEventListener('click', async function(e) {
  e.preventDefault();

  const user_id = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');
  const houseNum = localStorage.getItem('houseNum');
  const phone = localStorage.getItem('phone');
  const email = localStorage.getItem('email');
  const location = localStorage.getItem('location');

  dynamicContent.innerHTML = `
    <div class="infoContainer">
      <div class="infoImage">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" />
      </div>

      <div class="infoUser">
        <div class="infoText">
          <h1><strong>Nhà: </strong>${houseNum}</h1>
          <h3><strong>Họ tên: </strong>${username}</h3>
          <p><strong>Điện thoại: </strong>${phone}</p>
          <p><strong>Email: </strong>${email}</p>
          <p><strong>Địa chỉ: </strong>${location}</p>
        </div>
      
        <div class="info-btn">
          <button><a href="/front-end/login.html" style="text-decoration: none; color: white;">Chuyển tài khoản</a></button>
          <button id="logoutBtn">Đăng xuất</button>
          <button id="editProfileBtn" onclick="update_info()">Sửa thông tin</button>
        </div>
      </div>
    </div>

  `;

  try {
    const url = new URL('http://127.0.0.1:5000/users/get_family_members');
    url.searchParams.append('houseNum', houseNum);
    url.searchParams.append('user_id', user_id);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
  
    if (data) {
      console.log(data);

      // hien thi thanh vien trong gia dinh
      const titleFamily = document.createElement('h1');
      titleFamily.innerText = 'Thành viên trong gia đình'
      const familyMemberDiv = document.createElement('div');
      familyMemberDiv.classList.add('familyMembers');

      const familyMemberTable = createFamilyTable(data.family_members);
      familyMemberDiv.appendChild(titleFamily);
      familyMemberDiv.appendChild(familyMemberTable);

      dynamicContent.appendChild(familyMemberDiv);

      // hien thi dich vu da dang ky
      const titleService = document.createElement('h1');
      titleService.innerText = 'Dịch vụ đã đăng ký';
      const registeredServicesDiv = document.createElement('div');
      registeredServicesDiv.classList.add('familyMembers');

      const serviceTable = createServicesTable(data.registered_services);
      registeredServicesDiv.appendChild(titleService);
      registeredServicesDiv.appendChild(serviceTable);

      dynamicContent.appendChild(registeredServicesDiv);

      // hien thi phan hoi da gui
      const titleFeecback = document.createElement('h1');
      titleFeecback.innerText = 'Phản hồi đã gửi';
      const sentFeedbacksDiv = document.createElement('div');
      sentFeedbacksDiv.classList.add('familyMembers');

      const feedbackTable = createFeecbackTable(data.sent_feedbacks);
      sentFeedbacksDiv.appendChild(titleFeecback);
      sentFeedbacksDiv.appendChild(feedbackTable);

      dynamicContent.appendChild(sentFeedbacksDiv);
    }
  } catch(error) {
    console.error('Error:', error);
  }

})

// dang xuat
document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();

  if(!localStorage.getItem('username')) {
    alert('You are not login');
    return;
  }

  localStorage.clear();
  alert('Logout successfully');
  window.location.href = 'http://127.0.0.1:5501/front-end/login.html';

})