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
      aboutUs();
      break;
    default:
      console.log("Lỗi!!!");
  }
  return 0;
}
function news() {
  dynamicContent.innerHTML = `
    <div class="news_1">
      <div class="news_1_1">TIN TỨC MỚI NHẤT</div>

      <div class="news_1_2">

            <img src="https://nguyencanhtuan.com/wp-content/uploads/2024/10/Electric-electrical-electronic.jpg"></img>

      </div>

    </div>`;
  let News_1_2 = document.querySelector(".news_1_2");
  News_1_2.setAttribute("style", `height: ${window.innerHeight - 173}px;`);
  window.addEventListener("resize", function () {
    News_1_2.setAttribute("style", `height: ${window.innerHeight - 173}px;`);
  });
  dynamicContent.setAttribute("style", "border-radius: 10px;");

}

// Trang service
function services() {
  dynamicContent.innerHTML = `
  <div class="services_1">
    <img
      src="./static/images/Services_1.webp"
      style="width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">CLEANING</span>
  </div>
  <div class="services_1">
    <img
      src="./static/images/services_2.jpg"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">SWIMMING POOL</span>
  </div>
  <div class="services_1">
    <img
      src="./static/images/services_3.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">FOOTBALL FIELD</span>
  </div>
  <div class="services_1">
    <img
      src="./static/images/services_4.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">MAINTAIN</span>
  </div>
  <div class="services_1">
    <img
      src="./static/images/services_5.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto;"
    />
    <span id="name_services">BOARDROOM</span>
  </div>`;
  for (let i = 0; i < 14; i++) {
    dynamicContent.innerHTML += `<div class="services_1">
    <img
      src="./static/images/services_3.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"/>
    <span id="name_services">football field</span>
  </div>`;
  }
  dynamicContent.setAttribute(
    "style",
    `height: ${
      window.innerHeight - 130
    }px; display: flex; flex-wrap: wrap; gap: 10px; overflow: auto;`
  );
  var services_1 = document.getElementsByClassName("services_1");
  for (let i = 0; i < services_1.length; i++) {
    services_1[i].onclick = function (e) {
      form(services_1[i].innerText);
    };
  }
}

// Trang đăng ký dịch vụ
function form(e) {
  dynamicContent.innerHTML = `
  <div class="services_form_1">
    <div class="services_form_1_1"><</div>
    <div class="services_form_1_2">ĐĂNG KÝ DỊCH VỤ</div>
  </div>
  <div class="services_form_2">
    <div class="container-form">
        <h2>Đăng Ký Dịch Vụ</h2>
        <form action="{{url_for('service_registration'}}" method="POST">
            <label for="name">Tên của bạn:</label>
            <input type="text" id="name" name="name" placeholder="Nhập tên" required>

            <label for="address">Số nhà:</label>
            <input type="text" id="address" name="address" placeholder="Nhập số nhà" required>

            <label for="service_time">Thời gian sử dụng dịch vụ:</label>
            <select id="service_time" name="service_time" required>
                <option value="" disabled selected>Chọn thời gian</option>
                <option value="30 minutes">30 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
            </select>

            <button type="submit">Thanh Toán</button>
        </form>
    </div>
  </div>`;
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
  console.log(e);
}

// Trang thanh toán
function payment() {
  let dynamicContentinnerHTML = `<table class = "table">
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên</th>
        <th>Dịch vụ</th>
        <th>thời gian</th>
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
    }px; overflow: auto; padding: 0 20px 10px 20px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 6px;`
  );
  window.addEventListener("resize", function () {
    dynamicContent.setAttribute(
      "style",
      `height: ${
        window.innerHeight - 130
      }px; overflow: auto; padding: 0 20px 10px 20px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 6px;`
    );
  });
}

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
        src="..//images/flat2.png"
        alt="Apartment Exterior"
      />
      <img
        src="../images/flat1.png"
        alt="Living Room"
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0fjF9xTCdGHVOoC0nZtN-h4bgp3C-4Vgsw&s"
        alt="Swimming Pool"
      />
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
    }px; font-family: Arial, sans-serif; overflow: auto`
  );
}
