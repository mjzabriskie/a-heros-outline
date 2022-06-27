// Function for logging out the user
async function logout() {
  try {
  // Posts to the logout route to destroy the session
  const response = await axios.post("/api/users/logout");
  // Redirects the user to the homepage once they've logged out
    document.location.replace("/");
  } catch (err) {
    window.alert(err.response.data.message);
  }
}

// Adds an event listener to the logout button
document.querySelector("#logout").addEventListener("click", logout);
