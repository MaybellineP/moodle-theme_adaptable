"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;
var validate = exports.validate = function validate() {
  var form = document.querySelector('.mform.full-width-labels, .mform');
  var phoneInput = document.getElementById('id_profile_field_phonenumber');
  var usernameInput = document.getElementById('id_username');
  var emailInput = document.getElementById('id_email');
  var country = document.getElementById('id_country');
  var healthWorker = document.getElementById('id_profile_field_typeofhealthworker');
  var primarypharmacy = document.getElementById('id_profile_field_primarypharmacy');
  var ethiopiaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_ethiopia');
  var nigeriaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_nigeria');
  var keniaSubnationalLevels = document.getElementById('fitem_id_profile_field_subnationallevels_kenia');
  var healthWorkerOther = document.getElementById('fitem_id_profile_field_otherhealthworker');
  var otherprimarypharmacy = document.getElementById('fitem_id_profile_field_otherprimarypharmacy');
  var dayInput = document.getElementById('id_profile_field_dataofbirth_day');
  var monthInput = document.getElementById('id_profile_field_dataofbirth_month');
  var yearInput = document.getElementById('id_profile_field_dataofbirth_year');
  form.addEventListener('submit', function (event) {
    var phoneNumberNG = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'NG');
    var phoneNumberET = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'ET');
    var phoneNumberKE = libphonenumber.parsePhoneNumberFromString(phoneInput.value, 'KE');
    switch (true) {
      case phoneNumberNG && phoneNumberNG.isValid():
        console.log('Valid Nigerian number');
        break;
      case phoneNumberET && phoneNumberET.isValid():
        console.log('Valid Ethiopian number');
        break;
      case phoneNumberKE && phoneNumberKE.isValid():
        console.log('Valid Kenyan number');
        break;
      default:
        event.preventDefault();
        alert('Enter a valid phone number.');
        phoneInput.focus();
        return false;
    }
    if (!EighteenYearsPassed(dayInput.value, monthInput.value, yearInput.value)) {
      event.preventDefault();
      alert('You must be 18 or over to register on this site.');
      return false;
    }
  });
  emailInput.addEventListener("input", function () {
    var emailValue = emailInput.value;
    if (emailValue.includes("@")) {
      usernameInput.value = emailValue;
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
  healthWorker.addEventListener("change", function () {
    if (healthWorker.value === "Other") {
      healthWorkerOther.style.display = "flex";
      healthWorkerOther.focus();
    } else {
      healthWorkerOther.style.display = "none";
      var healthWorkerOtherText = healthWorkerOther.querySelector("#id_profile_field_otherhealthworker");
      healthWorkerOtherText.value = "";
    }
  });
  primarypharmacy.addEventListener("change", function () {
    if (primarypharmacy.value === "Other") {
      otherprimarypharmacy.style.display = "flex";
      otherprimarypharmacy.focus();
    } else {
      otherprimarypharmacy.style.display = "none";
      var otherprimarypharmacyText = otherprimarypharmacy.querySelector("#id_profile_field_otherprimarypharmacy");
      otherprimarypharmacyText.value = "";
    }
  });
  country.addEventListener("change", function () {
    var nigeriaInput = nigeriaSubnationalLevels.querySelector("input");
    var ethiopiaInput = ethiopiaSubnationalLevels.querySelector("input");
    var keniaInput = keniaSubnationalLevels.querySelector("input");
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
        nigeriaSubnationalLevels.style.display = "none";
        if (nigeriaInput) nigeriaInput.value = "";
        ethiopiaSubnationalLevels.style.display = "none";
        if (ethiopiaInput) ethiopiaInput.value = "";
        keniaSubnationalLevels.style.display = "none";
        if (keniaInput) keniaInput.value = "";
        break;
    }
  });
};
function EighteenYearsPassed(day, month, year) {
  // Convert strings to integers
  var dayInt = parseInt(day, 10);
  var monthInt = parseInt(month, 10) - 1; // Month is 0-indexed in JavaScript Date
  var yearInt = parseInt(year, 10);

  // Create a date object for the input date
  var inputDate = new Date(yearInt, monthInt, dayInt);
  // Get the current date
  var currentDate = new Date();

  // Calculate the date exactly 18 years ago
  var date18YearsAgo = new Date();
  date18YearsAgo.setFullYear(currentDate.getFullYear() - 18);

  // Check if the input date is on or before the date 18 years ago
  return inputDate <= date18YearsAgo;
}
