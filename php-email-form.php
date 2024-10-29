<?php

// Configuration - replace with your email address
$receiving_email_address = 'michael.r.rigali@gmail.com';

// Check for POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and assign form inputs
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Check required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all fields.";
        exit;
    }

    // Check email validity
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // Compose email
    $to = $receiving_email_address;
    $email_subject = "New contact form submission: $subject";
    $email_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Email headers
    $headers = "From: $name <$email>";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo "OK";
    } else {
        http_response_code(500);
        echo "There was an error sending your message. Please try again later.";
    }
} else {
    // Return 403 Forbidden if accessed without POST
    http_response_code(403);
    echo "Forbidden - only POST requests are allowed.";
}
