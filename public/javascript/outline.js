//Forms
const outlineFormEl = document.querySelector("#outline-form");
const wizardFormEl = document.querySelector("#wizard-form");

//Buttons
const prevBtnEl = document.querySelector("#prev-btn");
const nextBtnEl = document.querySelector("#next-btn");
const saveOutlineBtnEl = document.querySelector("#save-outline-btn");
const wizardBtnEl = document.querySelector("#wizard-btn");
const exitBtnEl = document.querySelector("#exit-btn");

//Textareas
const outlineTitleEl = document.querySelector("#outline-title");
const outlineTitleWizEl = document.querySelector("#outline-title-wiz");
const comfortZoneEl = document.querySelector("#comfort-zone");
const comfortZoneWizEl = document.querySelector("#comfort-zone-wiz");
const characterDesireEl = document.querySelector("#character-desire");
const characterDesireWizEl = document.querySelector("#character-desire-wiz");
const newSituationEl = document.querySelector("#new-situation");
const newSituationWizEl = document.querySelector("#new-situation-wiz");
const characterAdaptsEl = document.querySelector("#character-adapts");
const characterAdaptsWizEl = document.querySelector("#character-adapts-wiz");
const getsDesireEl = document.querySelector("#gets-desire");
const getsDesireWizEl = document.querySelector("#gets-desire-wiz");
const heavyPriceEl = document.querySelector("#heavy-price");
const heavyPriceWizEl = document.querySelector("#heavy-price-wiz");
const familiarSituationEl = document.querySelector("#familiar-situation");
const familiarSituationWizEl = document.querySelector("#familiar-situation-wiz");
const characterChangedEl = document.querySelector("#character-changed");
const characterChangedWizEl = document.querySelector("#character-changed-wiz");

//Controller input variables
let title;
let comfort_zone;
let character_desire;
let new_situation;
let character_adapts;
let gets_desire;
let heavy_price;
let familiar_situation;
let character_changed;

//Function variables
let currStep = 0;

//Looks for query string to determine which view opens on initialize
if (window.location.search) {
  wizardFormEl.classList.toggle("d-none");
} else {
  outlineFormEl.classList.toggle("d-none");
}

// Checks that the event target was a clear button
function clearTextarea(event) {
  if (!event.target.classList.contains("clear-btn")) {
    return;
  }
  //finds the textarea in the parent of the button
  event.target.parentElement.querySelector("textarea").value = "";
}

//Determines which fetch request will be completed, PUT or POST
function saveButtonHandler(event) {
  return event.target.dataset.id
    ? saveOldOutline(event)
    : saveNewOutline(event);
}

//Uses POST to create new outline in database
async function saveNewOutline(event) {
  event.preventDefault();

  title = outlineTitleEl.value.trim() || "";
  comfort_zone = comfortZoneEl.value.trim() || "";
  character_desire = characterDesireEl.value.trim() || "";
  new_situation = newSituationEl.value.trim() || "";
  character_adapts = characterAdaptsEl.value.trim() || "";
  gets_desire = getsDesireEl.value.trim() || "";
  heavy_price = heavyPriceEl.value.trim() || "";
  familiar_situation = familiarSituationEl.value.trim() || "";
  character_changed = characterChangedEl.value.trim() || "";

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

//Uses PUT to update existing outlines
async function saveOldOutline(event) {
  event.preventDefault();

  title = outlineTitleEl.value.trim() || "";
  comfort_zone = comfortZoneEl.value.trim() || "";
  character_desire = characterDesireEl.value.trim() || "";
  new_situation = newSituationEl.value.trim() || "";
  character_adapts = characterAdaptsEl.value.trim() || "";
  gets_desire = getsDesireEl.value.trim() || "";
  heavy_price = heavyPriceEl.value.trim() || "";
  familiar_situation = familiarSituationEl.value.trim() || "";
  character_changed = characterChangedEl.value.trim() || "";

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

//Shows the whichever step number is passed in
function showStep(step) {
  const tabsArray = document.getElementsByClassName("tab");

  tabsArray[step].style.display = "block";

  //Controls button visiblity and textContent depending on the step
  if (step == 0) {
    document.getElementById("prev-btn").style.display = "none";
  } else {
    document.getElementById("prev-btn").style.display = "inline";
  }
  if (step == tabsArray.length - 1) {
    document.getElementById("next-btn").textContent = "Finish";
  } else {
    document.getElementById("next-btn").textContent = "Next";
  }
  //calls function to set step indicator
  setStepIndicator(step);
}

//Sets step indicator
function setStepIndicator(step) {
  // This function removes the "active" class of all steps...
  let i;
  const stepsArray = document.getElementsByClassName("step");
  for (i = 0; i < stepsArray.length; i++) {
    stepsArray[i].className = stepsArray[i].className.replace(" active", "");
  }
  //adds active class on current step
  stepsArray[step].className += " active";
}

//controls movement from tab to tab
function nextPrev(event) {
  let n;

  //Stops user from continuing past number of tabs
  if (nextBtnEl.textContent === "Finish" && event.target.textContent === "Finish") {
    wizardToggle();
    return;
  }

  if (event.target.id == "next-btn") {
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

function wizardToggle() {
  wizardFormEl.classList.toggle("d-none");
  outlineFormEl.classList.toggle("d-none");
}

showStep(currStep);

outlineFormEl.addEventListener("click", clearTextarea);
saveOutlineBtnEl.addEventListener("click", saveButtonHandler);
nextBtnEl.addEventListener("click", nextPrev);
prevBtnEl.addEventListener("click", nextPrev);
wizardBtnEl.addEventListener("click", wizardToggle);
exitBtnEl.addEventListener("click", wizardToggle);

//The following listeners synchronize changes between outline view and wizard view
outlineTitleEl.addEventListener("change", function () {
  outlineTitleWizEl.value = this.value;
});
if (outlineTitleWizEl){//handlebars helper determins if this element is created
  outlineTitleWizEl.addEventListener("change", function () {
    outlineTitleEl.value = this.value;
  });
}

comfortZoneEl.addEventListener("change", function () {
  comfortZoneWizEl.value = this.value;
});
comfortZoneWizEl.addEventListener("change", function () {
  comfortZoneEl.value = this.value;
});

characterDesireEl.addEventListener("change", function () {
  characterDesireWizEl.value = this.value;
});
characterDesireWizEl.addEventListener("change", function () {
  characterDesireEl.value = this.value;
});

newSituationEl.addEventListener("change", function () {
  newSituationWizEl.value = this.value;
});
newSituationWizEl.addEventListener("change", function () {
  newSituationEl.value = this.value;
});

characterAdaptsEl.addEventListener("change", function () {
  characterAdaptsWizEl.value = this.value;
});
characterAdaptsWizEl.addEventListener("change", function () {
  characterAdaptsEl.value = this.value;
});

getsDesireEl.addEventListener("change", function () {
  getsDesireWizEl.value = this.value;
});
getsDesireWizEl.addEventListener("change", function () {
  getsDesireEl.value = this.value;
});

heavyPriceEl.addEventListener("change", function () {
  heavyPriceWizEl.value = this.value;
});
heavyPriceWizEl.addEventListener("change", function () {
  heavyPriceEl.value = this.value;
});

familiarSituationEl.addEventListener("change", function () {
  familiarSituationWizEl.value = this.value;
});
familiarSituationWizEl.addEventListener("change", function () {
  familiarSituationEl.value = this.value;
});

characterChangedEl.addEventListener("change", function () {
  characterChangedWizEl.value = this.value;
});
characterChangedWizEl.addEventListener("change", function () {
  characterChangedEl.value = this.value;
});
