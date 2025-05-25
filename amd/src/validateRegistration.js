export const validate = () => {
    const form = document.querySelector('.mform.full-width-labels, .mform');
    if (!form) {
        return;
    }

    const phoneInput = document.getElementById('id_profile_field_phonenumber');
    const usernameInput = document.getElementById('id_username');
    const emailInput = document.getElementById('id_email');
    const country = document.getElementById('id_country');
    const healthWorker = document.getElementById('id_profile_field_typeofhealthworker');
    const ethiopiaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_ethiopia');
    const nigeriaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_nigeria');
    const keniaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_kenia');
    const healthWorkerOther = document.getElementById('fitem_id_profile_field_otherhealthworker');
    const dayInput = document.getElementById('id_profile_field_dataofbirth_day');
    const monthInput = document.getElementById('id_profile_field_dataofbirth_month');
    const yearInput = document.getElementById('id_profile_field_dataofbirth_year');

    // console.log("validate() called");

    form.addEventListener('submit', function(event) {
        if (phoneInput) {
            const phoneNumberNG = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'NG');
            const phoneNumberET = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'ET');
            const phoneNumberKE = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'KE');

            if (
                (phoneNumberNG && phoneNumberNG.isValid()) ||
                (phoneNumberET && phoneNumberET.isValid()) ||
                (phoneNumberKE && phoneNumberKE.isValid())
            ) {
                // console.log("Teléfono válido");
            } else {
                event.preventDefault();
                alert('Enter a valid phone number.');
                phoneInput.focus();
                return false;
            }
        }

        if (dayInput && monthInput && yearInput) {
            if (!EighteenYearsPassed(dayInput.value, monthInput.value, yearInput.value)) {
                event.preventDefault();
                alert('You must be 18 or over to register on this site.');
                return false;
            }
        }
    });

    if (emailInput && usernameInput) {
        emailInput.addEventListener("input", function () {
            if (emailInput.value.includes("@")) {
                usernameInput.value = emailInput.value;
            }
        });

        emailInput.addEventListener("blur", function () {
            if (emailInput.value.includes("@")) {
                usernameInput.readOnly = true;
            } else {
                alert('You must enter a valid email.');
                emailInput.focus();
            }
        });
    }

    if (healthWorker && healthWorkerOther) {
        healthWorker.addEventListener("change", function () {
            if (healthWorker.value === "Other") {
                healthWorkerOther.style.display = "flex";
                healthWorkerOther.focus();
            } else {
                healthWorkerOther.style.display = "none";
                const healthWorkerOtherText = healthWorkerOther.querySelector("#id_profile_field_otherhealthworker");
                if (healthWorkerOtherText) {
                    healthWorkerOtherText.value = "";
                }
            }
        });
    }

    if (country) {
        country.addEventListener("change", function () {
            const nigeriaInput = nigeriaSubnationalLevels?.querySelector("input");
            const ethiopiaInput = ethiopiaSubnationalLevels?.querySelector("input");
            const keniaInput = keniaSubnationalLevels?.querySelector("input");

            switch (country.value) {
                case "NG":
                    nigeriaSubnationalLevels?.style.setProperty("display", "flex");
                    nigeriaSubnationalLevels?.focus();

                    ethiopiaSubnationalLevels?.style.setProperty("display", "none");
                    if (ethiopiaInput) {
                        ethiopiaInput.value = "";
                    }

                    keniaSubnationalLevels?.style.setProperty("display", "none");
                    if (keniaInput) {
                        keniaInput.value = "";
                    }
                    break;

                case "ET":
                    ethiopiaSubnationalLevels?.style.setProperty("display", "flex");
                    ethiopiaSubnationalLevels?.focus();

                    nigeriaSubnationalLevels?.style.setProperty("display", "none");
                    if (nigeriaInput) {
                        nigeriaInput.value = "";
                    }

                    keniaSubnationalLevels?.style.setProperty("display", "none");
                    if (keniaInput) {
                        keniaInput.value = "";
                    }
                    break;

                case "KE":
                    keniaSubnationalLevels?.style.setProperty("display", "flex");
                    keniaSubnationalLevels?.focus();

                    nigeriaSubnationalLevels?.style.setProperty("display", "none");
                    if (nigeriaInput) {
                        nigeriaInput.value = "";
                    }

                    ethiopiaSubnationalLevels?.style.setProperty("display", "none");
                    if (ethiopiaInput) {
                        ethiopiaInput.value = "";
                    }
                    break;

                default:
                    [nigeriaSubnationalLevels, ethiopiaSubnationalLevels, keniaSubnationalLevels].forEach(item => {
                        if (item) {
                            item.style.setProperty("display", "none");
                            const input = item.querySelector("input");
                            if (input) {
                                input.value = "";
                            }
                        }
                    });
                    break;
            }
        });
    }
};