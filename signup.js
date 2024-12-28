const signUp = async (e) => {
  e.preventDefault();

  const nameValue = document.getElementById("signUpName").value;
  const passwordValue = document.getElementById("signUpPassword").value;

  const res = await fetch("https://676a69f9863eaa5ac0de4ba3.mockapi.io/users");
  const translate = await res.json();
  const sameName = translate.find((user) => user.username === nameValue);

  if (sameName) {
    return alert("Error, that username is already exist");
  }

  const response = await fetch(
    "https://676a69f9863eaa5ac0de4ba3.mockapi.io/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nameValue,
        password: passwordValue,
      }),
    }
  );
  response.json();
  alert(
    "Congratulations, your account successfully created and please sign in again"
  );
  window.location.href = "index.html";
};

document.getElementById("openGlass").addEventListener("click", () => {
  const passwordField = document.getElementById("signInPassword");
  const currentType = passwordField.getAttribute("type");

  if (currentType === "password") {
    passwordField.setAttribute("type", "text");
    this.classList.remove("fa-lock");
    this.classList.add("fa-eye-slash");
  } else {
    passwordField.setAttribute("type", "password");
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-lock");
  }
});
