const form = document.querySelector("#listingFrom");
console.log(form);
Array.from(form).forEach((element)=>{
    // console.dir(element.value.trim())
    element.addEventListener('input', function () {
        if (this.tagName === 'INPUT' || this.tagName === 'TEXTAREA') {
            if (this.value.trim() !== "") {
                console.log(this.nextElementSibling);
                this.classList.add('success-border');
                this.classList.remove('warn-border');
                this.nextElementSibling.classList.remove("display");

            } else {
                this.classList.remove('success-border');
                this.nextElementSibling.classList.add("display");

                this.classList.add('warn-border'); // Add warn-border when input is empty
            }
        }
    });
})

form.addEventListener("submit", function (e) {
  e.preventDefault();
  Array.from(form.elements).forEach((element) => {
    if (
      element.tagName === "INPUT" ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT"
    ) {
        // console.log(element)
      if (element.value.trim() === "") {
        element.classList.add("warn-border");
        element.nextElementSibling.classList.add("display");
      }else{
         element.classList.remove("warn-border")
         element.nextElementSibling.classList.remove("display");

      }
    }
  });
});
