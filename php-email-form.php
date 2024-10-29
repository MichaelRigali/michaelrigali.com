<?php

// Set your receiving email address
$receiving_email_address = 'michael.r.rigali@gmail.com';

// Only allow POST requests to prevent direct access
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and validate form inputs
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_email($_POST['email'] ?? '');
    $subject = sanitize_input($_POST['subject'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    // Check if all required fields are filled
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all fields.";
        exit;
    }

    // Email headers
    $headers = "From: $name <$email>";

    // Send the email
    $email_sent = mail($receiving_email_address, $subject, $message, $headers);

    if ($email_sent) {
        http_response_code(200);
        echo "OK";
    } else {
        http_response_code(500);
        echo "There was an error sending your message. Please try again later.";
    }

} else {
    // Reject non-POST requests
    http_response_code(405);
    echo "Method Not Allowed - only POST requests are allowed.";
}

// Sanitize input function
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Sanitize email function
function sanitize_email($email) {
    $email = sanitize_input($email);
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : false;
}
?>
