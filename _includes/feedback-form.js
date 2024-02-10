<script type="text/javascript">
function initContactForm() {
  const contactForm = $('#customer-contact-form');
  const submitBtn = $("#contact-form-submit-button");
  const loadingSubmitButton = $('#contact-form-loading-submit-button');
  const submittedForm = $('#contact-form-was-submitted');
  const failedForm = $('#contact-form-failed-to-submit');

  function toggleVisibility(element, isVisible) {
    isVisible ? element.removeClass('form-hidden') : element.addClass('form-hidden');
  }

  function resetForm() {
    contactForm[0].reset();
    contactForm.find('.form-group').removeClass('form-hidden');
  }

  function prepareRequestData() {
    return {
      name: $('#contact_message_name').val(),
      email: $('#contact_email').val(),
      type: $('#feedback_type').val(),
      message: $('#contact_message_text').val(),
      rating: $('input[name="rating"]:checked').val()
    };
  }

  contactForm.submit(function(event) {
    event.preventDefault();
    submitBtn.attr("disabled", true);
    toggleVisibility(failedForm, false);

    const requestData = prepareRequestData();

    toggleVisibility(submitBtn, false);
    toggleVisibility(loadingSubmitButton, true);

    $.ajax({
      type: 'POST',
      url: contactForm.attr('action'),
      data: JSON.stringify(requestData),
      contentType: "application/json",
      dataType: 'json',
      encode: true,
    })
    .done(function() {
      toggleVisibility(loadingSubmitButton, false);
      toggleVisibility(submittedForm, true);
      resetForm();
    })
    .fail(function(err) {
      toggleVisibility(loadingSubmitButton, false);
      toggleVisibility(failedForm, true);
      submitBtn.attr('disabled', false);
      toggleVisibility(submitBtn, true);
    });
  });
}

$(document).ready(initContactForm);
</script>