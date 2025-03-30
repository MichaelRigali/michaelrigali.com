(function () {
  "use strict";

  // Select all forms with the .php-email-form class
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (formElem) {
    formElem.addEventListener('submit', function (event) {
      event.preventDefault();

      // A reference to the current form
      let thisForm = this;

      // The 'action' attribute should be the path to php-email-form.php
      let action = thisForm.getAttribute('action');
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show the "Loading" indicator, hide previous messages
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // Gather all form fields into FormData
      let formData = new FormData(thisForm);

      // Send the request to the PHP script
      phpEmailFormSubmit(thisForm, action, formData);
    });
  });

  /**
   * Sends the form data to the specified action (php-email-form.php).
   * Expects the server to return "OK" on success, or an error message otherwise.
   */
  function phpEmailFormSubmit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      })
      .then(data => {
        // Remove loading spinner
        thisForm.querySelector('.loading').classList.remove('d-block');

        // If the PHP responded "OK," treat it as success
        if (data.trim() === 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          // Otherwise, display the message as an error
          throw new Error(data ? data : 'Form submission failed for an unknown reason.');
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  /**
   * Helper function to display error messages in the form.
   */
  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    let errorMsgElem = thisForm.querySelector('.error-message');
    errorMsgElem.innerHTML = error;
    errorMsgElem.classList.add('d-block');
  }

})();
