document.addEventListener("DOMContentLoaded", function () {
    const formSteps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const prevButtons = document.querySelectorAll(".prev-btn");
    const progress = document.getElementById("progress");
    const currentStepIndicator = document.getElementById("currentStep");
    const totalStepsIndicator = document.getElementById("totalSteps");
    let currentStep = 0;
  
    totalStepsIndicator.textContent = formSteps.length;
  
    function showStep(step) {
      formSteps.forEach((formStep, index) => {
        formStep.classList.toggle("form-step-active", index === step);
      });
      currentStepIndicator.textContent = step + 1;
      updateProgress(step);
      updateButtonState();
    }
  
    function updateProgress(step) {
      const progressPercentage = ((step + 1) / formSteps.length) * 100;
      progress.style.width = `${progressPercentage}%`;
    }
  
    function updateButtonState() {
      const inputs = formSteps[currentStep].querySelectorAll("input, textarea");
      const nextButton = formSteps[currentStep].querySelector(".next-btn");
  
      const allFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
      );
  
      if (nextButton) {
        nextButton.style.opacity = allFilled ? "1" : "0.5";
        nextButton.disabled = !allFilled;
      }
    }
  
    function validateStep() {
      const inputs = formSteps[currentStep].querySelectorAll("input, textarea");
      return Array.from(inputs).every((input) => input.value.trim() !== "");
    }
  
    function enableOrDisableNextButton() {
      const inputs = formSteps[currentStep].querySelectorAll("input, textarea");
      const nextButton = formSteps[currentStep].querySelector(".next-btn");
  
      // Check if all fields are filled
      const allFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
      );
  
      // Enable or disable the "Next" button
      if (nextButton) {
        nextButton.style.opacity = allFilled ? "1" : "0.5";
        nextButton.disabled = !allFilled;
      }
    }
  
    nextButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (validateStep()) {
          if (currentStep < formSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
          }
        } else {
          alert("Please fill out all required fields.");
        }
      });
    });
  
    prevButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });
  
    // Add real-time validation on input change
    formSteps.forEach((step) => {
      const inputs = step.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.addEventListener("input", enableOrDisableNextButton);
      });
    });
  
    showStep(currentStep);
  });
  