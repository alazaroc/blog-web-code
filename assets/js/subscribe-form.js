// ====================================
// SUBSCRIPTION POPUP MANAGEMENT - Global functions
// ====================================
const SUBSCRIPTION_POPUP_DELAY = 10000; // 10 seconds
const SUBSCRIPTION_POPUP_DAYS = 14; // Days until popup shows again

function closeSubscriptionPopup() {
  const popup = document.getElementById("subscription-popup");
  if (popup) {
    popup.classList.remove("show");
    // Save close date
    const nextShow = Date.now() + SUBSCRIPTION_POPUP_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem("subscriptionPopupNextShow", nextShow);
  }
}

function showSubscriptionPopup() {
  const popup = document.getElementById("subscription-popup");
  if (popup) {
    popup.classList.add("show");
  }
}

function resetSubscriptionPopup() {
  localStorage.removeItem("subscriptionPopupNextShow");
  showSubscriptionPopup();
}

$(document).ready(function () {
  // ====================================
  // SUBSCRIPTION FORM HANDLING
  // ====================================
  $(".customer-subscribe-form").each(function () {
    const subscribeForm = $(this);
    const submitBtn = subscribeForm.find(".subscribe-form-submit-button");
    const loadingBtn = subscribeForm.find(
      ".subscribe-form-loading-submit-button"
    );
    const formFailed = subscribeForm.find(".subscribe-form-failed-to-submit");
    const formSuccess = subscribeForm.find(".subscribe-form-was-submitted");
    const formContent = subscribeForm.find(".d-flex, .form-group, .d-grid");

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

      const req = { email: subscribeForm.find(".subscribe_email").val() };

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
          toggleVisibility(formContent, false);
        })
        .fail((err) => {
          toggleVisibility(formFailed, true);
          toggleVisibility(submitBtn, true);
        })
        .always(function () {
          toggleVisibility(loadingBtn, false);
        });
    });
  });

  // ====================================
  // SUBSCRIPTION POPUP INITIALIZATION
  // ====================================

  // Initialize popup functionality
  const popup = document.getElementById("subscription-popup");
  if (popup) {
    // Close when clicking outside the popup
    popup.onclick = function () {
      closeSubscriptionPopup();
    };

    // Development reset button functionality
    const resetButton = document.getElementById("popup-reset-button");
    if (resetButton) {
      resetButton.onclick = resetSubscriptionPopup;
    }

    // Only show if not closed in the last 14 days
    const nextShow = localStorage.getItem("subscriptionPopupNextShow");
    if (!nextShow || Date.now() > parseInt(nextShow, 10)) {
      setTimeout(showSubscriptionPopup, SUBSCRIPTION_POPUP_DELAY);
    }
  }
});
