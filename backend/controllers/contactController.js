const fs = require("fs");
const path = require("path");

const messagesPath = path.join(__dirname, "..", "data", "messages.json");

function readMessages() {
  try {
    return JSON.parse(fs.readFileSync(messagesPath, "utf8"));
  } catch {
    return [];
  }
}

function writeMessages(data) {
  fs.writeFileSync(messagesPath, JSON.stringify(data, null, 2));
}

exports.saveMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const now = new Date();

  const entry = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: now.toISOString(),
    createdAtReadable: now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  const messages = readMessages();
  messages.push(entry);
  writeMessages(messages);

  const preview = message.length > 80 ? message.slice(0, 80) + "…" : message;

  console.log(
    `[CONTACT] ${entry.createdAtReadable} | ${name} <${email}> | "${preview}"`
  );

  res.status(201).json({
    success: true,
    message: "Message received successfully.",
  });
};
