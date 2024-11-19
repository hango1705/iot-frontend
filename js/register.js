import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRjbw-L9EV4lbR82JoO-zrAuBCMcJ7ZGU",
  authDomain: "water-monitoring-111ad.firebaseapp.com",
  databaseURL: "https://water-monitoring-111ad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "water-monitoring-111ad",
  storageBucket: "water-monitoring-111ad.firebasestorage.app",
  messagingSenderId: "212577000704",
  appId: "1:212577000704:web:58ea7dd133825b431fe7e5",
  measurementId: "G-DPVPY60RVR"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Đảm bảo auth được khởi tạo đúng
const db = getDatabase(app);

// Lắng nghe sự kiện form đăng ký
document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Ngừng gửi form để xử lý bằng JS

  // Lấy dữ liệu từ form
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Kiểm tra điều kiện đăng ký
  if (password !== confirmPassword) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp.");
    return;
  }

  if (fullname === "" || email === "" || password === "") {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  // Sử dụng Firebase Authentication để đăng ký
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Đăng ký thành công
      const user = userCredential.user;

      // Lưu thông tin người dùng vào Realtime Database (nếu cần thiết)
      const userData = {
        fullname: fullname,
        email: email,  // Lưu email gốc
        password: password  // Lưu mật khẩu không an toàn, cần mã hóa trong thực tế
      };

      const usersRef = ref(db, 'users/' + user.uid); // Dùng UID của người dùng Firebase làm khóa
      set(usersRef, userData)
        .then(() => {
          alert("Đăng ký thành công!");
          window.location.href = "../pages/login.html";  // Điều hướng đến trang đăng nhập
        })
        .catch((error) => {
          alert("Có lỗi xảy ra khi lưu dữ liệu: " + error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Đăng ký thất bại: ${errorMessage}`);
    });
});
