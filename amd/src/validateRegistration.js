export const validate = () => {
    const country = document.getElementById('id_country');
    const healthWorker = document.getElementById('id_profile_field_typeofhealthworker');
    const ethiopiaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_ethiopia');
    const nigeriaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_nigeria');
    const keniaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_kenia');
    const healthWorkerOther = document.getElementById('fitem_id_profile_field_otherhealthworker');

    // Function to toggle visibility of elements
    const toggleVisibility = (element, condition) => {
        if (element) {
            element.style.display = condition ? "flex" : "none";
            if (!condition) {
                const inputField = element.querySelector("input, select, textarea");
                if (inputField) inputField.value = "";
            }
        }
    };

    // Event listener for health worker type
    healthWorker.addEventListener("change", () => {
        toggleVisibility(healthWorkerOther, healthWorker.value === "Other");
    });

    // Event listener for country selection
    country.addEventListener("change", () => {
        toggleVisibility(ethiopiaSubnationalLevels, country.value === "ET");
        toggleVisibility(nigeriaSubnationalLevels, country.value === "NG");
        toggleVisibility(keniaSubnationalLevels, country.value === "KE");
    });
};
