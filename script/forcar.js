const getCarsData = async () => {
  const response = await fetch("data/cars.json");
  const data = await response.json();
  return data;
};

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date.toISOString();
}

async function carDate() {
  const datum = await getCarsData();
  datum.forEach((cars) => {
    const start = new Date(2022, 0, 1);
    const end = new Date();
    const startHour = 0;
    const endHour = 23;

    cars.availableAt = randomDate(start, end, startHour, endHour);
  });
  return datum;
}

async function updateData() {
  const dataout = await carDate();
  return dataout;
}

document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();
  const dateInputValue = document.getElementById("dateInput").value;

  if (dateInputValue === "") {
    console.log("Input tanggal kosong. Tidak ada tindakan yang diambil.");
    return;
  }

  const dateInput = new Date(dateInputValue);
  const passengerInput = document.getElementById("passengerInput").value;

  const RealData = await updateData();

  RealData.forEach((car) => {
    const carAvailableAt = new Date(car.availableAt);

    if (carAvailableAt > dateInput && car.capacity > passengerInput) {
      console.log("Bisa");
    } else {
      console.log("Gabisa");
    }
  });
});
