import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : false,
  })
);
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Recipient is fixed server-side so this endpoint can't be used as an open mail relay.
const MAIL_TO = process.env.MAIL_TO || "igoagritechfarms@gmail.com";

app.post("/send", async (req, res) => {
  const { subject, text, replyTo } = req.body || {};
  if (!subject || !text) {
    return res.status(400).json({ success: false, error: "Missing required fields: subject, text" });
  }

  try {
    await transporter.sendMail({
      from: `"IGO Agritech Website" <${process.env.GMAIL_USER}>`,
      to: MAIL_TO,
      subject,
      text,
      replyTo: replyTo || undefined,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Mail send error:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Mail service listening on port ${port}`));
