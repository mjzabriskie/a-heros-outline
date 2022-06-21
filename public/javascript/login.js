async function signUpFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#signUpEmail").value.trim();
  const username = document.querySelector("#signUpUsername").value.trim();
  const password = document.querySelector("#signUpPassword").value.trim();

  console.log(email, username, password);
  if (email && username && password) {
    const response = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
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

document.querySelector("#signUp").addEventListener("click", signUpFormHandler);
