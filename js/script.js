'use strict';

/** Using IIFE for incapsulation purposes, just like if it was an independent form module */
(function () {
    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** Name input text field */
    var nameField = registrationForm.querySelector('#name');

    /** List of job roles */
    var jobSelect = registrationForm.querySelector('#title');

    /** 'Other' option in list of job roles */
    var otherJobRole = registrationForm.querySelector('option[value=other]');

    /** Job Role text input field */
    var otherField = registrationForm.querySelector('#other-title');

    /** CSS class for hide an HTML element */
    var IS_HIDDEN_CLASS = 'is-hidden';

    /** Event handler for DOMContentLoaded event */
    var onFormLoad = function () {
        /** Setting focus on the first text field */
        nameField.focus();

        /** Hiding 'Your Job Role' text input field */
        otherField.classList.toggle(IS_HIDDEN_CLASS, true);
    };

    /** Event handler for 'change' event on list of job roles */
    var onJobSelectChange = function () {
        /** Show/hide 'Your Job Role' text input field */
        switch (otherJobRole.selected) {
            case true: otherField.classList.toggle(IS_HIDDEN_CLASS, false);
            break;
            case false: otherField.classList.toggle(IS_HIDDEN_CLASS, true);
            break;
            default: otherField.classList.toggle(IS_HIDDEN_CLASS, true);
        }
    };

    /** Adding an event listener for DOMContentLoaded event */
    document.addEventListener('DOMContentLoaded', onFormLoad);

    /** Adding an event listener for 'change' event on the list of job roles */
    jobSelect.addEventListener('change', onJobSelectChange);
})();
