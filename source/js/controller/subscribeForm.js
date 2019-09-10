export default function() {
    controller("subscribe-form", self => {
        const formsArray = self.toArray();

        const errorMessages = {
            invalidEmail: "Укажите корректное значение E-mail",
            invalidPhone: "Укажите корректное значение телефона",
            emptyField: "Поле не должно быть пустым",
            notChecked: "Вам нужно дать согласие"
        };

        formsArray.forEach(form => {
            const errorContainer = form.querySelector(".form-txt-error");
            
            const submitBtn = form.querySelector(
                "input[type='submit'], button[type='submit']"
            );
            const fields = Array.from(form.querySelectorAll("input, textarea"));
            const invalidFields = [];

            setupInputMasks(fields);
            setupFocusListeners(fields);
            setupChangeListeners(fields, invalidFields, errorContainer);
            setupSubmitHandler(form, fields, invalidFields, errorContainer);
        });

        function setupInputMasks(fields) {
            const maskedInputs = fields.filter(element =>
                element.matches('[type="tel"]')
            );
            maskedInputs.forEach(input => $(input).mask("+7 (999) 999-99-99"));
        }

        function setupFocusListeners(fields) {
            if (Array.isArray(fields)) {
                fields.forEach(field => {
                    field.addEventListener("focus", () => {
                        focusHandler(field);
                    });
                    field.addEventListener("blur", () => {
                        blurHandler(field);
                    });
                });
            } else {
                console.log("Not an array");
            }
        }

        function focusHandler(field) {
            const placeholder = findPreviousSibling(
                field,
                ".js-subscribe-title"
            );
            const wrap = field.closest(".js-subscribe-wrap");

            if (wrap) {
                wrap.classList.add("focus");
            }
            if (!placeholder) return;

            placeholder.classList.add("active");
        }

        function blurHandler(field) {
            const placeholder = findPreviousSibling(
                field,
                ".js-subscribe-title"
            );
            const wrap = field.closest(".js-subscribe-wrap");
            if (wrap) {
                wrap.classList.remove("focus");
            }
            if (!placeholder) return;

            if (field.value.length !== 0) {
                placeholder.classList.add("active");
            } else {
                placeholder.classList.remove("active");
            }
        }

        function showErrorMessage(errorContainer, message) {
            errorContainer.style.display = "block";
            errorContainer.textContent = message;
        }

        function hideErrorMessage(errorContainer) {
            errorContainer.style.display = "none";
            errorContainer.textContent = "";
        }

        function setupChangeListeners(fields, errorsList, errorContainer) {
            fields.forEach(field => {
                const type = field.type;
                if (
                    type === "text" ||
                    type === "email" ||
                    type === "tel" ||
                    field.matches("textarea")
                ) {
                    field.addEventListener("keyup", () => {
                        validateField(field, errorsList, errorContainer);
                    });
                    field.addEventListener("change", () => {
                        validateField(field, errorsList, errorContainer);
                    });
                } else if (type === "checkbox") {
                    field.addEventListener("change", () => {
                        validateField(field, errorsList, errorContainer);
                    });
                }
            });
        }

        function isEmailAddress(value) {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(value);
        }

        function isPhoneNumber(value) {
            const phoneNumber = value.replace(/\D+/g, "");
            if (phoneNumber.length === 11) {
                return true;
            } else {
                return false;
            }
        }

        function isNotEmpty(value) {
            if (
                value === "" ||
                value === null ||
                typeof value === "undefined"
            ) {
                return false;
            } else {
                return true;
            }
        }

        function addToErrorsList(field, message, errorsList) {
            
            field.classList.remove("success");
            field.classList.add("error");
            errorsList.push({
                field: field,
                message: message
            });
            console.log('Errors list after error addition', errorsList)
        }

        function removeFromErrorsList(field, errorsList, errorContainer) {
            const initialErrorsListLength = errorsList.length;
            if (initialErrorsListLength > 0) {
                field.classList.add("success");
                field.classList.remove("error");
                errorsList = errorsList.filter(
                    element => element.field !== field
                );
                console.log('Errors list after removal', errorsList);

                const newErrorsListLength = errorsList.length;
                if (initialErrorsListLength === newErrorsListLength) {
                    return;
                } else {
                    const newError = getFirstError(errorsList);

                    if (!newError) {
                        hideErrorMessage(errorContainer);
                        return;
                    } else {
                        showErrorMessage(errorContainer, newError.message);
                    }
                }
            }
        }

        function validateField(field, errorsList, errorContainer) {
            if (field.hasAttribute("required")) {
                if (field.type === "checkbox") {
                    const checked = field.checked;
                    if (!checked) {
                        addToErrorsList(
                            field,
                            errorMessages.notChecked,
                            errorsList
                        );
                        showErrorMessage(
                            errorContainer,
                            errorMessages.notChecked
                        );
                        return;
                    } else {
                        removeFromErrorsList(field, errorsList, errorContainer);
                    }
                } else {
                    const notEmpty = isNotEmpty(field.value);

                    if (!notEmpty) {
                        addToErrorsList(
                            field,
                            errorMessages.emptyField,
                            errorsList
                        );
                        showErrorMessage(
                            errorContainer,
                            errorMessages.emptyField
                        );
                        return;
                    } else {
                        removeFromErrorsList(field, errorsList, errorContainer);
                    }
                }
            }
            if (field.type === "email") {
                const isEmail = isEmailAddress(field.value);
                if (!isEmail) {
                    addToErrorsList(
                        field,
                        errorMessages.invalidEmail,
                        errorsList
                    );
                    showErrorMessage(
                        errorContainer,
                        errorMessages.invalidEmail
                    );
                } else {
                    removeFromErrorsList(field, errorsList, errorContainer);
                }
            }

            if (field.type === "tel") {
                const isPhone = isPhoneNumber(field.value);
                if (!isPhone) {
                    addToErrorsList(
                        field,
                        errorMessages.invalidPhone,
                        errorsList
                    );
                    showErrorMessage(
                        errorContainer,
                        errorMessages.invalidPhone
                    );
                } else {
                    removeFromErrorsList(field, errorsList, errorContainer);
                }
            }
        }

        function validateForm(fields, errorsList, errorContainer) {
            fields.forEach(field => {
                validateField(field, errorsList, errorContainer);
            });
            if (errorsList.length > 0) {
                return false;
            } else {
                return true;
            }
        }

        function getFirstError(errorsList) {
            if (errorsList.length > 0) {
                return errorsList[0];
            } else {
                return null;
            }
        }

        function clearForm(fields, errorContainer) {
            fields.forEach(field => {
                if (field.type === "checkbox") {
                    field.checked = false;
                } else {
                    field.value = "";
                }
                field.classList.remove("success");
                field.classList.remove("error");
            });
            hideErrorMessage(errorContainer);
        }

        function setupSubmitHandler(form, fields, errorsList, errorContainer) {
            console.log("Setting up submit handling");
            console.log(form);

            form.addEventListener("submit", event => {
                event.preventDefault();
                console.log("Handling form submission");
                handleFormSubmission(fields, errorsList, errorContainer);
            });
        }

        function handleFormSubmission(fields, errorsList, errorContainer) {
            const formValid = validateForm(fields, errorsList, errorContainer);
            console.log('Errors list', errorsList)
            if (formValid) {
                console.log("Form valid");
            } else {
                console.log("Form invalid");
            }
        }
    });
}
