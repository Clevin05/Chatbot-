const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const forgotLink = document.getElementById("forgotPassword");
const forgotModal = document.getElementById("forgotModal");
const closeForgot = document.getElementById("closeForgot");
const sendReset = document.getElementById("sendReset");
const successMsg = document.getElementById("successMsg");
const forgotEmail = document.getElementById("forgotEmail");

// Open modal
forgotLink.addEventListener("click", function (e) {
  e.preventDefault();
  forgotModal.style.display = "flex";
});

// Close modal
closeForgot.addEventListener("click", function () {
  forgotModal.style.display = "none";
  successMsg.textContent = "";
  forgotEmail.value = "";
});

// Send reset link using EmailJS
sendReset.addEventListener("click", function () {
  const email = forgotEmail.value.trim();

  // Validate email
  if (email === "") {
    alert("Please enter your email");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email format");
    return;
  }

  // Show loading message
  successMsg.style.color = "black";
  successMsg.textContent = "Sending reset link...";

  // Send email using EmailJS
  emailjs.send("service_xxxxx", "template_q3cv91h", {
    to_email: email,
    reset_link: "https://example.com/reset-password",
    to_name: email.split('@')[0]
  })
  .then(() => {
    successMsg.style.color = "green";
    successMsg.textContent = "A password reset link has been sent to your email.";
    
    // Clear form after 3 seconds
    setTimeout(() => {
      forgotModal.style.display = "none";
      successMsg.textContent = "";
      forgotEmail.value = "";
    }, 3000);
  })
  .catch((error) => {
    successMsg.style.color = "red";
    successMsg.textContent = "Failed to send email. Please try again.";
    console.error("EmailJS Error:", error);
  });
});