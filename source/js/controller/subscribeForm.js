export default function() {
    controller("subscribe-form", self => {
        const formsArray = self.toArray();

        const errorMessages = {
            invalidEmail: "Укажите корректное значение E-mail",
            invalidPhone: "Укажите корректное значение телефона",
            notChecked: "Вам нужно дать согласие"
        };

        formsArray.forEach(form => {
            const errors = [];
            const fields = Array.prototype.slice.call(
                form.querySelectorAll("input, textarea")
            );
            const maskedFields = fields.filter(element =>
                element.matches('[type="tel"]')
            );
            const errorContainer = form.querySelector(".form-txt-error");
            const successContainer = form.querySelector(".form-txt-success");
            const submitButton = form.querySelector("button[type='submit']");
            const showError = error => {
                errorContainer.textContent = error.message;
                errorContainer.style.display = "block";
            };

            const hideError = () => {
                errorContainer.textContent = "";
                errorContainer.style.display = "block";
            };
            form.setAttribute("novalidate", true);
            maskedFields.forEach(field => {
                $(field).mask("+7 (999) 999-99-99");
            });

            const goToNextError = () => {
                if (errors.length === 0) {
                    hideError();
                } else {
                    let requiredErrors = errors.filter(
                        error => error.type === "required"
                    );
                    if (requiredErrors.length > 0) {
                        const requiredError = requiredErrors[0];
                        showError(requiredError);
                        requiredError.field.focus();
                    } else {
                        const recentError = errors[0];
                        showError(recentError);
                        recentError.field.focus();
                    }
                }
            };

            function onChangeValidation() {
                const field = this;
                const error = validateField(field, errors);
                if (error) {
                    showError(error);
                } else {
                    hideError();
                }
            }

            fields.forEach(field => {
                field.addEventListener("focus", inputFocusHandler);
                field.addEventListener("blur", inputFocusHandler);
                field.addEventListener("keyup", onChangeValidation);
                field.addEventListener("change", onChangeValidation);
            });

            form.addEventListener("submit", function(event) {
                event.preventDefault();
                console.log("Errors list", errors);
                fields.forEach(field => {
                    validateField(field, errors);
                });
                if (errors.length > 0) {
                    goToNextError();
                    return;
                } else {
                    console.log("Submitting form");
                    var data = $(form).serialize();
                    data += "&type=callback";
                    data += "&form=" + submitButton.textContent;

                    console.log(data);

                    $.ajax({
                        url: "/.ajax.php",
                        dataType: "json",
                        data: data,
                        beforeSend: function() {
                            fields.forEach(field => (field.disabled = true));
                            submitButton.disabled = true;
                        },
                        success: function(data) {
                            console.log("Success called");
                            submitButton.disabled = false;
                            fields.forEach(field => {
                                field.value = "";
                                field.classList.remove("success");
                                field.disabled = false
                            });
                            if (successContainer) {
                                successContainer.style.display = "block";
                                setTimeout(function() {
                                    successContainer.style.display = "none";
                                }, 1000);
                            }
                        },
                        error: function() {
                            console.log("Error called");
                            fields.forEach(field => {
                                field.value = "";
                                field.classList.remove("success");
                                field.disabled = false
                            });
                            submitButton.disabled = false;
                            showError({
                                message: "Не удалось отправить форму"
                            });
                        }
                    });
                }
            });
        });

        function inputFocusHandler(event) {
            const wrap = this.closest(".js-subscribe-wrap");
            const placeholder = findPreviousSibling(
                this,
                ".js-subscribe-title"
            );
            if (wrap) {
                if (event.type === "focus") {
                    wrap.classList.add("focus");
                } else if (event.type === "blur") {
                    wrap.classList.remove("focus");
                }
            }
            if (!placeholder) return;

            if (event.type === "focus") {
                placeholder.classList.add("active");
            } else if (event.type === "blur" && this.value === "") {
                placeholder.classList.remove("active");
            }
        }

        function removeError(error, errors) {
            error.field.classList.add("success");
            error.field.classList.remove("error");

            const sameError = errors.find(element => {
                if (
                    element.type === error.type &&
                    element.field === error.field
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            if (sameError) {
                const index = errors.indexOf(sameError);
                errors.splice(index, 1);
            }
        }

        function addError(error, errors) {
            error.field.classList.remove("success");
            error.field.classList.add("error");

            const isErrorAlreadyPresent = errors.find(
                element =>
                    element.type === error.type && error.field === element.field
            );
            if (!isErrorAlreadyPresent) {
                errors.push(error);

                return true;
            } else {
                return false;
            }
        }

        function validateField(field, errors) {
            const type = field.type;
            if (field.hasAttribute("required")) {
                if (type === "checkbox") {
                    const checkboxError = {
                        type: "required",
                        field: field,
                        message: errorMessages.notChecked
                    };
                    if (!field.checked) {
                        addError(checkboxError, errors);
                        return checkboxError;
                    } else {
                        removeError(checkboxError, errors);
                    }
                } else {
                    const requiredTextError = {
                        type: "required",
                        field: field,
                        message: `Поле ${
                            field.hasAttribute("placeholder")
                                ? field
                                      .getAttribute("placeholder")
                                      .toLowerCase() + " "
                                : ""
                        }обязательно к заполнению`
                    };
                    if (!field.value) {
                        addError(requiredTextError, errors);
                        return requiredTextError;
                    } else {
                        removeError(requiredTextError, errors);
                    }
                }
            }

            if (type === "email") {
                const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                const isEmail = pattern.test(field.value);

                const notEmailError = {
                    type: "email",
                    field: field,
                    message: errorMessages.invalidEmail
                };
                if (!isEmail) {
                    addError(notEmailError, errors);
                    return notEmailError;
                } else {
                    removeError(notEmailError, errors);
                }
            }

            if (type === "tel") {
                const phoneNumber = field.value.replace(/\D+/g, "");
                const notPhoneNumber = {
                    type: "phone",
                    field: field,
                    message: errorMessages.invalidPhone
                };
                if (!(phoneNumber.length === 11)) {
                    addError(notPhoneNumber, errors);
                    return notPhoneNumber;
                } else {
                    removeError(notPhoneNumber, errors);
                }
            }
        }
    });
}
