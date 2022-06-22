function clearTextarea(event) {
  event.preventDefault();

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
    const response = await fetch("/api/outlines/", {
      method: "POST",
      body: JSON.stringify({
        title,
        comfort_zone,
        character_desire,
        new_situation,
        character_adapts,
        gets_desire,
        heavy_price,
        familiar_situation,
        character_changed,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
    } else {
      alert(response.statusText);
    }
    document.location.replace("/dashboard");
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
    const response = await fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify({
        title,
        comfort_zone,
        character_desire,
        new_situation,
        character_adapts,
        gets_desire,
        heavy_price,
        familiar_situation,
        character_changed,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert(response.statusText);
    }
  }
}

function saveButtonHandler(event) {
  return event.target.dataset.id
    ? saveOldOutline(event)
    : saveNewOutline(event);
}

document
  .querySelector("#outlineSection")
  .addEventListener("click", clearTextarea);
document
  .querySelector("#singlebutton")
  .addEventListener("click", saveButtonHandler);