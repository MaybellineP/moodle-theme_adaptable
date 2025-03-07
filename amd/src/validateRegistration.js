export const validate = () => {
    const country = document.getElementById('id_country');
    const healthWorker = document.getElementById('id_profile_field_typeofhealthworker');
    const ethiopiaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_ethiopia');
    const nigeriaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_nigeria');
    const keniaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_kenia');
    const healthWorkerOther = document.getElementById('fitem_id_profile_field_otherhealthworker');

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
        
        if (nigeriaInput) nigeriaInput.value = "";
        if (ethiopiaInput) ethiopiaInput.value = "";
        if (keniaInput) keniaInput.value = "";
    
        
        switch (country.value) {
            case "NG":
                nigeriaSubnationalLevels.style.display = "flex";
                nigeriaSubnationalLevels.focus();
                break;
            case "ET":
                ethiopiaSubnationalLevels.style.display = "flex";
                ethiopiaSubnationalLevels.focus();
                break;
            case "KE":
                keniaSubnationalLevels.style.display = "flex";
                keniaSubnationalLevels.focus();
                break;
            default:
                break;
        }
    });
    

    
};
