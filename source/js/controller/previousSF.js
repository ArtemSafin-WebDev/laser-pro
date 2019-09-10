export default function() {
    controller("subscribe-form", self => {

        function isEmailAddress(str) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(str); // returns a boolean
        }

        const forms = self.toArray();
        forms.forEach(form => {
            const wrap = form.querySelector(".js-subscribe-wrap");
            const formErrorContainer = form.querySelector(".form-txt-error");
            const formSuccessContainer = form.querySelector(
                ".form-txt-success"
            );
            const formBtn = form.querySelector("button");

            const inputs = Array.prototype.slice.call(
                form.querySelectorAll("input, textarea")
            );

            const telInputs = inputs.filter(element =>
                element.matches('[type="tel"]')
            );

            telInputs.forEach(telInput => {
                console.log("Phone input", telInput);
                $(telInput).mask("+7 (999) 999-99-99");
            });

            inputs.forEach(input => {
                let placeholder;
                try {
                    placeholder = input
                        .closest(".subscribe-form__box")
                        .querySelector(".js-subscribe-title");
                } catch (e) {
                    console.log("No placeholder present");
                }

                input.addEventListener("focus", function() {
                    if (wrap) {
                        wrap.classList.add("focus");
                    }

                    if (!placeholder) return;
                    placeholder.classList.add("active");
                });

                input.addEventListener("blur", function() {
                    if (wrap) {
                        wrap.classList.remove("focus");
                    }

                    const length = input.value.length;

                    if (!placeholder) return;
                    if (length !== 0) {
                        placeholder.classList.add("active");
                    } else {
                        placeholder.classList.remove("active");
                    }
                });

                const validator = function() {
                    
                    if (formErrorContainer) {
                        formErrorContainer.style.display = "none";
                        formErrorContainer.textContent = "";
                    }

                    const value = input.value;
                    const type = input.type;
                    console.log("Validating value", value);
                    switch (type) {
                        case "text":
                            console.log("validating as text");
                            if (value !== "") {
                                input.classList.add("success");
                                input.classList.remove("error");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                input.classList.add("error");
                                console.log("Invalid field");
                                if (formErrorContainer) {
                                    formErrorContainer.textContent = `Укажите ${placeholder.textContent.toLowerCase()}`;
                                    formErrorContainer.style.display = "block";
                                }
                            }
                            break;
                        case "tel":
                            console.log("validating as phone");
                            const phone = value.replace(/\D+/g, "");
                            if (phone.length === 11) {
                                input.classList.add("success");
                                input.classList.remove("error");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                input.classList.add("error");
                                console.log("Invalid field");
                                if (formErrorContainer) {
                                    formErrorContainer.textContent =
                                        "Укажите корректное значение телефона";
                                    formErrorContainer.style.display = "block";
                                }
                            }
                            break;
                        case "email":
                            console.log("validating as email");
                            if (isEmailAddress(value)) {
                                input.classList.add("success");
                                input.classList.remove("error");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                input.classList.add("error");
                                console.log("Invalid field");
                                if (formErrorContainer) {
                                    formErrorContainer.textContent =
                                        "Укажите корректное значение Email";
                                    formErrorContainer.style.display = "block";
                                }
                            }
                            break;
                        case "checkbox":
                            console.log("validating checkbox");
                            if (input.checked) {
                                input.classList.add("success");
                                input.classList.remove("error");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                input.classList.add("error");
                                console.log("Invalid field");
                                if (formErrorContainer) {
                                    formErrorContainer.textContent =
                                        "Подтвердите согласие";
                                    formErrorContainer.style.display = "block";
                                }
                            }
                            break;
                    }
                };

                input.addEventListener("keyup", validator);
                input.addEventListener("change", validator);
            });

            form.addEventListener("submit", function(event) {
                event.preventDefault();
                var data = $(form).serialize();
                data += "&type=callback";
                data += "&form=" + formBtn.textContent;
                const inputsWithError = inputs.filter(element =>
                    element.matches("input:not(.success)")
                );

                if (inputsWithError.length > 0) {
                    inputsWithError[0].focus();
                    console.log("Errors present");
                } else {
                    console.log("Sending request");
                    console.log(data);

                    $.ajax({
                        url: "/.ajax.php",
                        dataType: "json",
                        data: data,
                        beforeSend: function() {
                            inputs.forEach(input => (input.disabled = true));
                            formBtn.disabled = true;
                        },
                        success: function(data) {
                            inputs.forEach(input => (input.disabled = false));
                            formBtn.disabled = false;

                            if (data.status) {
                                if (data.status == "success") {
                                    inputs.forEach(input => {
                                        input.value = "";
                                        input.classList.remove("success");
                                    });
                                    if (formSuccessContainer) {
                                        formSuccessContainer.style.display =
                                            "block";
                                    }
                                } else {
                                    if (formErrorContainer) {
                                        formErrorContainer.textContent =
                                            "Не удалось отправить. Попробуйте повторно";
                                        formErrorContainer.style.display =
                                            "block";
                                    }
                                }
                            }
                        }
                    });
                    $.ajax();
                }
            });
        });
    });
}
