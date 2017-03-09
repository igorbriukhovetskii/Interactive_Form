(function () {
    'use strict';

    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** Name input text field */
    var nameField = registrationForm.querySelector('#name');

    /** Email input text field */
    var emailField = registrationForm.querySelector('#mail');

    /** List of job roles */
    var jobRolesList = registrationForm.querySelector('#title');

    /** 'Other' option in list of job roles */
    var otherJobRole = registrationForm.querySelector('option[value="other"]');

    /** Job Role text input field */
    var otherField = registrationForm.querySelector('#other-title');

    /** List of possible T-shirt designs */
    var shirtDesignList = registrationForm.querySelector('#design');

    /** 'Color' menu */
    var  shirtColorMenu = registrationForm.querySelector('#colors-js-puns');
    
    /** The list of activities */
    var activitiesList = registrationForm.querySelector('.activities');

    /** The collection of activities */
    var activities = activitiesList.querySelectorAll('input');

    /** The payment info section of the form */
    var paymentInfo = registrationForm.querySelector('#payment_info');

    /** A list of payment methods */
    var paymentSelect = paymentInfo.querySelector('#payment');

    /** A credit card section */
    var creditCardInfo = paymentInfo.querySelector('#credit-card');

    /** Credit card number input text field */
    var creditCardNumberField = creditCardInfo.querySelector('#cc-num');

    /** The PayPal section */
    var payPal = paymentInfo.querySelector('#paypal');

    /** The Bitcoin section*/
    var bitCoin = paymentInfo.querySelector('#bitcoin');
    
    /** Event handler for 'change' event on the list of job roles */
    var onJobRolesListChange = function () {
        /** Show/hide 'Your Job Role' text input field */
        switch (otherJobRole.selected) {
            case true: window.utils.showElement(otherField);
                break;
            case false: window.utils.hideElement(otherField);
                break;
            default: window.utils.showElement(otherField);
        }
    };

    /** Function changes displayed info in the 'Payment Method' section */
    var onPaymentSelectChange = function () {
        switch (paymentSelect.value) {
            case 'credit card':
                window.utils.showElement(creditCardInfo);
                window.utils.hideElement(payPal);
                window.utils.hideElement(bitCoin);
                break;
            case 'paypal':
                window.utils.showElement(payPal);
                window.utils.hideElement(creditCardInfo);
                window.utils.hideElement(bitCoin);
                break;
            case 'bitcoin':
                window.utils.showElement(bitCoin);
                window.utils.hideElement(creditCardInfo);
                window.utils.hideElement(payPal);
                break;
            default:
                window.utils.hideElement(creditCardInfo);
                window.utils.hideElement(payPal);
                window.utils.hideElement(bitCoin);
        }
    };

    /** Event handler for DOMContentLoaded event */
    var onFormLoad = function () {
        /** Setting focus on the first text field */
        nameField.focus();

        /** Clear the 'Name' field */
        window.utils.clearInput(nameField);

        /** Clear the 'Email' field */
        window.utils.clearInput(emailField);
        
        /** Clear the 'Credit Card Number' field */
        window.utils.clearInput(creditCardNumberField);

        /** Hiding 'Your Job Role' text input field */
        window.utils.hideElement(otherField);

        /** Selecting default choice for 'Job Role' menu */
        window.utils.selectDefault(jobRolesList, 0);

        /** Hiding 'Color' menu in 'T-shirt info' section */
        window.utils.hideElement(shirtColorMenu);

        /** Selecting default choice for the list of shirt designs */
        window.utils.selectDefault(shirtDesignList, 0);

        /** Selecting default option in the 'Payment Method' section */
        window.utils.selectDefault(paymentSelect, 1);
    };

    /** Adding an event listener for DOMContentLoaded event */
    document.addEventListener('DOMContentLoaded', onFormLoad);

    /** Adding an event listener for 'change' event on the list of job roles */
    jobRolesList.addEventListener('change', onJobRolesListChange);

    paymentSelect.addEventListener('change', onPaymentSelectChange);

    /** Initializing script for the 'T-shirt Info' section */
    window.initializeShirtSelect();

    /** Initializing script for the 'Register for Activities' section */
    window.initializeActivities();

    /** Starting validity checks for the form */
    window.initializeValidation();
})();
