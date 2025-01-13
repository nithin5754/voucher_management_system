

const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

async function handleFormSubmit(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  if (!username) {
    errorMessage.textContent = "username not found!";
    return;
  }

  if (!password) {
    errorMessage.textContent = "password not found!";
    return;
  }

  const formData = { username, password,  };

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      errorMessage.textContent = "";
      window.location.href = "/dashboard"; 
    } else {
      errorMessage.textContent = result.message || "Login failed!";
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.textContent = "Something went wrong. Please try again.";
  }
}

form.addEventListener("submit", handleFormSubmit);
