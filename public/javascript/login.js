async function signUpFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#signUpEmail").value.trim();
  const username = document.querySelector("#signUpUsername").value.trim();
  const password = document.querySelector("#signUpPassword").value.trim();

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

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  if (email && password) {
    try{
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

document.querySelector("#signUpBtn").addEventListener("click", signUpFormHandler);
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
