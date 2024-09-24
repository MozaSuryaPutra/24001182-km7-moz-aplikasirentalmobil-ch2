const getCarsData = async () => {
  const response = await fetch("data/cars.json");
  const data = await response.json();

  return data;
};

console.log(getCarsData());
