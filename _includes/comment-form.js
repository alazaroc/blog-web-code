<script type="text/javascript">
function initCommentForm() {
  var commentForm = $('#customer-comment-form');
  commentForm.submit(function(event) {
    event.preventDefault();
    var submitBtn = $("#comment-form-submit-button");
    submitBtn.attr("disabled", true);
    $('#comment-form-failed-to-submit').addClass('form-hidden');

    var req = {
        nick:           $('#comment_message_nick').val(),
        title:          window.location.href,
        comment:           $('#comment_message_text').val(),
    };

    submitBtn.addClass('form-hidden');
    $('#comment-form-loading-submit-button').removeClass('form-hidden');

    $.ajax({
        type: 'POST',
        url: commentForm.attr('action'),
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType: 'json',
        encode: true,
    }).done(function() {
      $('#comment-form-loading-submit-button').addClass('form-hidden');
      $('#comment-form-was-submitted').removeClass('form-hidden');
      commentForm.find('.form-group').addClass('form-hidden');
    }).fail(function(err) {
      $('#comment-form-loading-submit-button').addClass('form-hidden');
      $('#comment-form-failed-to-submit').removeClass('form-hidden');
      submitBtn.attr('disabled', false).removeClass('form-hidden');
    });
  });
}

$(document).ready(initCommentForm);

</script>
