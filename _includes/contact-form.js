<script type="text/javascript">
function initContactForm() {
  var contactForm = $('#customer-contact-form');
  contactForm.submit(function(event) {
    event.preventDefault();
    var submitBtn = $("#contact-form-submit-button");
    submitBtn.attr("disabled", true);
    $('#contact-form-failed-to-submit').addClass('form-hidden');

    var req = {
        name:           $('#contact_message_name').val(),
        reply_to: $('#contact_email').val(),
        message:           $('#contact_message_text').val(),
    };

    submitBtn.addClass('form-hidden');
    $('#contact-form-loading-submit-button').removeClass('form-hidden');

    $.ajax({
        type: 'POST',
        url: contactForm.attr('action'),
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType: 'json',
        encode: true,
    }).done(function() {
      $('#contact-form-loading-submit-button').addClass('form-hidden');
      $('#contact-form-was-submitted').removeClass('form-hidden');
      contactForm.find('.form-group').addClass('form-hidden');
    }).fail(function(err) {
      $('#contact-form-loading-submit-button').addClass('form-hidden');
      $('#contact-form-failed-to-submit').removeClass('form-hidden');
      submitBtn.attr('disabled', false).removeClass('form-hidden');
    });
  });
}

$(document).ready(initContactForm);

</script>
