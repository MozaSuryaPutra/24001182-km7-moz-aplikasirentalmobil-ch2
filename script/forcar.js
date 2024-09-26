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
    const start = new Date(2024, 8, 26);
    const end = new Date(2024, 9, 11);
    const startHour = 0;
    const endHour = 23;

    cars.availableAt = randomDate(start, end, startHour, endHour);
  });
  return datum;
}

async function updateData(driver, date, passenger) {
  const isWithDriver = driver === "denganSopir";
  const driverValue = isWithDriver ? true : false;

  const dataout = await carDate();
  const filteredData = dataout.filter((car) => {
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

document.getElementById("submit").addEventListener("click", async (event) => {
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
    driverInputValue,
    dateInput,
    passengerInput
  );

  console.log(RealData);

  let filteredCarsHTML = "";
  RealData.forEach((car) => {
    const carcontent = `
        <div class="col-md-4 h-100 pb-2 pt-2">
          <div class="card h-100" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">${car.model}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
               RP ${car.rentPerDay} / hari
              </h6>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <p class="card-text">
                Kapasitas: ${car.capacity} orang
              </p>
              <p class="card-text">
                Manual/Automatic: ${car.transmission}
              </p>
              <p class="card-text">
                Tahun : ${car.year}
              </p>
            </div>
          </div>
        </div>
      `;
    filteredCarsHTML += carcontent;
  });

  carContentElement.innerHTML = filteredCarsHTML;
});
// async function handleSubmit(event) {
//   event.preventDefault();
//   const dateInputValue = document.getElementById("dateInput").value;
//   const driverInputValue = document.getElementById("driverInput").value;
//   const passengerInputValue = document.getElementById("passengerInput").value;

//   if (dateInputValue === "" || driverInputValue === "") {
//     console.log("Input tanggal kosong. Tidak ada tindakan yang diambil.");
//     return;
//   } else if (dateInputValue === "" && driverInputValue === "") {
//     console.log("Input tanggal kosong. Tidak ada tindakan yang diambil.");
//     return;
//   }

//   const dateInput = new Date(dateInputValue).toISOString;

//   const RealData = await updateData(
//     driverInputValue,
//     dateInput,
//     passengerInputValue
//   );

//   console.log(RealData);

//   let filteredCarsHTML = "";
//   RealData.forEach((car) => {
//     const carcontent = `
//     <div class="col-md-4 h-100 pb-2 pt-2">
//       <div class="card h-100" style="width: 18rem">
//         <div class="card-body">
//           <h5 class="card-title">${car.model}</h5>
//           <h6 class="card-subtitle mb-2 text-body-secondary">
//            RP ${car.rentPerDay} / hari
//           </h6>
//           <p class="card-text">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//           <p class="card-text">
//             Kapasitas: ${car.capacity} orang
//           </p>
//           <p class="card-text">
//             Manual/Automatic: ${car.transmission}
//           </p>
//           <p class="card-text">
//             Tahun : ${car.year}
//           </p>
//         </div>
//       </div>
//     </div>
//   `;
//     filteredCarsHTML += carcontent;
//   });

//   carContentElement.innerHTML = filteredCarsHTML;
// }

// document.getElementById("submit").addEventListener("click", handleSubmit);
