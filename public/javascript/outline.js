const outlineFormEl = document.querySelector("#outline-form");
const wizardFormEl = document.querySelector("#wizard-form");
const prevBtn = document.querySelector("#prevBtn");
const comfortZoneEl = document.querySelector("#comfortZone");
const comfortZoneWizEl = document.querySelector("#comfortZoneWiz");
const characterDesireEl = document.querySelector("#characterDesire");
const characterDesireWizEl = document.querySelector("#characterDesireWiz");
const newSituationEl = document.querySelector("#newSituation");
const newSituationWizEl = document.querySelector("#newSituationWiz");
const characterAdaptsEl = document.querySelector("#characterAdapts");
const characterAdaptsWizEl = document.querySelector("#characterAdaptsWiz");
const getsDesireEl = document.querySelector("#getsDesire");
const getsDesireWizEl = document.querySelector("#getsDesireWiz");
const heavyPriceEl = document.querySelector("#heavyPrice");
const heavyPriceWizEl = document.querySelector("#heavyPriceWiz");
const familiarSituationEl = document.querySelector("#familiarSituation");
const familiarSituationWizEl = document.querySelector("#familiarSituationWiz");
const characterChangedEl = document.querySelector("#characterChanged");
const characterChangedWizEl = document.querySelector("#characterChangedWiz");

comfortZoneEl.addEventListener('change', function () {
  comfortZoneWizEl.value = this.value;
});
comfortZoneWizEl.addEventListener('change', function () {
  comfortZoneEl.value = this.value;
});

characterDesireEl.addEventListener('change', function () {
  characterDesireWizEl.value = this.value;
});
characterDesireWizEl.addEventListener('change', function () {
  characterDesireEl.value = this.value;
});

newSituationEl.addEventListener('change', function () {
  newSituationWizEl.value = this.value;
});
newSituationWizEl.addEventListener('change', function () {
  newSituationEl.value = this.value;
});

characterAdaptsEl.addEventListener('change', function () {
  characterAdaptsWizEl.value = this.value;
});
characterAdaptsWizEl.addEventListener('change', function () {
  characterAdaptsEl.value = this.value;
});

getsDesireEl.addEventListener('change', function () {
  getsDesireWizEl.value = this.value;
});
getsDesireWizEl.addEventListener('change', function () {
  getsDesireEl.value = this.value;
});

heavyPriceEl.addEventListener('change', function () {
  heavyPriceWizEl.value = this.value;
});
heavyPriceWizEl.addEventListener('change', function () {
  heavyPriceEl.value = this.value;
});

familiarSituationEl.addEventListener('change', function () {
  familiarSituationWizEl.value = this.value;
});
familiarSituationWizEl.addEventListener('change', function () {
  familiarSituationEl.value = this.value;
});

characterChangedEl.addEventListener('change', function () {
  characterChangedWizEl.value = this.value;
});
characterChangedWizEl.addEventListener('change', function () {
  characterChangedEl.value = this.value;
});


if (window.location.search) {
  wizardFormEl.classList.toggle("d-none");
} else {
  outlineFormEl.classList.toggle("d-none");
}

function clearTextarea(event) {
  // Checks that the event target was a clear button
  if (!event.target.classList.contains("clear-btn")) {
    return;
  }

  event.target.parentElement.querySelector("textarea").value = "";
}

async function saveNewOutline(event) {
  event.preventDefault();

  const title = document.querySelector("#outline-title").value.trim();
  const comfort_zone =
    document.querySelector("#comfortZone").value.trim() || "";
  const character_desire =
    document.querySelector("#characterDesire").value.trim() || "";
  const new_situation =
    document.querySelector("#newSituation").value.trim() || "";
  const character_adapts =
    document.querySelector("#characterAdapts").value.trim() || "";
  const gets_desire = document.querySelector("#getsDesire").value.trim() || "";
  const heavy_price = document.querySelector("#heavyPrice").value.trim() || "";
  const familiar_situation =
    document.querySelector("#familiarSituation").value.trim() || "";
  const character_changed =
    document.querySelector("#characterChanged").value.trim() || "";

  if (title) {
    try {
      const response = await axios.post("/api/outlines/", {
        title,
        comfort_zone,
        character_desire,
        new_situation,
        character_adapts,
        gets_desire,
        heavy_price,
        familiar_situation,
        character_changed,
      });
      document.location.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
}

async function saveOldOutline(event) {
  event.preventDefault();

  const title = document.querySelector("#outline-title").value.trim();
  const comfort_zone =
    document.querySelector("#comfortZone").value.trim() || "";
  const character_desire =
    document.querySelector("#characterDesire").value.trim() || "";
  const new_situation =
    document.querySelector("#newSituation").value.trim() || "";
  const character_adapts =
    document.querySelector("#characterAdapts").value.trim() || "";
  const gets_desire = document.querySelector("#getsDesire").value.trim() || "";
  const heavy_price = document.querySelector("#heavyPrice").value.trim() || "";
  const familiar_situation =
    document.querySelector("#familiarSituation").value.trim() || "";
  const character_changed =
    document.querySelector("#characterChanged").value.trim() || "";

  const fetchUrl = "/api/outlines/" + event.target.dataset.id;

  if (title) {
    try {
      const response = await axios.put(fetchUrl, {
        title,
        comfort_zone,
        character_desire,
        new_situation,
        character_adapts,
        gets_desire,
        heavy_price,
        familiar_situation,
        character_changed,
      });
      document.location.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
}

function saveButtonHandler(event) {
  return event.target.dataset.id
    ? saveOldOutline(event)
    : saveNewOutline(event);
}

let currStep = 0; // Current tab is set to be the first tab (0)
showStep(currStep); // Display the current tab

function showStep(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");

  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").textContent = "Finish";
  } else {
    document.getElementById("nextBtn").textContent = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(event) {
  let n;

  if (event.target.id == "nextBtn") {
    n = 1;
  } else {
    n = -1;
  }
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currStep].style.display = "none";
  // Increase or decrease the current tab by 1:
  currStep = currStep + n;

  // if you have reached the end of the form...
  if (currStep >= x.length) {
    // ... the form gets submitted:
    outlineFormEl.classList.toggle("d-none");
    return false;
  }
  // Otherwise, display the correct tab:
  showStep(currStep);
}

function validateForm() {
  document.getElementsByClassName("step")[currStep].className += " finish";
  return true; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function wizardToggle() {
  wizardFormEl.classList.toggle("d-none");
  outlineFormEl.classList.toggle("d-none");
}

document
  .querySelector("#outlineSection")
  .addEventListener("click", clearTextarea);
document
  .querySelector("#singlebutton")
  .addEventListener("click", saveButtonHandler);
document.querySelector("#nextBtn").addEventListener("click", nextPrev);
prevBtn.addEventListener("click", nextPrev);
document.querySelector("#wizard-btn").addEventListener("click", wizardToggle);
document.querySelector("#exit-btn").addEventListener("click", wizardToggle);
