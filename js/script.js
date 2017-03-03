'use strict';

/** Using IIFE for incapsulation purposes, just like if it was an independent form module */
(function () {
    /** Registration form */
    var registrationForm = document.querySelector('form');

    /** Name input text field */
    var nameField = registrationForm.querySelector('#name');

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

    /** Group of colors for JS Puns design */
    var jsPunsColorGroup = shirtColorsList.querySelector('optgroup[label^="JS"]');

    /** Group of colors for I love JS design */
    var loveJSColorGroup = shirtColorsList.querySelector('optgroup[label^="I"]');

    /** List of colors for the 'JS Puns' theme */
    var jsPunsColors = jsPunsColorGroup.querySelectorAll('.puns');

    /** List of colors for the 'I love JS' theme */
    var loveJSColors = loveJSColorGroup.querySelectorAll('.heart');

    /** CSS class for hide an HTML element */
    var IS_HIDDEN_CLASS = 'is-hidden';






    // var options = shirtColorsList.querySelectorAll('option');
    //
    // var unselect = function () {
    //   [].forEach.call(options, function (option) {
    //       option.selected = false;
    //   });
    // };

    /**
     * Function selects first option in a list
     * @param {Collection} list
     */
    var selectFirstOption = function (list) {
        list[0].selected = true;
    };

    // var remove = function (collection, child) {
    //   collection.removeChild(child);
    // };
    //
    // var add = function (nod, child) {
    //     nod.appendChild(child);
    // };

    /**
     * Function hides all elements in the selected collection
     * @param {Collection} collection
     */
    var hideAllElements = function (collection) {
        [].forEach.call(collection, function (element) {
            element.classList.add(IS_HIDDEN_CLASS);
        });
        console.log('collection ' + collection + ' is hidden');
    };

    var showAllElements = function (collection) {
        [].forEach.call(collection, function (element) {
            element.classList.remove(IS_HIDDEN_CLASS);
            console.log(element + ' is shown');
        });
        console.log('collection ' + collection + ' is visible');
    };

    /**
     * Function hides DOM element
     * @param {Element} element
     */
    var hideElement = function (element) {
        console.log('hide element started');
        element.classList.add(IS_HIDDEN_CLASS);
    };

    /**
     * Function shows hidden DOM elements
     * @param {Element} htmlElement
     */
    var showElement = function (element) {
        element.classList.remove(IS_HIDDEN_CLASS);
    }

    /** Event handler for DOMContentLoaded event */
    var onFormLoad = function () {
        /** Setting focus on the first text field */
        nameField.focus();

        /** Hiding 'Your Job Role' text input field */
        hideElement(otherField);

        /** Hiding 'Color' menu in 'T-shirt info' section */
        hideElement(shirtColorMenu);

        /** Selecting default choice for the list of shirt designs */
        selectFirstOption(shirtDesignList);

        /** Hiding color themes in 'Color' menu */
        //hideAllElements(shirtColorGroups);
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

    var currentNode = null;
    // var nodeJSPuns = shirtColorsList.removeChild(jsPunsColorGroup);
    // var nodeLoveJS = shirtColorsList.removeChild(loveJSColorGroup);

    var allColors = shirtColorsList.querySelectorAll('optgroup');
    console.log(allColors.length + ' all colors');

    for (var i = 0, length = allColors.length; i < length; i++) {
        console.log(allColors[i] + ' removed');
        shirtColorsList.removeChild(allColors[i]);
        console.log(allColors[i] + ' removed');
    }


    /** Event handler for 'change' event on the list of T-shirt designs */
    var onShirtDesignListChange = function (event) {

        if (shirtDesignList.value === 'Select Theme') {
            hideElement(shirtColorMenu);
        } else {
            showElement(shirtColorMenu);
            console.log('shirtDesignList.value is ' + shirtDesignList.value);
            switch (event.target.value) {
                case 'js puns':
                    //console.log('js puns selected');
                    //hideAllElements(loveJSColors);
                    //hideElement(loveJSColorGroup);
                    //hideAllElements(loveJSColors);
                    //console.log('optgroup love JS class is ' + loveJSColorGroup.className)
                    //showAllElements(jsPunsColors);
                    // showElement(jsPunsColorGroup)
                    // showAllElements(jsPunsColors);
                    // console.log('optgroup JS Puns class is ' + jsPunsColorGroup.className)
                    if (!currentNode) {
                        // nodeLoveJS = shirtColorsList.removeChild(loveJSColorGroup);
                        currentNode = allColors[0];
                        shirtColorsList.appendChild(currentNode);
                    } else {
                        shirtColorsList.removeChild(currentNode);
                        currentNode = allColors[0];
                        shirtColorsList.appendChild(currentNode);
                    }
                    // if (shirtColorsList.hasChildNodes()) {
                    //     console.log('HAS NODES')
                    //     //nodeLoveJS = shirtColorsList.removeChild(loveJSColorGroup);
                    // }
                    // var nodeJSPuns = shirtColorsList.removeChild(jsPunsColorGroup);
                    // var nodeLoveJS = shirtColorsList.removeChild(loveJSColorGroup);
                    // shirtColorsList.appendChild(nodeJSPuns);
                    selectFirstOption(jsPunsColors);
                    // remove(shirtColorsList, loveJSColors);
                    // add(jsPunsColors);
                    // showElement(jsPunsColors);
                    break;
                case 'heart js':
                    // if (shirtColorsList.hasChildNodes()) {
                    //     //nodeJSPuns = shirtColorsList.removeChild(jsPunsColorGroup);
                    // }
                    if (!currentNode) {
                        currentNode = allColors[1];
                        shirtColorsList.appendChild(currentNode);
                    } else {
                        shirtColorsList.removeChild(currentNode);
                        currentNode = allColors[1];
                        shirtColorsList.appendChild(currentNode);
                    }
                    // shirtColorsList.appendChild(nodeLoveJS);
                    // console.log('heart js selected');
                    // hideAllElements(jsPunsColors);
                    // hideElement(jsPunsColorGroup);
                    // showAllElements(loveJSColors);
                    // showElement(loveJSColorGroup);
                    // selectFirstOption(loveJSColors);
                    break;
            }
        }
    };

    /** Adding an event listener for DOMContentLoaded event */
    document.addEventListener('DOMContentLoaded', onFormLoad);

    /** Adding an event listener for 'change' event on the list of job roles */
    jobRolesList.addEventListener('change', onJobRolesListChange);

    /** Adding an event listener for 'change' event on the list of T-shirt designs */
    shirtDesignList.addEventListener('click', onShirtDesignListChange);
})();
