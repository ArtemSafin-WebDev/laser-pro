export default function() {
    controller("subscribe-form", self => {
        console.log(self);

        function isEmailAddress(str) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(str); // returns a boolean
        }

        const forms = self.toArray();
        forms.forEach(form => {
            console.log(form);
            const wrap = form.querySelector(".js-subscribe-wrap");
            const formErrorContainer = form.querySelector(".form-txt-error");
            const formSuccessContainer = form.querySelector(
                ".form-txt-success"
            );
            const formBtn = form.querySelector("button");

            const inputs = Array.prototype.slice.call(
                form.querySelectorAll(".js-subscribe-input")
            );

            const telInputs = inputs.filter(element =>
                element.matches('[type="tel"]')
            );

            telInputs.forEach(telInput => {
                console.log("Phone input", telInput);
                $(telInput).mask("+7 (999) 999-99-99");
            });

            inputs.forEach(input => {
                const placeholder = input
                    .closest(".subscribe-form__box")
                    .querySelector(".js-subscribe-title");

                input.addEventListener("focus", function() {
                    wrap.classList.add("focus");
                    placeholder.classList.add("active");
                });

                input.addEventListener("blur", function() {
                    wrap.classList.remove("focus");
                    const length = input.value.length;

                    if (length !== 0) {
                        placeholder.classList.add("active");
                    } else {
                        placeholder.classList.remove("active");
                    }
                });

                input.addEventListener("keyup", function() {
                    formErrorContainer.style.display = "none";
                    formErrorContainer.textContent = "";
                    const value = input.value;
                    const type = input.type;
                    console.log("Validating value", value);
                    switch (type) {
                        case "text":
                            console.log("validating as text");
                            if (value !== "") {
                                input.classList.add("success");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                console.log("Invalid field");
                                formErrorContainer.textContent = `Укажите ${placeholder.textContent}`;
                                formErrorContainer.style.display = "block";
                            }
                            break;
                        case "tel":
                            console.log("validating as phone");
                            const phone = value.replace(/\D+/g, "");
                            if (phone.length === 11) {
                                input.classList.add("success");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                console.log("Invalid field");
                                formErrorContainer.textContent =
                                    "Укажите корректное значение телефона";
                                formErrorContainer.style.display = "block";
                            }
                            break;
                        case "email":
                            console.log("validating as email");
                            if (isEmailAddress(value)) {
                                input.classList.add("success");
                                console.log("Valid field");
                            } else {
                                input.classList.remove("success");
                                console.log("Invalid field");
                                formErrorContainer.textContent =
                                    "Укажите корректное значение Email";
                                formErrorContainer.style.display = "block";
                            }
                            break;
                    }
                });
            });

            form.addEventListener("submit", function(event) {
                event.preventDefault();
                console.log(form);
                console.log(formBtn.textContent);
                var data = $(form).serialize();
                data += '&type=callback';
                data += '&form=' + formBtn.textContent;
                /*const data = new FormData(form);
                data.append("form", formBtn.textContent);
                data.append("type", "callback");*/
                const inputsWithError = inputs.filter(element =>
                    element.matches(".js-subscribe-input:not(.success)")
                );
                console.log(data);
                console.log("Submitting form");
                formErrorContainer.style.display = "none";
                formSuccessContainer.style.display = "none";

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
                                    formSuccessContainer.style.display =
                                        "block";
                                } else {
                                    formErrorContainer.textContent =
                                        "Не удалось отправить. Попробуйте повторно";
                                    formErrorContainer.style.display = "block";
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
