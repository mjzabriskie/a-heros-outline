const signUpEmail = document.querySelector("#signUpEmail");
const signUpUsername = document.querySelector("#signUpUsername");
const signUpPassword = document.querySelector("#signUpPassword");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");

async function signUpFormHandler(event) {
  event.preventDefault();

  const email = signUpEmail.value.trim();
  const username = signUpUsername.value.trim();
  const password = signUpPassword.value.trim();

  if (email && username && password) {
    try {
      const response = await axios.post("api/users", {
        email,
        username,
        password,
      });
      document.location.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (email && password) {
    try {
      const response = await axios.post("api/users/login", {
        email,
        password,
      });
      document.location.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
}

function toggleVaild() {
  if (outlineTitleEl.classList.contains("is-invalid")) {
    outlineTitleEl.classList.remove("is-invalid");
  }
  if (outlineTitleEl.value.trim().length === 0) {
    outlineTitleEl.classList.add("is-invalid");
  }
}

document
  .querySelector("#signUpBtn")
  .addEventListener("click", signUpFormHandler);
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
