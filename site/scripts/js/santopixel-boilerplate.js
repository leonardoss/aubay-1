window.SPBoilerplate = window.SPBoilerplate || {};

(function (jQuery, window, undefined) {
    'use strict';

    var 
    $doc = jQuery(document),
    $win = jQuery(window),
    $body = jQuery('body'),

    PrivateFunctions = { 
        PrivateFunction : function() {
            // private functions - PrivateFunctions.PrivateFunction()
        },       
    };

    SPBoilerplate.app = function () {
        return {
            Init: function () {
                
            },
            PublicFunction: function () {
                // public functions - SPBoilerplate.PublicFunction()
            }
        };
    };
}(jQuery, window, undefined));

SPBoilerplate = new SPBoilerplate.app();
SPBoilerplate.Init();
