export const validate = () => {
    const country = document.getElementById('id_country');
    const healthWorker = document.getElementById('id_profile_field_typeofhealthworker');
    const ethiopiaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_ethiopia');
    const nigeriaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_nigeria');
    const keniaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_kenia');
    const healthWorkerOther = document.getElementById('fitem_id_profile_field_otherhealthworker');
    const dayInput = document.getElementById('id_profile_field_dataofbirth_day');
    const monthInput = document.getElementById('id_profile_field_dataofbirth_month');
    const yearInput = document.getElementById('id_profile_field_dataofbirth_year');

    form.addEventListener('submit', function(event) {
        /*const phoneNumber = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'BR');
        
        if(!phoneNumber || !phoneNumber.isValid()){
            event.preventDefault();
            alert('Digite um número de telefone válido.');
            phoneInput.focus();
            return false;
        }*/

        if(!EighteenYearsPassed(dayInput.value,monthInput.value,yearInput.value)){
            event.preventDefault();
            alert('You must be 18 or over to register on this site.');
            return false;
        }
    })

    healthWorker.addEventListener("change", function() {
        if (healthWorker.value === "Other") {
            healthWorkerOther.style.display = "flex"; // Show the hidden field
            healthWorkerOther.focus();
        } else {
            healthWorkerOther.style.display = "none"; // Hide the field if another option is selected
            const healthWorkerOtherText = healthWorkerOther.querySelector("#id_profile_field_otherhealthworker");
            healthWorkerOtherText.value = "";
        }
    });

    country.addEventListener("change", function () {

            const nigeriaInput = nigeriaSubnationalLevels.querySelector("input");
            const ethiopiaInput = ethiopiaSubnationalLevels.querySelector("input");
            const keniaInput = keniaSubnationalLevels.querySelector("input");
        
            switch (country.value) {
                case "NG":
                    nigeriaSubnationalLevels.style.display = "flex";
                    nigeriaSubnationalLevels.focus();
        
                    ethiopiaSubnationalLevels.style.display = "none"; 
                    if (ethiopiaInput) ethiopiaInput.value = "";
                    keniaSubnationalLevels.style.display = "none"; 
                    if (keniaInput) keniaInput.value = "";
                    break;
        
                case "ET":
                    ethiopiaSubnationalLevels.style.display = "flex";
                    ethiopiaSubnationalLevels.focus();
                    
                    nigeriaSubnationalLevels.style.display = "none"; 
                    if (nigeriaInput) nigeriaInput.value = "";
                    keniaSubnationalLevels.style.display = "none"; 
                    if (keniaInput) keniaInput.value = "";
                    break;
        
                case "KE":
                    keniaSubnationalLevels.style.display = "flex";
                    keniaSubnationalLevels.focus();
                    
                    nigeriaSubnationalLevels.style.display = "none"; 
                    if (nigeriaInput) nigeriaInput.value = "";
                    ethiopiaSubnationalLevels.style.display = "none"; 
                    if (ethiopiaInput) ethiopiaInput.value = "";
                    break;
        
                default:
                    break;
            }
    });
        
   
};

function EighteenYearsPassed(day, month, year) {
    // Convert strings to integers
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10) - 1; // Month is 0-indexed in JavaScript Date
    const yearInt = parseInt(year, 10);
  
    // Create a date object for the input date
    const inputDate = new Date(yearInt, monthInt, dayInt);
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the date exactly 18 years ago
    const date18YearsAgo = new Date();
    date18YearsAgo.setFullYear(currentDate.getFullYear() - 18);
  
    // Check if the input date is on or before the date 18 years ago
    return inputDate <= date18YearsAgo;
  }
