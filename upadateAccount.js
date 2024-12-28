const update = async (e) => {
  e.preventDefault();

  const updatedName = document.getElementById("updateName").value;
  const updatedPassword = document.getElementById("updatePassword").value;
  const userId = localStorage.getItem("verified");

  const response = await fetch(
    `https://676a69f9863eaa5ac0de4ba3.mockapi.io/users/${userId}`
  );

  if (!response.ok) {
    return alert("404 not found");
  }

  const user = await response.json();

  const allUsers = await fetch(
    "https://676a69f9863eaa5ac0de4ba3.mockapi.io/users"
  );
  const data = await allUsers.json();

  const usernameTaken = data.find(
    (user) => user.username === updatedName && user.id !== userId
  );

  if (usernameTaken) {
    alert("That username already exists");
    return;
  }

  const res = await fetch(
    `https://676a69f9863eaa5ac0de4ba3.mockapi.io/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: updatedName,
        password: updatedPassword,
      }),
    }
  );

  const updated = await res.json();

  if (res.ok) {
    localStorage.setItem("verified", updated.id);
    alert("Account updated successfully");
  } else {
    alert("Error updating the account");
  }
};

document.getElementById("openGlass").addEventListener("click", (e) => {
  const passwordField = document.getElementById("updatePassword");
  const currentType = passwordField.getAttribute("type");

  if (currentType === "password") {
    passwordField.setAttribute("type", "text");
    e.target.classList.remove("fa-lock");
    e.target.classList.add("fa-eye-slash");
  } else {
    passwordField.setAttribute("type", "password");
    e.target.classList.remove("fa-eye-slash");
    e.target.classList.add("fa-lock");
  }
});
