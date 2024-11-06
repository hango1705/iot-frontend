window.onload = function() {
    // Khởi tạo các Gauge cho TDS và Nhiệt độ
    var tdsGauge = new JustGage({
        id: "tds-gauge",
        value: 150,
        min: 0,
        max: 1000,
        title: "TDS",
        label: "mg/L",
        valueFontColor: "#000",
        titleFontColor: "#000",
        gaugeWidthScale: 0.1,
        donut: true,
        counter: true,
        startAnimationTime: 2,
    });

    var temperatureGauge = new JustGage({
        id: "temperature-gauge",
        value: 25,
        min: -10,
        max: 50,
        title: "Nhiệt độ",
        label: "°C",
        valueFontColor: "#000",
        titleFontColor: "#000",
        gaugeWidthScale: 0.1,
        donut: true,
        counter: true,
        startAnimationTime: 2,
    });

    // Cấu hình biểu đồ Line Chart
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',  // Dạng biểu đồ là Line
        data: {
            labels: [],  // Mảng trống ban đầu
            datasets: [{
                label: 'TDS (mg/L)',
                borderColor: 'rgb(75, 192, 192)',  // Màu đường biểu đồ TDS
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                data: [],  // Mảng chứa dữ liệu TDS
                fill: true,
            }, {
                label: 'Nhiệt độ (°C)',
                borderColor: 'rgb(255, 99, 132)',  // Màu đường biểu đồ Nhiệt độ
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                data: [],  // Mảng chứa dữ liệu Nhiệt độ
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',  // Trục X dạng tuyến tính
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Thời gian (Phút)',
                    },
                    ticks: {
                        stepSize: 5,  // Bước trục X là 5 phút
                        callback: function(value) {
                            return value + 'm';  // Hiển thị trục thời gian dưới dạng phút
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Giá trị'
                    }
                }
            }
        }
    });

    // Hàm cập nhật cảnh báo
    function updateWarningMessages(tds, temperature) {
        var tdsWarningElement = document.getElementById("tds-warning");
        var temperatureWarningElement = document.getElementById("temperature-warning");
        var tdsValueElement = document.getElementById("tds-value");
        var temperatureValueElement = document.getElementById("temperature-value");

        // Cập nhật giá trị TDS
        tdsValueElement.textContent = tds;
        if (tds > 500) {
            tdsWarningElement.classList.remove("safe", "warning");
            tdsWarningElement.classList.add("danger");
        } else if (tds > 200) {
            tdsWarningElement.classList.remove("safe", "danger");
            tdsWarningElement.classList.add("warning");
        } else {
            tdsWarningElement.classList.remove("danger", "warning");
            tdsWarningElement.classList.add("safe");
        }

        // Cập nhật giá trị Nhiệt độ
        temperatureValueElement.textContent = temperature;
        if (temperature > 40 || temperature < 0) {
            temperatureWarningElement.classList.remove("safe", "warning");
            temperatureWarningElement.classList.add("danger");
        } else if (temperature > 30 || temperature < 10) {
            temperatureWarningElement.classList.remove("safe", "danger");
            temperatureWarningElement.classList.add("warning");
        } else {
            temperatureWarningElement.classList.remove("danger", "warning");
            temperatureWarningElement.classList.add("safe");
        }
    }

    // Hàm cập nhật dữ liệu và biểu đồ
    var currentMinute = 0;  // Bắt đầu từ phút 0
    setInterval(function() {
        if (currentMinute >= 1440) {  // Nếu đã đạt 24 giờ (1440 phút)
            currentMinute = 0;  // Reset lại phút
        }

        // Giả sử mỗi 1 phút dữ liệu sẽ được cập nhật
        var currentTDS = Math.floor(Math.random() * 1000); // Giá trị TDS ngẫu nhiên
        var currentTemperature = Math.floor(Math.random() * 40) - 10; // Giá trị Nhiệt độ ngẫu nhiên

        // Thêm dữ liệu vào biểu đồ
        chart.data.labels.push(currentMinute);  // Thêm thời gian vào trục X
        chart.data.datasets[0].data.push(currentTDS);  // Dữ liệu TDS
        chart.data.datasets[1].data.push(currentTemperature);  // Dữ liệu Nhiệt độ

        // Cập nhật lại biểu đồ
        chart.update();

        // Cập nhật cảnh báo dựa trên giá trị TDS và Nhiệt độ
        updateWarningMessages(currentTDS, currentTemperature);

        // Tăng thời gian lên 1 phút
        currentMinute++;
    }, 60000); // Cập nhật mỗi phút (60000ms)
};
