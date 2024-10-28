let div3_3 = document.getElementsByClassName("v3_3");
let div3_6 = document.querySelector(".v3_6");
let div3_11 = document.querySelector(".v3_11");
let deMuc = 0;
news();
console.log(div3_3[0]);
for (let i = 0; i < div3_3.length; i++) {
  div3_3[i].onclick = function (e, index) {
    div3_6.textContent = e.target.innerText;
    div3_3[deMuc].removeAttribute("style");
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
  div3_11.innerHTML = `
  <div class="news_1">
      <div class="news_1_1">
        <div class="news_1_1_1">Theo Dõi</div>
        <div class="news_1_1_1" style="color: black">Đề Xuất</div>
        <div class="news_1_1_1">Sự Kiện</div>
      </div>
      <div></div>
      <div class="news_1_2">
      </div>
    </div>
    <div></div>
    <div class="news_2">
      <div class="news_2_1">
        <div class="news_2_1_1">
          <img src="../static/images/news_2_2_1.jpg" />
          <span>Bài Viết</span>
        </div>
        <div class="news_2_1_1">
          <img src="../static/images/news_2_2_2.jpg" />
          <span>Cá Nhân</span>
        </div>
        <div class="news_2_1_1">
          <img src="../static/images/news_2_2_3.jpg" />
          <span>Đã lưu</span>
        </div>
      </div>
      <div></div>
      <div class="news_2_2">
        <div class="news_2_2_1">
          <div>Thông báo</div>
          <img src="../static/images/news_2_2_4.jpg" />
        </div>
        <div class="news_2_2_2">
          <div class="news_2_2_2_1">Thông báo bài viết</div>
          <div class="news_2_2_2_1">Thông báo sự kiện</div>
        </div>
      </div>
    </div>`;
  let News_1_2 = document.querySelector(".news_1_2");
  News_1_2.setAttribute("style", `height: ${window.innerHeight - 173}px;`);
  window.addEventListener("resize", function () {
    News_1_2.setAttribute("style", `height: ${window.innerHeight - 173}px;`);
  });
  div3_11.setAttribute(
    "style",
    "display: grid; grid-template-columns: 6fr 10px 2fr;"
  );
}

// Trang service
function services() {
  div3_11.innerHTML = `
  <div class="services_1">
    <img
      src="../static/images/Services_1.webp"
      style="width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">CLEANING</span>
  </div>
  <div class="services_1">
    <img
      src="../static/images/services_2.jpg"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">SWIMMING POOL</span>
  </div>
  <div class="services_1">
    <img
      src="../static/images/services_3.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">FOOTBALL FIELD</span>
  </div>
  <div class="services_1">
    <img
      src="../static/images/services_4.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"
    />
    <span id="name_services">MAINTAIN</span>
  </div>
  <div class="services_1">
    <img
      src="../static/images/services_5.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto;"
    />
    <span id="name_services">BOARDROOM</span>
  </div>`;
  for (let i = 0; i < 14; i++) {
    div3_11.innerHTML += `<div class="services_1">
    <img
      src="../static/images/services_3.png"
      style="max-width: 80%; max-height: 100%; margin: 10px auto"/>
    <span id="name_services">football field</span>
  </div>`;
  }
  div3_11.setAttribute(
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
  div3_11.innerHTML = `
  <div class="services_form_1">
    <div class="services_form_1_1"><</div>
    <div class="services_form_1_2">ĐĂNG KÝ DỊCH VỤ</div>
  </div>
  <div class="services_form_2">
    <div class="container-form">
        <h2>Đăng Ký Dịch Vụ</h2>
        <form action="/payment" method="POST">
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
  div3_11.setAttribute("style", "display: flex; flex-direction: column;");
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
  let div3_11innerHTML = `<table class = "table">
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
    div3_11innerHTML += `<tr>
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
  div3_11innerHTML += `
    </tbody>
  </table>`;
  div3_11.innerHTML = div3_11innerHTML;
  div3_11.setAttribute(
    "style",
    `height: ${
      window.innerHeight - 130
    }px; overflow: auto; padding: 0 20px 10px 20px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 6px;`
  );
  window.addEventListener("resize", function () {
    div3_11.setAttribute(
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
  div3_11.innerHTML = `
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
        src="data:image/jpeg;base64,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"
        alt="Apartment Exterior"
      />
      <img
        src="data:image/jpeg;base64,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"
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
  div3_11.setAttribute(
    "style",
    `height: ${
      window.innerHeight - 130
    }px; font-family: Arial, sans-serif; overflow: auto`
  );
}
