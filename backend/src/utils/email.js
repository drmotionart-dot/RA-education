/*
  TODO: Before production launch, verify a domain on Resend.com and update the
  `from` address below. The free-tier key only delivers to dr.motion.art@gmail.com.
  Until then, every user whose email is NOT that address will silently fall through
  to the linking-code path (Telegram primary, console.log remains for dev).
*/

export async function sendEmailOTP(email, code) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[EMAIL] No RESEND_API_KEY configured, skipping email delivery');
    return null;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'RA Education <onboarding@resend.dev>',
      to: email,
      subject: 'Your RA Education OTP Code',
      text: `Your OTP code is: ${code}\n\nThis code expires in 5 minutes. Do not share it with anyone.`,
      html: `<p>Your OTP code is: <strong>${code}</strong></p><p>This code expires in 5 minutes. Do not share it with anyone.</p>`,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Resend email failed: ${err.message || JSON.stringify(err)}`);
  }

  return res.json();
}
