import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const BookingByMonthChart = () => {
  const bookingStatApi =
    "http://localhost:8080/api/booking/stat/bookings-by-month";
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const bookingBarChart = async () => {
      try {
        const response = await axios.get(bookingStatApi, config);

        const data = {
          labels: response.data.label.map((month) => monthNames[month]),
          datasets: [
            {
              label: response.data.title,
              data: response.data.data,
              backgroundColor: "rgba(250, 204, 21, 0.25)",
              borderColor: "#facc15",
              borderWidth: 2,
            },
          ],
        };
        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
      } catch (err) {
        //console.log(err?.response);
      }
    };
    bookingBarChart();
  }, []);

  return <Chart type="bar" data={chartData} options={chartOptions} />;
};

export default BookingByMonthChart;
