// Declare plane variables
const shortPlaneEmissions = 126;
const mediumPlaneEmissions = 97.7;
const longPlaneEmissions = 83.06;
var planeEmissions = 0.259;

// Declare train variables
const TGVEmissions = 2;
const ICEmissions = 4.9;
const REREmissions = 4.9;
const TEREmissions = 19.4;
var trainEmissions = 0.002;

// Declare car variables
const smallFuel = 104; //  gCO2e/km
const mediumFuel = 134; //  gCO2e/km
const bigFuel = 152; //  gCO2e/km
const smallElec = 0.14; //  kwh/km
const mediumElec = 0.2; //  kwh/km
const bigElec = 0.22; //  kwh/km
var consumption = 104;

const coeff1990 = 1.28;
const coeff2000 = 1.19;
const coeff2010 = 1.14;
const coeff2020 = 1;
var coeffYear = 1;

const roadCity = 1.15;
const roads = 1;
const highway = 0.85;
var roadTypeCoeff = 1.15;

const mixElecFR = 11; //  g/kwh
var nbPassengers = 1;

// Declare variables used to update numbers
const distanceInput = document.getElementById("distanceInput");

const output = document.getElementById("output");

const trainTypeSelect = document.getElementById("trainTypeSelect");

const multiPlaneSelect = document.getElementById("multiPlaneSelect");

const typeCarSelect = document.getElementById("typeCarSelect");
const sizeCarSelect = document.getElementById("sizeCarSelect");
const yearSelect = document.getElementById("yearSelect");
const passengersCarSelect = document.getElementById("passengersCarSelect");
const roadSelect = document.getElementById("roadSelect");

function round(x) {
  return Number.parseFloat(x).toFixed(1);
}

distanceInput.addEventListener("input", estimate);
multiPlaneSelect.addEventListener("change", estimate);
trainTypeSelect.addEventListener("change", estimate);
typeCarSelect.addEventListener("change", estimate);
sizeCarSelect.addEventListener("change", estimate);
yearSelect.addEventListener("change", estimate);
passengersCarSelect.addEventListener("change", estimate);
roadSelect.addEventListener("change", estimate);
modeSelect.addEventListener("change", estimate);
modeSelect.addEventListener("change", openOutput);

function estimate(e) {
  if (modeSelect.value == "train") {
    // Estimate the train emissions
  if (trainTypeSelect.value == "ter") {
    trainEmissions = TEREmissions / 1000;
  } else if (trainTypeSelect.value == "rer") {
    trainEmissions = REREmissions / 1000;
  } else if (trainTypeSelect.value == "tgv") {
    trainEmissions = TGVEmissions / 1000;
  } else if (trainTypeSelect.value == "ic") {
    trainEmissions = ICEmissions / 1000;
  }
  output.textContent = round(trainEmissions * distanceInput.value);
  }
  if (modeSelect.value == "plane") {
    // Estimate the plane emissions
  if (distanceInput.value < 1000) {
    planeEmissions = shortPlaneEmissions / 1000;
  } else if (distanceInput.value > 3500) {
    planeEmissions = longPlaneEmissions / 1000;
  } else {
    planeEmissions = mediumPlaneEmissions / 1000;
  }
  if (multiPlaneSelect.value == "x0") {
    output.textContent = round(planeEmissions * distanceInput.value);
  } else if (multiPlaneSelect.value == "x2") {
    output.textContent = round(2 * planeEmissions * distanceInput.value);
  } else if (multiPlaneSelect.value == "x3") {
    output.textContent = round(3 * planeEmissions * distanceInput.value);
  }
  }
  if (modeSelect.value == "car") {
    // Estimate the car emissions
  // var consumption
  if (typeCarSelect.value == "fuel" || typeCarSelect.value == "diesel") {
    if (sizeCarSelect.value == "small") {
      consumption = smallFuel;
    } else if (sizeCarSelect.value == "medium") {
      consumption = mediumFuel;
    } else if (sizeCarSelect.value == "big") {
      consumption = bigFuel;
    }
  } else if (typeCarSelect.value == "elec") {
    if (sizeCarSelect.value == "small") {
      consumption = smallElec;
    } else if (sizeCarSelect.value == "medium") {
      consumption = mediumElec;
    } else if (sizeCarSelect.value == "big") {
      consumption = bigElec;
    }
  }

  // var coeffYear
  if (yearSelect.value == "1990") {
    coeffYear = coeff1990;
  } else if (yearSelect.value == "2000") {
    coeffYear = coeff2000;
  } else if (yearSelect.value == "2010") {
    coeffYear = coeff2010;
  } else if (yearSelect.value == "2020") {
    coeffYear = coeff2020;
  }
  // var roadTypeCoeff
  if (roadSelect.value == "city") {
    roadTypeCoeff = roadCity;
  } else if (roadSelect.value == "both") {
    roadTypeCoeff = roads;
  } else if (roadSelect.value == "highway") {
    roadTypeCoeff = highway;
  }

  //var nbPassengers
  if (passengersCarSelect.value == "1") {
    nbPassengers = 1;
  } else if (passengersCarSelect.value == "2") {
    nbPassengers = 2;
  } else if (passengersCarSelect.value == "3") {
    nbPassengers = 3;
  } else if (passengersCarSelect.value == "4") {
    nbPassengers = 4;
  } else if (passengersCarSelect.value == "5") {
    nbPassengers = 5;
  }
  // output
  if (typeCarSelect.value == "fuel") {
    output.textContent = round(
      (((1.2 * consumption * coeffYear * roadTypeCoeff) / nbPassengers) *
        distanceInput.value) /
        1000
    );
  } else if (typeCarSelect.value == "diesel") {
    output.textContent = round(
      (((0.8 * 1.2 * consumption * coeffYear * roadTypeCoeff) / nbPassengers) *
        distanceInput.value) /
        1000
    );
  } else {
    output.textContent = round(
      (((mixElecFR * 1.2 * consumption * coeffYear * roadTypeCoeff) /
        nbPassengers) *
        distanceInput.value) /
        1000
    );
  }
  }
    
}

function openOutput(e) {
  if (modeSelect.value == "train") {
    openTrainTab();
  }
  if (modeSelect.value == "plane") {
    openPlaneTab();
  }
  if (modeSelect.value == "car") {
    openCarTab();
  }
}

function openTrainTab() {
  var elementToOpen = document.getElementById("trainTab");
  var elementToHide1 = document.getElementById("planeTab");
  var elementToHide2 = document.getElementById("carTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
}

function openPlaneTab() {
  var elementToOpen = document.getElementById("planeTab");
  var elementToHide1 = document.getElementById("trainTab");
  var elementToHide2 = document.getElementById("carTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
}

function openCarTab() {
  var elementToOpen = document.getElementById("carTab");
  var elementToHide1 = document.getElementById("planeTab");
  var elementToHide2 = document.getElementById("trainTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
}

