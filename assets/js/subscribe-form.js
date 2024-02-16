$(document).ready(function () {
  const subscribeForm = $("#customer-subscribe-form");
  const submitBtn = $("#subscribe-form-submit-button");
  const loadingBtn = $("#subscribe-form-loading-submit-button");
  const formFailed = $("#subscribe-form-failed-to-submit");
  const formSuccess = $("#subscribe-form-was-submitted");
  const formGroup = subscribeForm.find(".form-group");

  function toggleVisibility(element, isVisible) {
    isVisible
      ? element.removeClass("form-hidden")
      : element.addClass("form-hidden");
  }

  subscribeForm.on("submit", function (event) {
    event.preventDefault();
    toggleVisibility(formFailed, false);
    toggleVisibility(submitBtn, false);
    toggleVisibility(loadingBtn, true);

    const req = { email: $("#subscribe_email").val() };

    $.ajax({
      type: "POST",
      url: subscribeForm.attr("action"),
      data: JSON.stringify(req),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      encode: true,
    })
      .done(() => {
        toggleVisibility(formSuccess, true);
        toggleVisibility(formGroup, false);
      })
      .fail((err) => {
        console.error("Failed to submit:", err);
        toggleVisibility(formFailed, true);
        toggleVisibility(submitBtn, true);
      })
      .always(function () {
        toggleVisibility(loadingBtn, false);
      });
  });
});
