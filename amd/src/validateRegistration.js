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

    country.addEventListener("change", function() {
        if (country.value === "NG") {
            nigeriaSubnationalLevels.style.display = "flex"; // Show the hidden field
            nigeriaSubnationalLevels.focus();
        } else {
            nigeriaSubnationalLevels.style.display = "none"; // Hide the field if another option is selected
            const nigeriaSubnationalLevelsText = nigeriaSubnationalLevels.querySelector("#id_profile_field_subnationallevels_nigeria");
            nigeriaSubnationalLevelsText.value = "";
        }
    });

    
};
