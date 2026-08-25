// Vercel serverless function: receives the contact form POST and sends it
// through the Mailtrap Sending API (https://send.api.mailtrap.io/api/send).
// Requires these environment variables to be set in the Vercel project:
//   MAILTRAP_API_TOKEN   - your Mailtrap API token
//   MAILTRAP_SENDER_EMAIL - a sender address verified in Mailtrap (e.g. hello@yourdomain.com)
//   CONTACT_RECEIVER_EMAIL - YOUR_EMAIL@DOMAIN.COM (where enquiries should land)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, service, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiToken = process.env.MAILTRAP_API_TOKEN;
  const senderEmail = process.env.MAILTRAP_SENDER_EMAIL;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!apiToken || !senderEmail || !receiverEmail) {
    return res.status(500).json({ error: 'Mailtrap is not configured on the server' });
  }

  const text = `Name: ${name}\nEmail: ${email}\nBusiness/project: ${business || '-'}\nService: ${service || '-'}\n\n${message}`;

  try {
    const mailtrapResponse = await fetch('https://send.api.mailtrap.io/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        from: { email: senderEmail, name: 'Box & Trianz website' },
        to: [{ email: receiverEmail }],
        reply_to: { email, name },
        subject: `Box & Trianz enquiry — ${service || 'General'}`,
        text,
      }),
    });

    if (!mailtrapResponse.ok) {
      const errorBody = await mailtrapResponse.text();
      return res.status(502).json({ error: 'Mailtrap rejected the message', details: errorBody });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
