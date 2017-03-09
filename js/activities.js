window.initializeActivities = (function () {
    'use strict';

    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** The list of activities */
    var activitiesList = registrationForm.querySelector('.activities');

    /** The collection of activities */
    var activities = activitiesList.querySelectorAll('input');

    /** The total price for all activities selected */
    var totalPrice = 0;

    /** The counter displaying running total for activities */
    var totalCounter = null;

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

    /** Function creates new <div> element for running total counter */
    var createTotalCounter = function () {
        totalCounter = document.createElement('div');
        activitiesList.appendChild(totalCounter);
        totalCounter.style.marginLeft = '24px';
    };

    /** Function deselects all the checkboxes in the 'Register for Activities' section */
    var resetActivities = function () {
        [].forEach.call(activities, function (activity) {
            activity.checked = false;
        });
    };

    return function () {
        document.addEventListener('DOMContentLoaded', function () {
            /** Creating a counter that will display the running total in activities section */
            createTotalCounter();

            /** Getting all the prices for activities */
            getActivitiesPrices();

            /** Initializing activities total price counter */
            countActivitiesTotalPrice();

            /** Deselect all the checkboxes in 'Register for Activities' section */
            resetActivities();
        });

        /** Adding an event listener for 'change' event on the list of available activities */
        activitiesList.addEventListener('change', function () {
            countActivitiesTotalPrice();
        });

        /** Adding an event listener for 'change' event on the activities checkboxes */
        [].forEach.call(activities, function (activity) {
            activity.addEventListener('change', disableConflictingActivities);
        });

    };
})();