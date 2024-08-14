// const menuBtn = document.querySelector("#header .menu-button");
// const closeBtn = document.querySelector(
//   "#header .header-link-list .close-button"
// );
// const menu = document.querySelector("#header .header-link-list");

// menuBtn.addEventListener("click", () => {
//   menu.classList.add("active");
// });

// closeBtn.addEventListener("click", () => {
//   menu.classList.remove("active");
// });

// URL của API Google Apps Script
const apiUrl =
  "https://script.googleusercontent.com/macros/echo?user_content_key=83NtRnZlxsCavItAv6fqWoU4ga3TrV5KH-wI3fgxARDqcGj6H1E_mAkICzL1FztOlTM859p9w9lJJ5T8HKnsQBaCymQ-37evm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNbxAXlY-m_u9ksRCuQxzvH-tKhKBnm3wUzwwd6I7NpyCfSUGeCB4S-ZXszFLzz-N3bUL3LKeh4G6Q9EQ1kv0n-lcXv3UPrt9w&lib=MWZbkCA0eoCcHHpgHT2hcoY81NHYCYHNi";

document.addEventListener("DOMContentLoaded", function () {
  const checkButton = document.getElementById("checkButton");
  const userInput = document.getElementById("userInput");
  const results = document.querySelectorAll("#check .result-item");

  const successImg = "./assets/images/success.svg";
  const failedImg = "./assets/images/failed.svg";
  const loadingImg = "./assets/images/loading.png";

  let fetchedData = []; // Biến để lưu dữ liệu đã fetch
  let isDataFetched = false; // Biến để kiểm tra dữ liệu đã được fetch hay chưa
  let WALLETS = [];

  // Hàm fetch dữ liệu
  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      fetchedData = data.content; // Lưu dữ liệu đã fetch
      isDataFetched = true; // Đánh dấu dữ liệu đã được fetch
      WALLETS = Object.keys(fetchedData);

      // Nếu người dùng đã nhập dữ liệu trước đó thì kiểm tra luôn
      if (userInput.value) {
        checkData(fetchedData, userInput.value);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      results.forEach((result) => {
        result.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
      });
    }
  }

  // Gọi hàm fetch ngay khi trang tải
  fetchData();

  // Lắng nghe sự kiện nhấn nút
  checkButton.addEventListener("click", function () {
    const inputValue = userInput.value; // Lấy giá trị từ input

    if (inputValue != "") {
      // Thêm trạng thái "loading" cho tất cả các cột
      results.forEach((result) => {
        result.className = "result-item";
        result.classList.add("loading");
        result.querySelector(".icon img").setAttribute("src", loadingImg);
      });
      checkButton.classList.add("disable");
      checkButton.disable = true;
    }

    // Sau khi fetch dữ liệu xong, kiểm tra dữ liệu
    if (isDataFetched) {
      checkData(fetchedData, inputValue);
    } else {
      // Trường hợp fetch dữ liệu chưa xong, đợi fetch xong rồi kiểm tra
      fetchData().then(() => checkData(fetchedData, inputValue));
    }
  });

  function checkData(data, input) {
    // Thực hiện kiểm tra hoặc xử lý dữ liệu với giá trị nhập từ người dùng
    checkButton.disable = false;
    checkButton.classList.remove("disable");
    WALLETS.forEach((wallet, index) => {
      // results[index].classList.remove("loading");
      results[index].classList.toggle("loading");
      if (data[wallet].includes(input)) {
        results[index].classList.add("success");
        results[index]
          .querySelector(".icon img")
          .setAttribute("src", successImg);
      } else {
        results[index].classList.add("failed");
        results[index]
          .querySelector(".icon img")
          .setAttribute("src", failedImg);
      }
    });
  }
});

// const checkButton = document.getElementById("checkButton");
// const input = document.getElementById("userInput");
// const wallets = Object.keys(WALLETS);
// const results = document.querySelectorAll("#check .result-item");

// const successImg = "./assets/images/success.svg";
// const failedImg = "./assets/images/failed.svg";
// const loadingImg = "./assets/images/loading.png";

// const checkData = () => {
//   let inputValue = input.value;

//   wallets.forEach((wallet, index) => {
//     results[index].className = "result-item";

//     results[index].classList.add("loading");
//     results[index].querySelector(".icon img").setAttribute("src", loadingImg);
//     setTimeout(() => {
//       if (WALLETS[wallet].includes(inputValue)) {
//         results[index].classList.toggle("loading");
//         results[index].classList.add("success");
//         results[index]
//           .querySelector(".icon img")
//           .setAttribute("src", successImg);
//       } else {
//         results[index].classList.toggle("loading");
//         results[index].classList.add("failed");
//         results[index]
//           .querySelector(".icon img")
//           .setAttribute("src", failedImg);
//       }
//     }, 2000);
//   });
// };
