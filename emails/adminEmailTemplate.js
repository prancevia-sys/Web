const adminEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Application Received</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:30px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

<tr>
<td style="background:#111827;color:#ffffff;padding:20px;text-align:center;font-size:22px;font-weight:bold;">
New Application Received
</td>
</tr>

<tr>
<td style="padding:30px;font-size:14px;color:#333;">

<p>A new application has been submitted on the website.</p>

<table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin-top:20px;border:1px solid #e5e7eb;">

<tr style="background:#f9fafb;">
<td><strong>Name</strong></td>
<td>${data.fullName}</td>
</tr>

<tr>
<td><strong>Email</strong></td>
<td>${data.email}</td>
</tr>

<tr style="background:#f9fafb;">
<td><strong>Phone</strong></td>
<td>${data.phone}</td>
</tr>

<tr>
<td><strong>Company</strong></td>
<td>${data.companyName}</td>
</tr>

<tr style="background:#f9fafb;">
<td><strong>City</strong></td>
<td>${data.city}</td>
</tr>

</table>

<p style="margin-top:25px;">
You can review the full application details in the admin dashboard.
</p>

</td>
</tr>

<tr>
<td style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;color:#777;">
Notification from Invien Pilot Partner Program Portal
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

module.exports = adminEmailTemplate;