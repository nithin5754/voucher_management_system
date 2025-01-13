

const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("error-message");

async function handleFormSubmit(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match!";
    return;
  }

  const formData = { username, email, password, confirmPassword };

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      errorMessage.textContent = "";
      window.location.href = "/login"; 
    } else {
      errorMessage.textContent = result.message || "Registration failed!";
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.textContent = "Something went wrong. Please try again.";
  }
}

form.addEventListener("submit", handleFormSubmit);
