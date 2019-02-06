window.Aubay = window.Aubay || {};

(function (window, undefined) {
    'use strict';

    var form = document.getElementById('login-form'),
        arrayInput = form.querySelectorAll('[data-validate]'),

    Form = { 
        Validate: function() {
            Array.from(arrayInput).forEach(function(elem) {
                elem.addEventListener('keypress', (event) => {
                    var formItem = elem.closest('label'),
                    msgField = elem.nextSibling.nextSibling;

                    formItem.className = '';
                    msgField.innerHTML = '';
                });
            });

            form.addEventListener('submit', function(e){
                var i = 0,
                isValid = true,
                msgReturn = document.getElementById('return-general');

                while (i < arrayInput.length) {
                    var rule = arrayInput[i].getAttribute('data-validate'),
                    formItem = arrayInput[i].closest('label'),
                    msgField = arrayInput[i].nextSibling.nextSibling,
                    currentVal = arrayInput[i].value;

                    if (rule == 'type-text') {
                        if (!Form.ValidateRequired(currentVal)){
                            formItem.className = 'error';
                            msgField.innerHTML = 'Please, fill the field';
                            isValid = false;
                        }
                    }

                    i++;
                }

                e.preventDefault();

                if (isValid) {
                    var name = form.elements['txtUsername'].value,
                    password = form.elements['txtPassword'].value;

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
                console.log('init js');
                Form.Validate()
            }
        };
    };
}(window, undefined));

Aubay = new Aubay.app();
Aubay.Init();
