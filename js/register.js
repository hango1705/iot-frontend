document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Ngừng gửi form để xử lý bằng JS
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
  
    if (fullname === "" || email === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    // Gửi thông tin đăng ký (giả lập gọi API)
    console.log("Đang đăng ký với:", fullname, email);
    // Thực hiện logic đăng ký tại đây
  });
  