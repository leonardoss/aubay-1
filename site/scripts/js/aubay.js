window.Aubay = window.Aubay || {};

(function (window, undefined) {
    'use strict';

    var form = document.getElementById('login-form'),
        arrayInput = form.querySelectorAll('[data-validate]'),

    Form = { 
        CleanFields: function() {
            Array.from(arrayInput).forEach(function(elem) {
                elem.addEventListener('keypress', (event) => {
                    var formItem = elem.closest('label'),
                    msgField = elem.nextSibling.nextSibling;

                    formItem.className = '';
                    msgField.innerHTML = '';
                });
            });
        },
        Validate: function() {
            Form.CleanFields();

            form.addEventListener('submit', function(e){
                var i = 0,
                isValid = true,
                msgReturn = document.getElementById('return-general'),
                name = e.target.elements['txtUsername'].value,
                password = e.target.elements['txtPassword'].value;

                while (i < arrayInput.length) {
                    var rule = arrayInput[i].getAttribute('data-validate'),
                    formItem = arrayInput[i].closest('label'),
                    msgField = arrayInput[i].nextSibling.nextSibling,
                    currentVal = arrayInput[i].value;

                    e.preventDefault();

                    if (rule == 'type-required') {
                        if (!Form.ValidateRequired(currentVal)){
                            formItem.className = 'error';
                            msgField.innerHTML = 'Please, fill the field';
                            isValid = false;
                        }
                    }
                    i++;
                }

                if (isValid) {
                    if (name === 'admin' && password === 'admin') {
                        window.location.href = 'https://gauchazh.clicrbs.com.br/';
                    } else {
                        msgReturn.innerHTML = 'Invalid credentials';
                    }
                }
            });
        },

        ValidateRequired: function(value){
            return value !== '';
        }
    };

    Aubay.app = function () {
        return {
            Init: function () {
                Form.Validate()
            }
        };
    };
}(window, undefined));

Aubay = new Aubay.app();
Aubay.Init();
