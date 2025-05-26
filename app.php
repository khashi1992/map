<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // اگر از Composer استفاده کرده‌اید

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userEmail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // تنظیمات SMTP
        $mail->isSMTP();
        $mail->Host       = 'khashyarmadad1992@gmail.com';  // سرور SMTP شما
        $mail->SMTPAuth   = false;
        $mail->Username   = 'your-email@example.com'; // ایمیل شما

        $mail->Port       = 587;

        // اطلاعات فرستنده
        $mail->setFrom('your-email@example.com', 'فرم تماس');
        $mail->addAddress('your-email@example.com'); // دریافت کننده اصلی (شما)

        // محتوا
        $mail->isHTML(false);
        $mail->Subject = 'پیام از فرم تماس';
        $mail->Body    = "ایمیل فرستنده: $userEmail\n\nپیام:\n$message";

        $mail->send();

        // ارسال پاسخ به کاربر
        $reply = new PHPMailer(true);
        $reply->isSMTP();
        $reply->Host       = 'smtp.example.com';
        $reply->SMTPAuth   = true;
        $reply->Username   = 'your-email@example.com';
        $reply->Password   = 'your-email-password';
        $reply->SMTPSecure = 'tls';
        $reply->Port       = 587;

        $reply->setFrom('your-email@example.com', 'پاسخ‌دهنده');
        $reply->addAddress($userEmail);
        $reply->isHTML(false);
        $reply->Subject = 'پیام شما دریافت شد';
        $reply->Body    = "سلام!\nپیام شما دریافت شد. با تشکر از شما.";

        $reply->send();

        echo "پیام با موفقیت ارسال شد و پاسخ نیز فرستاده شد.";
    } catch (Exception $e) {
        echo "خطا در ارسال ایمیل: {$mail->ErrorInfo}";
    }
}
?>
