import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js";

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    // Ensure Mailtrap token available in dev
    if (!process.env.MAILTRAP_API_TOKEN) {
      console.warn("MAILTRAP_API_TOKEN is not set. Emails will not be delivered.");
      return res.status(500).json({ error: "Server mail configuration missing (MAILTRAP_API_TOKEN)" });
    }

    const adminEmail = process.env.SUPPORT_EMAIL || sender.email;

    const html = `
      <h3>New contact form submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || "(none)"}</p>
      <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
    `;

    try {
      await mailtrapClient.send({
        from: sender,
        to: [{ email: adminEmail }],
        subject: `Contact Form: ${name}`,
        html,
      });
    } catch (sendErr) {
      console.error("Error sending contact email:", sendErr?.message || sendErr);
      return res.status(500).json({ error: sendErr?.message || "Failed to send message" });
    }

    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (error) {
    console.log("Unexpected error in contact handler:", error?.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
