export const validate = () => {
    const form = document.querySelector('.mform.full-width-labels, .mform');
    if (!form) return;

    const phoneInput = document.getElementById('id_profile_field_phonenumber');
    const usernameInput = document.getElementById('id_username');
    const emailInput = document.getElementById('id_email');
    const country = document.getElementById('id_country');
    const healthWorker = document.getElementById('id_profile_field_typeofhealthworker');

    const ethiopiaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_ethiopia');
    const nigeriaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_nigeria');
    const kenyaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_kenya');
    const healthWorkerOther = document.getElementById('fitem_id_profile_field_otherhealthworker');

    const dayInput = document.getElementById('id_profile_field_dataofbirth_day');
    const monthInput = document.getElementById('id_profile_field_dataofbirth_month');
    const yearInput = document.getElementById('id_profile_field_dataofbirth_year');

    form.addEventListener('submit', function(event) {
        // Validar teléfono
        const countryCode = country?.value || 'NG'; // default a NG si no hay valor
        const phoneNumber = libphonenumber.parsePhoneNumberFromString(phoneInput.value, countryCode);

        if (!phoneNumber || !phoneNumber.isValid()) {
            event.preventDefault();
            alert('Enter a valid phone number.');
            phoneInput.focus();
            return false;
        }

        // Validar fecha de nacimiento
        if (!dayInput.value || !monthInput.value || !yearInput.value) {
            event.preventDefault();
            alert('Please complete your date of birth.');
            return false;
        }

        if (!EighteenYearsPassed(dayInput.value, monthInput.value, yearInput.value)) {
            event.preventDefault();
            alert('You must be 18 or over to register on this site.');
            return false;
        }
    });

    // Auto-rellenar username con email
    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value;

        if (emailValue.includes("@")) {
            usernameInput.value = emailValue;
            usernameInput.readOnly = true;
        } else {
            usernameInput.readOnly = false;
        }
    });

    emailInput.addEventListener("blur", function () {
        if (!emailInput.value.includes("@")) {
            alert('You must enter a valid email.');
            emailInput.focus();
        }
    });

    // Mostrar campo "Other health worker"
    healthWorker.addEventListener("change", function() {
        if (healthWorker.value === "Other") {
            healthWorkerOther.style.display = "flex";
            healthWorkerOther.focus();
        } else {
            healthWorkerOther.style.display = "none";
            const healthWorkerOtherText = healthWorkerOther.querySelector("#id_profile_field_otherhealthworker");
            if (healthWorkerOtherText) healthWorkerOtherText.value = "";
        }
    });

    // Mostrar subniveles según país
    country.addEventListener("change", function () {
        const nigeriaInput = nigeriaSubnationalLevels.querySelector("input");
        const ethiopiaInput = ethiopiaSubnationalLevels.querySelector("input");
        const kenyaInput = kenyaSubnationalLevels.querySelector("input");

        const hideAllSubnationalLevels = () => {
            nigeriaSubnationalLevels.style.display = "none";
            ethiopiaSubnationalLevels.style.display = "none";
            kenyaSubnationalLevels.style.display = "none";

            if (nigeriaInput) nigeriaInput.value = "";
            if (ethiopiaInput) ethiopiaInput.value = "";
            if (kenyaInput) kenyaInput.value = "";
        };

        hideAllSubnationalLevels();

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
                kenyaSubnationalLevels.style.display = "flex";
                kenyaSubnationalLevels.focus();
                break;
        }
    });
};

// Función auxiliar
function EighteenYearsPassed(day, month, year) {
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10) - 1;
    const yearInt = parseInt(year, 10);

    const inputDate = new Date(yearInt, monthInt, dayInt);
    const date18YearsAgo = new Date();
    date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);

    return inputDate <= date18YearsAgo;
}
