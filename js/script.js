/** Using IIFE for encapsulation purposes, just like if it was an independent form module */
(function () {
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

    /** List of possible T-shirt colors */
    var shirtColorsList = shirtColorMenu.querySelector('#color');

    /** A set of colors currently available for the selected T-shirt color theme */
    var currentColors = null;

    /** A collection of colors for all T-shirts designs */
    var allColors = shirtColorsList.querySelectorAll('optgroup');

    /** The list of activities */
    var activitiesList = registrationForm.querySelector('.activities');

    /** The list of activities' header */
    var activitiesListHeader = activitiesList.querySelector('legend');

    /** The collection of activities */
    var activities = activitiesList.querySelectorAll('input');

    /** The total price for all activities selected */
    var totalPrice = 0;

    /** The counter displaying running total for activities */
    var totalCounter = null;

    /** The payment info section of the form */
    var paymentInfo = registrationForm.querySelector('#payment_info');

    /** A list of payment methods */
    var paymentSelect = paymentInfo.querySelector('#payment');

    /** A credit card section */
    var creditCardInfo = paymentInfo.querySelector('#credit-card');

    /** A credit card number input text field */
    var creditCardNumberField = creditCardInfo.querySelector('#cc-num');

    /** A label for the 'Credit Card' input field */
    var creditCardNumberFieldLabel = creditCardInfo.querySelector('label[for="cc-num"]');

    /** 'CVV' input field */
    var cvvField = creditCardInfo.querySelector('#cvv');

    /** A label for 'cvv' input field*/
    var cvvFieldLabel = creditCardInfo.querySelector('label[for="cvv"]');

    /** 'ZIP Code' input field */
    var zipField = creditCardInfo.querySelector('#zip');

    /** A label for 'ZIP Code' input field */
    var  zipFieldLabel = creditCardInfo.querySelector('label[for="zip"]');

    /** The PayPal section */
    var payPal = paymentInfo.querySelector('#paypal');

    /** The Bitcoin section*/
    var bitCoin = paymentInfo.querySelector('#bitcoin');
    /**--------------------------------------------------------------------------------------------------*/
    /**--------------------------------------------------------------------------------------------------*/
    var errors = [0, 0, 0, 0, 0, 1];

    var checkErrors = function () {
        errors.forEach(function (error) {
            if (error !== null) {
                console.log('returned true');
                return true;
            }
        });
    };

    var showErrorIndication = function (input, inputLabel, errorMessage) {
        inputLabel.innerText = errorMessage;
        inputLabel.style.color = 'red';
        input.style.outline = '3px solid red';
    };

    var hideErrorIndication = function (input, inputLabel, defaultText) {
        inputLabel.innerText = defaultText;
        inputLabel.style.color = 'black';
        input.style.outline = 'none'
    };

    var nameFieldRealTimeValidation = function () {
        console.log('Name validation fired');
        if (nameField.value.length === 0) {
            showErrorIndication(nameField, nameFieldLabel, 'Name field is empty');
            errors[0] = 1;
            console.log('error set to ' + errors[0]);
            return;
        }

        if (nameField.value.length > 0 && nameField.value.length <= 3) {
            showErrorIndication(nameField, nameFieldLabel, 'Name is too short');
            errors[0] = 1;
            return;
        }

        if (nameField.value.match(/\d/) !== null) {
            showErrorIndication(nameField, nameFieldLabel, 'Wrong name format (no digits accepted)');
            errors[0] = 1;
        } else {
           hideErrorIndication(nameField, nameFieldLabel, 'Name');
            errors[0] = 0;
            console.log('error set to ' + errors[0]);
        }
    };

    var emailFieldRealTimeValidation = function () {
        if (emailField.value.length === 0) {
            showErrorIndication(emailField, emailFieldLabel, 'Email field is empty');
            errors[1] = 1;
            return;
        }
        if (emailField.value.indexOf('@') === -1 || emailField.value.match(/\.\D{2,4}$/) === null) {
            showErrorIndication(emailField, emailFieldLabel, 'Email: (please provide a valid email address)');
            errors[1] = 1;
        } else {
            hideErrorIndication(emailField, emailFieldLabel, 'Email:');
            errors[1] = 0;
        }
    };

    var creditCardNumberFieldRealTimeValidation = function () {
        if (creditCardNumberField.value.length < 13 || creditCardNumberField.value.length > 16){
            showErrorIndication(creditCardNumberField, creditCardNumberFieldLabel, 'Card number must be 13-16 digits length');
            errors[2] = 1;
            return;
        }
        if (creditCardNumberField.value.search(/\D/) !== -1) {
            showErrorIndication(creditCardNumberField, creditCardNumberFieldLabel, 'Invalid card number (only digits accepted)');
            errors[2] = 1;
        } else {
            hideErrorIndication(creditCardNumberField, creditCardNumberFieldLabel, 'Card Number:');
            errors[2] = 0;
      }
    };

    var zipFieldRealTimeValidation = function () {
        if (zipField.value.length === 0) {
            showErrorIndication(zipField, zipFieldLabel, 'Zip field is empty');
            errors[3] = 1;
            return;
        }
        if (zipField.value.search(/\D/) !== -1) {
            showErrorIndication(zipField, zipFieldLabel, 'Invalid Zip');
            errors[3] = 1;
            return;
        }
        if (zipField.value.length !== 5) {
            showErrorIndication(zipField, zipFieldLabel, 'Zip must be 5 digits');
            errors[3] = 1;
        } else {
            hideErrorIndication(zipField, zipFieldLabel, 'Zip Code:');
            errors[3] = 0;
        }
    };

    var cvvFieldRealTimeValidation = function () {
        if (cvvField.value.length === 0) {
            showErrorIndication(cvvField, cvvFieldLabel, 'CVV field is empty');
            errors[4] = 1;
            return;
        }
        if (cvvField.value.length < 3 || cvvField.value.search(/\D/) !== -1) {
            showErrorIndication(cvvField, cvvFieldLabel, 'Invalid CVV');
            errors[4] = 1;
        } else {
            hideErrorIndication(cvvField, cvvFieldLabel, 'CVV:');
            errors[4] = 0;
        }
    };

    var activitiesRealTimeValidation = function () {
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].checked === true) {
                activitiesListHeader.innerText = 'Register for Activities';
                activitiesListHeader.style.color = 'inherit';
                errors[5] = 0;
                return;
            } else {
                activitiesListHeader.innerText = 'Please select at least one activity';
                activitiesListHeader.style.color = 'red';
                errors[5] = 1;
            }
        }
    };

    var validation = function (event) {
        event.preventDefault();
        nameFieldRealTimeValidation();
        emailFieldRealTimeValidation();
        creditCardNumberFieldRealTimeValidation();
        cvvFieldRealTimeValidation();
        zipFieldRealTimeValidation();
        activitiesRealTimeValidation();
        console.log(errors[0], errors[1], errors[2], errors[3], errors[4]);
        //console.log(checkErrors());
        if (errors[0] === 0 && errors[1] === 0 && errors[2] === 0 && errors[3] === 0 && errors[4] === 0) {
            registrationForm.submit();
        }
    };
    /**---------------------------------------------------------------------------------------------------*/

    /** CSS class for hide an HTML element */
    var IS_HIDDEN_CLASS = 'is-hidden';

    /**
     * Function selects default option in a list
     * @param {Node} list
     * @param {number} index
     */
    var selectDefaultOption = function (list, index) {
        list[index].selected = true;
    };

    /**
     * Function clears the input field
     * @param {Element} input
     */
    var clearTextInputField = function (input) {
        input.value = '';
    };

    /**
     * Function hides DOM element
     * @param {Node} element
     */
    var hideElement = function (element) {
        element.classList.add(IS_HIDDEN_CLASS);
    };

    /**
     * Function shows hidden DOM elements
     * @param {Node} element
     */
    var showElement = function (element) {
        element.classList.remove(IS_HIDDEN_CLASS);
    };

    /** An array of activities prices */
    var activitiesPrices = [];

    /** Function gets the prices for activities from HTML */
    var getActivitiesPrices = function () {
      [].forEach.call(activities, function (activity, i) {
          activitiesPrices[i] = activity.parentNode.innerText;
          activitiesPrices[i] = activitiesPrices[i].match(/\d{2,5}$/);
          activitiesPrices[i] = parseInt(activitiesPrices[i], 10);
      });
    };

    /** Function counts a running total for activities */
    var countActivitiesTotalPrice = function () {
        var price = 0;
        
        [].forEach.call(activities, function (activity, i) {
           if (activity.checked === true) {
               price += activitiesPrices[i];
           }
        });

        totalPrice = price;
        totalCounter.innerText = '';
        totalCounter.innerText = 'Total: ' + totalPrice + '$';
    };

    /** Function deselects all the checkboxes*/
    var resetActivities = function () {
        [].forEach.call(activities, function (activity) {
            activity.checked = false;
        });
    };

    /**
     * Function finds the day of the week and scheduled time for an activity
     * @param {string} text - the full text in a <label> element
     * @return {string} - a day of the week and scheduled time for an activity
     */
    var getActivityTime = function (text) {
        return String(text.match(/[A-Z,a-z]{1,6}day\s\d{1,2}[apm]{2}/));
    };

    /** Function finds and disables the activities that conflict with the one that we have chose */
    var disableConflictingActivities = function (event) {
        var target = event.target;
        var activityTime = getActivityTime(target.parentNode.innerText);

        [].forEach.call(activities, function (activity) {
            var label = activity.parentNode;

            if (activity !== target && label.innerText.indexOf(activityTime) !== -1) {
                switch (activity.disabled) {
                    case true:
                        activity.disabled = false;
                        label.style.opacity = '1';
                        break;
                    case false:
                        activity.disabled = true;
                        label.style.opacity = '0.2';
                        break;
                }
            }
        });
    };

    /** Function changes displayed info in the 'Payment Method' section */
    var onPaymentSelectChange = function () {
        switch (paymentSelect.value) {
            case 'credit card':
                showElement(creditCardInfo);
                hideElement(payPal);
                hideElement(bitCoin);
                break;
            case 'paypal':
                showElement(payPal);
                hideElement(creditCardInfo);
                hideElement(bitCoin);
                break;
            case 'bitcoin':
                showElement(bitCoin);
                hideElement(creditCardInfo);
                hideElement(payPal);
                break;
            default:
                hideElement(creditCardInfo);
                hideElement(payPal);
                hideElement(bitCoin);
        }
    };
    /** Event handler for DOMContentLoaded event */
    var onFormLoad = function () {
        /** Setting focus on the first text field */
        nameField.focus();

        /** Clear the 'Name' field */
        clearTextInputField(nameField);

        /** Clear the 'Email' field */
        clearTextInputField(emailField);

        /** Hiding 'Your Job Role' text input field */
        hideElement(otherField);

        /** Selecting default choice for 'Job Role' menu */
        selectDefaultOption(jobRolesList, 0);

        /** Hiding 'Color' menu in 'T-shirt info' section */
        hideElement(shirtColorMenu);

        /** Selecting default choice for the list of shirt designs */
        selectDefaultOption(shirtDesignList, 0);

        /** Removing all available colors set for T-shirts */
        removeAllShirtColors(allColors, shirtColorsList);

        /** Creating a counter that will display the running total in activities section */
        createTotalCounter();

        /** Getting all the prices for activities */
        getActivitiesPrices();

        /** Initializing activities total price counter */
        countActivitiesTotalPrice();

        /** Deselect all the checkboxes in 'Register for Activities' section */
        resetActivities();

        /** Selecting default option in the 'Payment Method' section */
        selectDefaultOption(paymentSelect, 1);

        nameFieldRealTimeValidation();

        console.log(errors[0], errors[1], errors[2], errors[3], errors[4]);
    };

    /** Event handler for 'change' event on the list of job roles */
    var onJobRolesListChange = function () {
        /** Show/hide 'Your Job Role' text input field */
        switch (otherJobRole.selected) {
            case true: showElement(otherField);
            break;
            case false: hideElement(otherField);
            break;
            default: showElement(otherField);
        }
    };

    /** Function removes all sets of colors for the T-shirts
     * @param {NodeList} colors
     * @param {Node} colorsList
     */
    var removeAllShirtColors = function (colors, colorsList) {
        [].forEach.call(colors, function (color) {
            colorsList.removeChild(color);
        });
    };

    /** Function selects a set of colors for the selected T-shirt theme
     * and adds it to the DOM. Also it removes any other previously added lists of colors
     * for another color theme.
     * @param {Object} event
     */
    var selectShirtColor = function (event) {
        for (var i = 1, length = shirtDesignList.length; i < length; i++) {
            if (event.target.value === shirtDesignList[i].value) {

                if (!currentColors) {
                    currentColors = allColors[i - 1];
                    shirtColorsList.appendChild(currentColors);
                } else {
                    shirtColorsList.replaceChild(allColors[i-1], currentColors);
                    currentColors = allColors[i - 1];
                }
            }
        }
    };

    /** Event handler for 'change' event on the list of T-shirt designs */
    var onShirtDesignListChange = function (event) {
        /** If no color theme selected - 'Colors' menu is hidden */
        if (shirtDesignList.value === 'Select Theme') {
            hideElement(shirtColorMenu);
        } else {
            /** Showing 'Colors' menu */
            showElement(shirtColorMenu);
            /** Choosing and appending a list of colors for the selected T-shirt theme */
            selectShirtColor(event);
        }
    };

    /** Function creates new <div> element for running total counter */
    var createTotalCounter = function () {
        totalCounter = document.createElement('div');
        activitiesList.appendChild(totalCounter);
        totalCounter.style.marginLeft = '24px';
    };

    /** Adding an event listener for DOMContentLoaded event */
    document.addEventListener('DOMContentLoaded', onFormLoad);

    /** Adding an event listener for 'change' event on the list of job roles */
    jobRolesList.addEventListener('change', onJobRolesListChange);

    /** Adding an event listener for 'change' event on the list of T-shirt designs */
    shirtDesignList.addEventListener('change', onShirtDesignListChange);


    /** Adding an event listener for 'change' event on the list of available activities */
    activitiesList.addEventListener('change', function () {
        countActivitiesTotalPrice();
        activitiesRealTimeValidation();
    });

    /** Adding an event listener for 'change' event on the activities checkboxes */
    [].forEach.call(activities, function (activity) {
       activity.addEventListener('change', disableConflictingActivities);
    });

    paymentSelect.addEventListener('change', onPaymentSelectChange);

    nameField.addEventListener('keyup', nameFieldRealTimeValidation);

    emailField.addEventListener('keyup', emailFieldRealTimeValidation);

    creditCardInfo.addEventListener('keyup', function () {
        creditCardNumberFieldRealTimeValidation();
        zipFieldRealTimeValidation();
        cvvFieldRealTimeValidation();
    });

    registrationForm.addEventListener('submit', validation);
})();
