$(document).ready(function () {
  function initContactForm() {
    const contactForm = $("#customer-contact-form");
    const submitBtn = $("#contact-form-submit-button");
    const loadingSubmitButton = $("#contact-form-loading-submit-button");
    const submittedForm = $("#contact-form-was-submitted");
    const failedForm = $("#contact-form-failed-to-submit");

    function toggleVisibility(element, isVisible) {
      isVisible
        ? element.removeClass("form-hidden")
        : element.addClass("form-hidden");
    }

    function resetForm() {
      contactForm[0].reset();
    }

    function prepareRequestData() {
      var ratingValue = $('input[name="rating"]:checked').val();
      return {
        name: $("#contact_message_name").val(),
        email: $("#contact_email").val(),
        type: $("#feedback_type").val(),
        message: $("#contact_message_text").val(),
        rating: ratingValue ? ratingValue : "",
      };
    }

    contactForm.submit(function (event) {
      event.preventDefault();
      toggleVisibility(failedForm, false);
      toggleVisibility(submitBtn, false);
      toggleVisibility(loadingSubmitButton, true);

      const requestData = prepareRequestData();

      $.ajax({
        type: "POST",
        url: contactForm.attr("action"),
        data: JSON.stringify(requestData),
        contentType: "application/json",
        dataType: "json",
        encode: true,
      })
        .done(function (response) {
          toggleVisibility(submittedForm, true);
          resetForm();
        })
        .fail(function (err) {
          toggleVisibility(failedForm, true);
        })
        .always(function () {
          toggleVisibility(loadingSubmitButton, false);
          toggleVisibility(submitBtn, true);
        });
    });
  }

  initContactForm();
});
