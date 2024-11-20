const ReviewForm = document.querySelector("#reviewFrom");

// Field validation function
const validateField = (field) => {
  if (field.tagName === "TEXTAREA") {
    const isValid = field.value.trim() !== "";
    field.classList.toggle("success-border", isValid);
    field.classList.toggle("warn-border", !isValid);
    if (field.nextElementSibling) {
      field.nextElementSibling.classList.toggle("display", !isValid);
    }
    return isValid;
  }
  return true; // Non-TEXTAREA fields are always valid for now
};

// Real-time validation
ReviewForm.addEventListener("input", (event) => {
  validateField(event.target);
});

// Final validation and submit handler
ReviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isFormValid = true;

  // Validate all fields
  Array.from(ReviewForm.elements).forEach((element) => {
    const isValid = validateField(element);
    if (!isValid) isFormValid = false;
  });

  // Submit if valid
  if (isFormValid) {
    ReviewForm.submit(); // Programmatically submit the form
  }
});
