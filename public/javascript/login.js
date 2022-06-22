async function signUpFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#signUpEmail").value.trim();
  const username = document.querySelector("#signUpUsername").value.trim();
  const password = document.querySelector("#signUpPassword").value.trim();

  if (email && username && password) {
    axios
      .post("api/users", {
        email,
        username,
        password,
      })
      .then((response) => {
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert(response.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  if (email && password) {
    const response = await fetch("api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signUpBtn")
  .addEventListener("click", signUpFormHandler);
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
