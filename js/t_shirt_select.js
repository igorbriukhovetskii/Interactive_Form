window.initializeShirtSelect = (function () {
    'use strict';

    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** List of possible T-shirt designs */
    var shirtDesignList = registrationForm.querySelector('#design');

    /** 'Color' menu */
    var  shirtColorMenu = registrationForm.querySelector('#colors-js-puns');

    /** List of possible T-shirt colors */
    var shirtColorsList = shirtColorMenu.querySelector('#color');

    /** A collection of colors for all T-shirts designs */
    var allColors = shirtColorsList.querySelectorAll('optgroup');

    /** A set of colors currently available for the selected T-shirt color theme */
    var currentColors = null;

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

    return function () {
        document.addEventListener('DOMContentLoaded', function () {
            /** Removing all available colors set for T-shirts */
            removeAllShirtColors(allColors, shirtColorsList);
        });

        /** Adding an event listener for 'change' event on the list of T-shirt designs */
        shirtDesignList.addEventListener('change', onShirtDesignListChange);
    };
})();