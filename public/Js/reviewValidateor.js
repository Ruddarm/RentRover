const ReviewForm = document.querySelector("#reviewFrom");


const validateField = (field) => {
  if (
    field.tagName === "TEXTAREA"
  ) {
    const isValid = field.value.trim() !== "";
    field.classList.toggle("success-border", isValid);
    field.classList.toggle("warn-border", !isValid);
    if (field.nextElementSibling) {
      field.nextElementSibling.classList.toggle("display", isValid);
    }
    return isValid;
  }
  return true; // Non-input fields are always valid
};

Array.from(ReviewForm.elements).forEach((element) => {
  const isValid = validateField(element);
  if (!isValid) isFormValid = false;
});

if (isFormValid) {
  ReviewForm.submit(); // Programmatically submit the form
}
// Real-time validation
ReviewForm.addEventListener("input", (event) => {
  const field = event.target;
  validateField(field);
});

// // Change event for <select>
// ReviewForm.addEventListener("change", (event) => {
//   const field = event.target;
//   validateField(field);
// });

ReviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isFormValid = true;
  Array.from(ReviewForm.elements).forEach((element) => {
    const isValid = validateField(element);
    if (!isValid) isFormValid = false;
  });

  if (isFormValid) {
    form.submit(); // Programmatically submit the form
  }
});