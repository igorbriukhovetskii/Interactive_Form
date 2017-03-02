'use strict';

/** Using IIFE for incapsulation purposes, just like it is independent form module */
(function () {
    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** Name input field */
    var nameField = registrationForm.querySelector('#name');

    /** Event handler for DOMContentLoaded event */
    var onFormLoad = function () {
        /** Setting focus on the first text field */
        nameField.focus();
    };

    /** Adding an event listener for DOMContentLoaded event */
    document.addEventListener('DOMContentLoaded', onFormLoad);
})();