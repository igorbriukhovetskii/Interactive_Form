window.utils = (function () {
    'use strict';

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
    
    return {
        selectDefault: selectDefaultOption,
        
        clearInput: clearTextInputField,
        
        hideElement: hideElement,
        
        showElement: showElement
    };
})();
