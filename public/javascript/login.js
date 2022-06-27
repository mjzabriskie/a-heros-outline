// Input fields on the signup and login modals
const signUpEmail = document.querySelector("#signUpEmail");
const signUpUsername = document.querySelector("#signUpUsername");
const signUpPassword = document.querySelector("#signUpPassword");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");

// Function for signup form submission
async function signUpFormHandler(event) {
  event.preventDefault();

  const email = signUpEmail.value.trim();
  const username = signUpUsername.value.trim();
  const password = signUpPassword.value.trim();

  // Checks that each of the required form elements has been filled out
  if (email && username && password) {
    try {
      // Posts a new user to the database
      const response = await axios.post("api/users", {
        email,
        username,
        password,
      });
      // Sends the new user to their dashboard
      document.location.replace("/dashboard");
    } catch (err) {
      window.alert(err.response.data.message);
    }
  }
  // Checks each input field and provides a visual alert for required fields that are empty
  else {
    signUpEmailValidate();
    signUpUsernameValidate();
    signUpPasswordValidate();
  }
}

// Function for login form submission
async function loginFormHandler(event) {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  // Checks that each of the required form elements has been filled out
  if (email && password) {
    try {
      // Posts a user's login credentials to the database for verification
      const response = await axios.post("api/users/login", {
        email,
        password,
      });
      // Sends the logged in user to their dashboard
      document.location.replace("/dashboard");
    } catch (err) {
      window.alert(err.response.data.message);
    }
  }
  // Checks each input field and provides a visual alert for required fields that are empty
  else {
    loginEmailValidate();
    loginPasswordValidate();
  }
}

// Checks that some input has been entered into the signup email field - adds a visual alert if the field is empty/emptied
function signUpEmailValidate() {
  switch (signUpEmail.value.trim().length) {
    case 0:
      signUpEmail.classList.add("is-invalid");
      break;
    default:
      signUpEmail.classList.remove("is-invalid");
  }
}

// Checks that some input has been entered into the signup username field - adds a visual alert if the field is empty/emptied
function signUpUsernameValidate() {
  switch (signUpUsername.value.trim().length) {
    case 0:
      signUpUsername.classList.add("is-invalid");
      break;
    default:
      signUpUsername.classList.remove("is-invalid");
  }
}

// Checks that some input has been entered into the signup password field - adds a visual alert if the text in the field is less than 6 characters long
function signUpPasswordValidate() {
  switch (signUpPassword.value.trim().length < 6) {
    case true:
      signUpPassword.classList.add("is-invalid");
      break;
    default:
      signUpPassword.classList.remove("is-invalid");
  }
}

// Checks that some input has been entered into the login email field - adds a visual alert if the field is empty/emptied
function loginEmailValidate() {
  switch (loginEmail.value.trim().length) {
    case 0:
      loginEmail.classList.add("is-invalid");
      break;
    default:
      loginEmail.classList.remove("is-invalid");
  }
}

// Checks that some input has been entered into the login password field - adds a visual alert if the field is empty/emptied
function loginPasswordValidate() {
  switch (loginPassword.value.trim().length) {
    case 0:
      loginPassword.classList.add("is-invalid");
      break;
    default:
      loginPassword.classList.remove("is-invalid");
  }
}

// Event handlers for the form submit buttons
document
  .querySelector("#signUpBtn")
  .addEventListener("click", signUpFormHandler);
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);

// Event handlers for form input validation - will alert the user to required fields if they remove all text from a required field, and will remove the alert once the field receives adequate text
signUpEmail.addEventListener("input", signUpEmailValidate);
signUpUsername.addEventListener("input", signUpUsernameValidate);
signUpPassword.addEventListener("input", signUpPasswordValidate);
loginEmail.addEventListener("input", loginEmailValidate);
loginPassword.addEventListener("input", loginPasswordValidate);
