// Declare plane variables
const shortPlaneEmissionsWOClouds = 0.141;
const mediumPlaneEmissionsWOClouds = 0.103;
const longPlaneEmissionsWOClouds = 0.0832;
const shortPlaneEmissionsWithClouds = 0.258;
const mediumPlaneEmissionsWithClouds = 0.187;
const longPlaneEmissionsWithClouds = 0.152;

// Declare train variables
const TGVEmissions = 0.002;
const ICEmissions = 0.0049;
const TEREmissions = 0.0194;

// Declare car variables
const smallFuel = 104; //  gCO2e/km
const mediumFuel = 134; //  gCO2e/km
const bigFuel = 152; //  gCO2e/km
const smallElec = 0.14; //  kwh/km
const mediumElec = 0.2; //  kwh/km
const bigElec = 0.22; //  kwh/km
var consumption = 104;

const roadCity = 1.15;
const roads = 1;
const highway = 0.85;
var roadTypeCoeff = 1.15;

const mixElecFR = 11; //  g/kwh
var nbPassengers = 1;

// Declare bus variables
const busesEmissions = 0.027; //  gCO2e/km/passsager (average value)

// Declare variables used to update numbers
const distanceInput = document.getElementById("distanceInput");

const output = document.getElementById("output");

const trainTypeSelect = document.getElementById("trainTypeSelect");

const multiPlaneSelect = document.getElementById("multiPlaneSelect");

const typeCarSelect = document.getElementById("typeCarSelect");
const sizeCarSelect = document.getElementById("sizeCarSelect");
const passengersCarSelect = document.getElementById("passengersCarSelect");
const roadSelect = document.getElementById("roadSelect");

// function to round a number
function round(x) {
  return Number.parseFloat(x).toFixed(0);
}

// addEventListener for every changes
distanceInput.addEventListener("input", estimate);
multiPlaneSelect.addEventListener("change", estimate);
trainTypeSelect.addEventListener("change", estimate);
typeCarSelect.addEventListener("change", estimate);
sizeCarSelect.addEventListener("change", estimate);
passengersCarSelect.addEventListener("change", estimate);
roadSelect.addEventListener("change", estimate);
modeSelect.addEventListener("change", estimate);
modeSelect.addEventListener("change", openOutput);



// function to estimate the emissions based on many parameters
function estimate(e) {



    // Estimate the train emissions
  if (modeSelect.value == "train") {
  if (trainTypeSelect.value == "ter") {
    output.textContent = round(TEREmissions * distanceInput.value);
  } else if (trainTypeSelect.value == "tgv") {
    output.textContent = round(TGVEmissions * distanceInput.value);
  } else if (trainTypeSelect.value == "ic") {
    output.textContent = round(ICEmissions * distanceInput.value);
  }
  }



    // Estimate the plane emissions
  if (modeSelect.value == "plane") {
  if (distanceInput.value <= 1000) {

    if (multiPlaneSelect.value == "x0") {
      output.textContent = round( shortPlaneEmissionsWOClouds * distanceInput.value);
    } else if (multiPlaneSelect.value == "x2") {
      output.textContent = round( shortPlaneEmissionsWithClouds* distanceInput.value);
    }
  } else if (distanceInput.value > 3500) {

    if (multiPlaneSelect.value == "x0") {
      output.textContent = round( longPlaneEmissionsWOClouds* distanceInput.value);
    } else if (multiPlaneSelect.value == "x2") {
      output.textContent = round( longPlaneEmissionsWithClouds* distanceInput.value);
    }

  } else {

    if (multiPlaneSelect.value == "x0") {
      output.textContent = round( mediumPlaneEmissionsWOClouds* distanceInput.value);
    } else if (multiPlaneSelect.value == "x2") {
      output.textContent = round( mediumPlaneEmissionsWithClouds* distanceInput.value);
    }

  }
  }



    // Estimate the car emissions
  if (modeSelect.value == "car") {
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
      (((1.2 * consumption * roadTypeCoeff) / nbPassengers) *
        distanceInput.value) /
        1000
    );
  } else if (typeCarSelect.value == "diesel") {
    output.textContent = round(
      (((0.8 * 1.2 * consumption * roadTypeCoeff) / nbPassengers) *
        distanceInput.value) /
        1000
    );
  } else {
    output.textContent = round(
      (((mixElecFR * 1.2 * consumption * roadTypeCoeff) /
        nbPassengers) *
        distanceInput.value) /
        1000
    );
  }
  }

    // Estimate the buses emissions
    if (modeSelect.value == "autocar") {
        output.textContent = round(busesEmissions * distanceInput.value);
      }
}





// function change the second card based on the selected changes
function openOutput(e) {
  if (modeSelect.value == "train") {
    openTrainTab();
  }
  else if (modeSelect.value == "plane") {
    openPlaneTab();
  }
  else if (modeSelect.value == "car") {
    openCarTab();
  }
  else if (modeSelect.value == "ferry") {
    openFerryTab();
  }
  else if (modeSelect.value == "autocar") {
    openAutocarTab();
  }
}

function openTrainTab() {
  var elementToOpen = document.getElementById("trainTab");
  var elementToHide1 = document.getElementById("planeTab");
  var elementToHide2 = document.getElementById("carTab");
  var elementToHide3 = document.getElementById("ferryTab");
  var elementToHide4 = document.getElementById("autocarTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
  elementToHide3.classList.add("hidden");
  elementToHide4.classList.add("hidden");
}

function openPlaneTab() {
  var elementToOpen = document.getElementById("planeTab");
  var elementToHide1 = document.getElementById("trainTab");
  var elementToHide2 = document.getElementById("carTab");
  var elementToHide3 = document.getElementById("ferryTab");
  var elementToHide4 = document.getElementById("autocarTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
  elementToHide3.classList.add("hidden");
  elementToHide4.classList.add("hidden");
}

function openCarTab() {
  var elementToOpen = document.getElementById("carTab");
  var elementToHide1 = document.getElementById("planeTab");
  var elementToHide2 = document.getElementById("trainTab");
  var elementToHide3 = document.getElementById("ferryTab");
  var elementToHide4 = document.getElementById("autocarTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
  elementToHide3.classList.add("hidden");
  elementToHide4.classList.add("hidden");
}

function openFerryTab() {
  var elementToOpen = document.getElementById("ferryTab");
  var elementToHide1 = document.getElementById("planeTab");
  var elementToHide2 = document.getElementById("trainTab");
  var elementToHide3 = document.getElementById("carTab");
  var elementToHide4 = document.getElementById("autocarTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
  elementToHide3.classList.add("hidden");
  elementToHide4.classList.add("hidden");
}

function openAutocarTab() {
  var elementToOpen = document.getElementById("autocarTab");
  var elementToHide1 = document.getElementById("planeTab");
  var elementToHide2 = document.getElementById("trainTab");
  var elementToHide3 = document.getElementById("ferryTab");
  var elementToHide4 = document.getElementById("carTab");
  elementToOpen.classList.remove("hidden");
  elementToHide1.classList.add("hidden");
  elementToHide2.classList.add("hidden");
  elementToHide3.classList.add("hidden");
  elementToHide4.classList.add("hidden");
}



// Estimate distance between 2 cities
const selectCity1 = document.getElementById("selectCity1");
const selectCity2 = document.getElementById("selectCity2");

// Selectize js
$(function () {
  $('#selectCity1').selectize();
});
$(function () {
  $('#selectCity2').selectize();
});


citiesList.forEach(d=> selectCity1.add(new Option(d.city + ', ' + d.country, d.value)));
citiesList.forEach(d=> selectCity2.add(new Option(d.city + ', ' + d.country, d.value)));


function getCoordinates(cityName) {
  // Find the city in the array
  const city = citiesList.find(city => city.city.toLowerCase() === cityName.toLowerCase());

  // Return the coordinates or a message if not found
  if (city) {
    return { lat: city.lat, long: city.long };
  } else {
    return `City "${cityName}" not found in the list.`;
  }
}
//function to estimate the distance between 2 cities
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return round(R * c); // Distance in kilometers
}
//function to get the distance
function calculateDistance() {
  const selectCity1 = document.getElementById("selectCity1").value;
  const selectCity2 = document.getElementById("selectCity2").value;
  const forthAndBack = document.getElementById("forthAndBack").value;

  const startCoords = getCoordinates(selectCity1);
  const endCoords = getCoordinates(selectCity2);

  var distance = haversine(startCoords.lat, startCoords.long, endCoords.lat, endCoords.long);
  if(forthAndBack == "AR") {distance = distance *2;}
  if(forthAndBack == "Aller") {distance = distance *1;}

  document.getElementById('distanceInput').value = distance;
}




//Modal section
const modalSection = document.getElementById("modalSection");

function openModal() {
  modalSection.showModal();
}
function closeModal() {
  modalSection.close();
  calculateDistance();
  estimate();
}


