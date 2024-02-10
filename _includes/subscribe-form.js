$(document).ready(function () {
  const subscribeForm = $("#customer-subscribe-form");
  const submitBtn = $("#subscribe-form-submit-button");
  const loadingBtn = $("#subscribe-form-loading-submit-button");
  const formFailed = $("#subscribe-form-failed-to-submit");
  const formSuccess = $("#subscribe-form-was-submitted");
  const formGroup = subscribeForm.find(".form-group");

  const toggleFormState = (isLoading) => {
    submitBtn.toggleClass("form-hidden", isLoading).prop("disabled", isLoading);
    loadingBtn.toggleClass("form-hidden", !isLoading);
    formFailed.addClass("form-hidden");
  };

  subscribeForm.on("submit", function (event) {
    event.preventDefault();

    const req = { email: $("#subscribe_email").val() };

    toggleFormState(true);

    $.ajax({
      type: "POST",
      url: subscribeForm.attr("action"),
      data: JSON.stringify(req),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      encode: true,
    })
      .done(() => {
        loadingBtn.addClass("form-hidden");
        formSuccess.removeClass("form-hidden");
        formGroup.addClass("form-hidden");
      })
      .fail((err) => {
        console.error("Failed to submit:", err);
        formFailed.removeClass("form-hidden");
        toggleFormState(false);
      });
  });
});
