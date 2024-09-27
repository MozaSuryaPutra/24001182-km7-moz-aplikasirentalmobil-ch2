const getCarsData = async () => {
  const response = await fetch("data/cars.json");
  const data = await response.json();
  return data;
};

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}

async function carDate(cars) {
  const start = new Date(2024, 8, 26);
  const end = new Date(2024, 9, 11);
  const startHour = 0;
  const endHour = 23;

  cars.forEach((car) => {
    car.availableAt = randomDate(start, end, startHour, endHour).toISOString();
  });

  console.log(cars);
  return cars;
}

async function updateData(cars, driver, date, passenger) {
  const isWithDriver = driver === "denganSopir";
  const driverValue = isWithDriver ? true : false;

  const filteredData = cars.filter((car) => {
    return (
      car.available === driverValue &&
      car.availableAt < date &&
      car.capacity >= passenger
    );
  });
  return filteredData;
}

const carContentElement = document.getElementById("car-content");
console.log(carContentElement);

let allCarsData = [];

const initializeCarsData = async () => {
  allCarsData = await getCarsData();
  await carDate(allCarsData);
};

const handleCarSubmit = async (event) => {
  event.preventDefault();

  const dateInputValue = document.getElementById("dateInput").value;
  const driverInputValue = document.getElementById("driverInput").value;
  const passengerInput = document.getElementById("passengerInput").value;

  if (dateInputValue === "" || driverInputValue === "") {
    console.log(
      "Input tanggal atau driver kosong. Tidak ada tindakan yang diambil."
    );
    return;
  }

  const dateInput = new Date(dateInputValue).toISOString();

  const RealData = await updateData(
    allCarsData,
    driverInputValue,
    dateInput,
    passengerInput
  );
  console.log(RealData);

  let filteredCarsHTML = "";
  if (RealData.length === 0) {
    filteredCarsHTML = "<p>Pencarianmu Tidak Ditemukan</p>";
  }
  RealData.forEach((car) => {
    const carContent = `
      <div class="col-md-4 h-100 pb-2 pt-2">
        <div class="card h-100 w-100">
          <div class="card-body">
            <img src="${car.image}" alt="" class="img-fluid d-block w-100" style="height: 400px; object-fit: contain;">
            <h5 class="card-title">${car.model}</h5>
            <h5 class="card-subtitle mb-2">RP ${car.rentPerDay} / hari</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="card-text"><i class="bi bi-people"></i> ${car.capacity} orang</p>
            <p class="card-text"><i class="bi bi-gear"></i> ${car.transmission}</p>
            <p class="card-text"><i class="bi bi-calendar4"></i> Tahun ${car.year}</p>
            <p class="card-text">
              <button class="btn-custom w-100">Pilih Mobil</button>
            </p>
          </div>
        </div>
      </div>
    `;
    filteredCarsHTML += carContent;
  });

  carContentElement.innerHTML = filteredCarsHTML;
};

initializeCarsData();

document.getElementById("submit").addEventListener("click", handleCarSubmit);
