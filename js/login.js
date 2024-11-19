import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const auth = getAuth(app);  // Khởi tạo Firebase Authentication
const db = getDatabase(app);

// Lắng nghe sự kiện form đăng nhập
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Ngừng gửi form để xử lý bằng JS

  // Lấy dữ liệu từ form
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  // Sử dụng Firebase Authentication để đăng nhập
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Đăng nhập thành công
      const user = userCredential.user;
      alert("Đăng nhập thành công!");
      window.location.href = "../pages/dashboard.html";  // Điều hướng đến trang dashboard
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Đăng nhập thất bại: ${errorMessage}`);
    });
});
