if (!localStorage.getItem("logout")) {
  window.location.href = "home.html";
}

const signIn = async (e) => {
  e.preventDefault();

  const nameValue = document.getElementById("signInName").value;
  const passwordValue = document.getElementById("signInPassword").value;

  const res = await fetch("https://676a69f9863eaa5ac0de4ba3.mockapi.io/users");
  const data = await res.json();

  const incomeUser = data.find(
    (user) => user.username === nameValue && user.password === passwordValue
  );

  if (!incomeUser) {
    return alert("Incorrect username or password");
  } else {
    localStorage.setItem("verified", incomeUser.id);
    localStorage.setItem("logout", false);
    window.location.href = "home.html";
  }
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
