// Function for deleting an outline
async function deleteOutline(event) {
  event.preventDefault();

  // Checks that the event target was a delete button
  if (!event.target.classList.contains("deleteOutline")) {
    return;
  }

  // Defines the URL to use for fetching using the data- variable containing the outline ID
  const fetchUrl = "/api/outlines/" + event.target.dataset.id;

  // Sends a fetch request to delete the outline
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  // Reloads the page if the outline was successfully deleted - the outline will no longer display
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

function viewOutline(event) {
  event.preventDefault();

  // Checks that the event target was a view button
  if (!event.target.classList.contains("viewOutline")) {
    return;
  }

  document.location.replace("/outline/" + event.target.dataset.id);
}

function newOutline(event) {
  event.preventDefault();

  document.location.replace("/outline/");
}

// Adds event listeners to the outline section to handle deleting and editing outlines
document
  .querySelector("#outlineSection")
  .addEventListener("click", deleteOutline);
document
  .querySelector("#outlineSection")
  .addEventListener("click", viewOutline);
document.querySelector("#singlebutton").addEventListener("click", newOutline);
