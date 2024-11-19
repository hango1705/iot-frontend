import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// Xử lý sự kiện khi nhấn vào nút Đăng xuất
document.getElementById('logout-button').addEventListener('click', function () {
    signOut(auth).then(() => {
        // Đăng xuất thành công, chuyển hướng về trang index.html
        window.location.href = "../index.html";  // Chuyển hướng về trang index.html
    }).catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Lỗi đăng xuất:', error);
    });
});

// Khởi tạo các Gauge
var tdsGauge = new JustGage({
    id: "tds-gauge",
    value: 150,
    min: 0,
    max: 1200,
    title: "TDS",
    label: "mg/L",
    decimals: 2,
    levelColors: [
        "#00ff00", // Xanh lá cây cho giá trị thấp
        "#ffff00", // Vàng cho giá trị trung bình
        "#ff0000"  // Đỏ cho giá trị cao
    ],
    levelColorsGradient: true
});

var temperatureGauge = new JustGage({
    id: "temperature-gauge",
    value: 25,
    min: 0,
    max: 50,
    title: "Nhiệt độ",
    label: "°C",
    decimals: 2,
    levelColors: [
        "#00ff00", // Xanh lá cây cho giá trị thấp
        "#ffff00", // Vàng cho giá trị trung bình
        "#ff0000"  // Đỏ cho giá trị cao
    ],
    levelColorsGradient: true
});

// Cấu hình biểu đồ
var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'TDS (mg/L)',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            fill: true,
        }, {
            label: 'Nhiệt độ (°C)',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            fill: true,
        }]
    }
});

// Lắng nghe dữ liệu từ Firebase
const sensorDataRef = ref(db, "sensorData");
onValue(sensorDataRef, (snapshot) => {
    const data = snapshot.val();
    const tdsValue = data.TDS || 0;
    const temperature = data.Temperature || 0;

    tdsGauge.refresh(tdsValue);
    temperatureGauge.refresh(temperature);

    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(tdsValue);
    chart.data.datasets[1].data.push(temperature);
    chart.update();


  const warningContainer = document.getElementById('warning-container');
    let warningMessage = '';
    let warningClass = '';
    let icon = '';

    if (tdsValue <= 300 && temperature >= 0 && temperature <= 35) {
        warningMessage = 'Chất lượng nước tốt!';
        warningClass = 'normal';
        icon = '✔️';
    } else if (tdsValue > 300 && tdsValue <= 600 || temperature > 35 && temperature <= 45) {
        warningMessage = 'Nước có vấn đề!';
        warningClass = 'warning';
        icon = '⚠️';
    } else {
        warningMessage = 'Nước không an toàn!';
        warningClass = 'danger';
        icon = '❌';
    }

    warningContainer.className = `warning-container ${warningClass}`;
    warningContainer.innerHTML = `<div class="icon">${icon}</div><p>${warningMessage}</p>`;
});
