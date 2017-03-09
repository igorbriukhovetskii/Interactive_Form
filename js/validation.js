window.initializeValidation = (function () {
    'use strict';
    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** Name input text field */
    var nameField = registrationForm.querySelector('#name');

    /** A label for the name input text field */
    var nameFieldLabel = registrationForm.querySelector('label[for="name"]');

    /** Email input text field */
    var emailField = registrationForm.querySelector('#mail');

    /** A label for the email input text field */
    var emailFieldLabel = registrationForm.querySelector('label[for="mail"');

    /** A list of payment methods */
    var paymentOptionsList = registrationForm.querySelector('#payment');

    /** A credit card section */
    var creditCardInfo = registrationForm.querySelector('#credit-card');

    /** Credit card number input text field */
    var creditCardNumberField = creditCardInfo.querySelector('#cc-num');

    /** A label for the 'Credit Card' input field */
    var creditCardNumberFieldLabel = creditCardInfo.querySelector('label[for="cc-num"]');

    /** 'ZIP Code' input field */
    var zipField = creditCardInfo.querySelector('#zip');

    /** A label for 'ZIP Code' input field */
    var  zipFieldLabel = creditCardInfo.querySelector('label[for="zip"]');

    /** 'CVV' input field */
    var cvvField = creditCardInfo.querySelector('#cvv');

    /** A label for 'cvv' input field*/
    var cvvFieldLabel = creditCardInfo.querySelector('label[for="cvv"]');

    /** The list of activities */
    var activitiesList = registrationForm.querySelector('.activities');

    /** The collection of activities */
    var activities = activitiesList.querySelectorAll('input');

    /** The list of activities' header */
    var activitiesListHeader = activitiesList.querySelector('legend');

    /** Validity status */
    var error = false;

    /**
     * Function adds outline and warning message for text input fields in case of an error,
     * and changes validity status for the registration form
     * @param {Element} input - a text input field
     * @param {Element} inputLabel - a label associated with the text input field
     * @param {string} errorMessage - a text message
     */
    var showErrorIndication = function (input, inputLabel, errorMessage) {
        inputLabel.innerText = errorMessage;
        inputLabel.style.color = 'red';
        input.style.outline = '3px solid red';
        error = true;
    };

    /**
     * Function hides all validation warnings
     * @param {Element} input - a text input field
     * @param {Element} inputLabel - a label associated with the text input field
     * @param {string} defaultText
     */
    var hideErrorIndication = function (input, inputLabel, defaultText) {
        inputLabel.innerText = defaultText;
        inputLabel.style.color = 'black';
        input.style.outline = 'none';
    };

    /** Function checks the 'Name' input field for errors */
    var nameFieldRealTimeValidation = function () {
        if (nameField.value.length === 0) {
            showErrorIndication(nameField, nameFieldLabel, 'Name field is empty');
            return;
        }

        if (nameField.value.length > 0 && nameField.value.length <= 3) {
            showErrorIndication(nameField, nameFieldLabel, 'Name is too short');
            return;
        }

        if (nameField.value.match(/\d/) !== null) {
            showErrorIndication(nameField, nameFieldLabel, 'Wrong name format (no digits accepted)');
        } else {
            hideErrorIndication(nameField, nameFieldLabel, 'Name');
        }
    };

    /** Function checks the 'Email' input field for errors */
    var emailFieldRealTimeValidation = function () {
        if (emailField.value.length === 0) {
            showErrorIndication(emailField, emailFieldLabel, 'Email field is empty');
            return;
        }
        if (emailField.value.indexOf('@') === -1 || emailField.value.match(/\.\D{2,4}$/) === null) {
            showErrorIndication(emailField, emailFieldLabel, 'Email: (please provide a valid email address)');
        } else {
            hideErrorIndication(emailField, emailFieldLabel, 'Email:');
        }
    };

    /** Check if any payment option selected */
    var isPaymentMethod = function () {
      if (paymentOptionsList.value === 'select_method') {
          error = true;
      }
    };

    /** Function checks the 'Credit Card Number' input field for errors */
    var creditCardNumberFieldRealTimeValidation = function () {
        if (creditCardNumberField.value.length < 13 || creditCardNumberField.value.length > 16){
            showErrorIndication(creditCardNumberField, creditCardNumberFieldLabel, 'Card number must be 13-16 digits length');
            return;
        }
        if (creditCardNumberField.value.search(/\D/) !== -1) {
            showErrorIndication(creditCardNumberField, creditCardNumberFieldLabel, 'Invalid card number (only digits accepted)');
        } else {
            hideErrorIndication(creditCardNumberField, creditCardNumberFieldLabel, 'Card Number:');
        }
    };

    /** Function checks the 'Zip Code' input field for errors */
    var zipFieldRealTimeValidation = function () {
        if (zipField.value.length === 0) {
            showErrorIndication(zipField, zipFieldLabel, 'Zip field is empty');
            return;
        }
        if (zipField.value.search(/\D/) !== -1) {
            showErrorIndication(zipField, zipFieldLabel, 'Invalid Zip');
            return;
        }
        if (zipField.value.length !== 5) {
            showErrorIndication(zipField, zipFieldLabel, 'Zip must be 5 digits');
        } else {
            hideErrorIndication(zipField, zipFieldLabel, 'Zip Code:');
        }
    };

    /** Function checks the 'CVV' input field for errors */
    var cvvFieldRealTimeValidation = function () {
        if (cvvField.value.length === 0) {
            showErrorIndication(cvvField, cvvFieldLabel, 'CVV field is empty');
            return;
        }
        if (cvvField.value.length < 3 || cvvField.value.search(/\D/) !== -1) {
            showErrorIndication(cvvField, cvvFieldLabel, 'Invalid CVV');
        } else {
            hideErrorIndication(cvvField, cvvFieldLabel, 'CVV:');
        }
    };

    /** Function checks 'Register for Activities' section of the form if there is th least
     * one activity selected
     */
    var activitiesRealTimeValidation = function () {
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].checked === true) {
                activitiesListHeader.innerText = 'Register for Activities';
                activitiesListHeader.style.color = 'inherit';
                return;
            } else {
                activitiesListHeader.innerText = 'Please select at least one activity';
                activitiesListHeader.style.color = 'red';
                // errors[5] = 1;
                error = true;
            }
        }
    };

    /**
     * Function checks validity status of the form
     * @param {Object} event
     */
    var validation = function (event) {
        event.preventDefault();
        error = false;
        nameFieldRealTimeValidation();
        emailFieldRealTimeValidation();
        isPaymentMethod();
        if (paymentOptionsList.value === 'credit card') {
            creditCardNumberFieldRealTimeValidation();
            cvvFieldRealTimeValidation();
            zipFieldRealTimeValidation();
        }
        activitiesRealTimeValidation();
        if (error === false) {
            registrationForm.submit();
        }
    };

    return function () {
        /** Adding an event listener for 'keyup' event on the 'Name' text input field */
        nameField.addEventListener('keyup', nameFieldRealTimeValidation);

        /** Adding an event listener for 'keyup' event on the 'Email text input field */
        emailField.addEventListener('keyup', emailFieldRealTimeValidation);

        /** Adding an event listener for 'keyup' event on the 'Credit Card' section of the form */
        creditCardInfo.addEventListener('keyup', function () {
            creditCardNumberFieldRealTimeValidation();
            zipFieldRealTimeValidation();
            cvvFieldRealTimeValidation();
        });

        /** Adding an event listener for 'click' event on the list of available activities */
        activitiesList.addEventListener('click', activitiesRealTimeValidation);

        /** Adding check validity status on submit */
        registrationForm.addEventListener('submit', validation);
    };
})();
