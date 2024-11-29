const form = document.querySelectorAll("form[data-validate]")[0];

if (form) {
  const validateField = (field) => {
    if (
      field.type === "text" ||
      field.tagName === "TEXTAREA" ||
      field.tagName === "SELECT"
    ) {
      const isValid = field.value.trim() !== "";
      field.classList.toggle("success-border", isValid);
      field.classList.toggle("warn-border", !isValid);
      if (field.nextElementSibling) {
        field.nextElementSibling.classList.toggle("display", !isValid);
      }
      return isValid;
    }
    return true; // Non-input fields are always valid
  };

  // Real-time validation
  form.addEventListener("input", (event) => {
    const field = event.target;
    validateField(field);
  });

  // Change event for <select>
  form.addEventListener("change", (event) => {
    const field = event.target;
    validateField(field);
  });

  // Submit validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isFormValid = true;

    Array.from(form.elements).forEach((element) => {
      const isValid = validateField(element);
      if (!isValid) isFormValid = false;
    });

    if (isFormValid) {
      form.submit(); // Programmatically submit the form
    }
  });
}

const alertDiv = document.querySelectorAll(".alertbox");
const closebtn = document.querySelectorAll("#closealert");
if (closebtn) {
  closebtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      alertDiv[index].classList.add("remove");
      setTimeout(() => {
        alertDiv[index].remove();
      }, 500);
    });
  });
}
