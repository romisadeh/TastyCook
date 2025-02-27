document.addEventListener("DOMContentLoaded", function () {
    // Get all form elements
    const recipeForm = document.getElementById("recipeForm");
    const feedback = document.getElementById("feedback");
    const recipeImage = document.getElementById("recipeImage");
    const otherRadio = document.getElementById('other');
    const otherText = document.getElementById('otherText');
    const allRadios = document.getElementsByName('recipeType');

    // Function to handle the other text input visibility
    function toggleOtherText() {
        if (otherRadio.checked) {
            otherText.classList.remove('hidden');
            otherText.required = true;
        } else {
            otherText.classList.add('hidden');
            otherText.required = false;
            otherText.value = '';
        }
    }

    // Add change event listener to all radio buttons
    Array.from(allRadios).forEach(radio => {
        radio.addEventListener('change', toggleOtherText);
    });

    // Function to find first empty required field and focus on it
    function findAndFocusFirstEmptyField() {
        const requiredFields = [
            { id: "recipeName", name: "Recipe Name" },
            { id: "prepTime", name: "Preparation Time" },
            { id: "IngredientsText", name: "Ingredients List" },
            { id: "recipeText", name: "Recipe Description" },
            { id: "recipeImage", name: "Image" }
        ];

        // Check regular input fields
        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                alert(`Please fill in the ${field.name} field.`);
                element.focus();
                return true;
            }
        }

        // Check radio buttons
        if (!Array.from(allRadios).some(radio => radio.checked)) {
            alert("Please select a Recipe Type.");
            allRadios[0].focus();
            return true;
        }

        // Check "Other" text if "Other" is selected
        if (otherRadio.checked && !otherText.value.trim()) {
            alert("Please specify the Other recipe type.");
            otherText.focus();
            return true;
        }

        return false;
    }

    // Handle form submission and validation
    recipeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Check for empty fields and focus on the first one found
        if (findAndFocusFirstEmptyField()) {
            form.classList.add('was-validated');
            return;
        }
        
        // If all validations pass, show success feedback
        feedback.classList.remove("hidden");
        feedback.style.color = "green";
        
        // Reset form after a short delay
        setTimeout(() => {
            recipeForm.reset();
            feedback.classList.add("hidden");
        }, 3000);
    });
    
    // Image preview functionality
    recipeImage.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                let imgPreview = document.getElementById("imgPreview");
                if (!imgPreview) {
                    imgPreview = document.createElement("img");
                    imgPreview.id = "imgPreview";
                    imgPreview.style.maxWidth = "200px";
                    imgPreview.style.display = "block";
                    recipeImage.insertAdjacentElement("afterend", imgPreview);
                }
                imgPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Initial check for other text visibility
    toggleOtherText();
});