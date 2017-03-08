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

    /** List of possible T-shirt colors */
    var shirtColorsList = shirtColorMenu.querySelector('#color');

    /** A set of colors currently available for the selected T-shirt color theme */
    var currentColors = null;

    /** A collection of colors for all T-shirts designs */
    var allColors = shirtColorsList.querySelectorAll('optgroup');

    /** The list of activities */
    var activitiesList = registrationForm.querySelector('.activities');

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

    /** Credit card number input text field */
    var creditCardNumberField = creditCardInfo.querySelector('#cc-num');

    /** The PayPal section */
    var payPal = paymentInfo.querySelector('#paypal');

    /** The Bitcoin section*/
    var bitCoin = paymentInfo.querySelector('#bitcoin');
    
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
        window.utils.selectDefault(paymentSelect, 1);
        
        /** Initializing real-time validation for the 'Name' field */ 
       // nameFieldRealTimeValidation();
    };

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
            window.utils.hideElement(shirtColorMenu);
        } else {
            /** Showing 'Colors' menu */
            window.utils.showElement(shirtColorMenu);
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
    });

    /** Adding an event listener for 'change' event on the activities checkboxes */
    [].forEach.call(activities, function (activity) {
       activity.addEventListener('change', disableConflictingActivities);
    });

    paymentSelect.addEventListener('change', onPaymentSelectChange);

    /** Starting validity checks for the form */
    window.initializeValidation();
})();
