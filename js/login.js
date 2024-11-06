document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Ngừng gửi form để xử lý bằng JS
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    // Gửi thông tin đăng nhập (giả lập gọi API)
    console.log("Đang đăng nhập với:", username);
    // Thực hiện logic đăng nhập tại đây
  });
  