<?php
/*
 * php-email-form.php
 *
 * Simple contact form script that sends mail using the built-in PHP mail() function,
 * then returns "OK" on success so validate.js recognizes it.
 *
 * Make sure this file is in the same directory as index.html,
 * and that your <form> tag points to `php-email-form.php`.
 */

// Set this to your personal Gmail address
$mail_to_send_to = "michael.r.rigali@gmail.com";

// Only process the form if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Retrieve form fields
    $name    = isset($_POST['name'])    ? $_POST['name']    : '';
    $email   = isset($_POST['email'])   ? $_POST['email']   : '';
    $subject = isset($_POST['subject']) ? $_POST['subject'] : 'Contact Form Submission';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Build the email body
    $body  = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    // Additional headers
    // 'From' can be any address at your domain
    $headers  = "From: noreply@michaelrigali.com\r\n";
    // Set a Reply-To so you can easily respond directly to the user
    $headers .= "Reply-To: $email\r\n";

    // Attempt to send the email
    if (mail($mail_to_send_to, $subject, $body, $headers)) {
        // If successful, echo exactly "OK"
        echo "OK";
    } else {
        // If it fails, echo a message for validate.js to display
        echo "Error sending mail. Possibly a server configuration issue.";
    }

} else {
    // If someone tries to GET this script directly, just respond with a message
    echo "Please submit via POST method.";
}
