<?php

$receiving_email_address = 'michael.r.rigali@gmail.com';

if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
} else {
    die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;
$contact->to = $receiving_email_address;
$contact->from_name = sanitize_input($_POST['name']);
$contact->from_email = sanitize_email($_POST['email']);
$contact->subject = sanitize_input($_POST['subject']);

$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

echo $contact->send();

function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function sanitize_email($email) {
    $email = sanitize_input($email);
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : false;
}
?>
