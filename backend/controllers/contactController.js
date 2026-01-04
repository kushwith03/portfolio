const fs = require("fs");
const path = require("path");

const messagesPath = path.join(__dirname, "..", "data", "messages.json");

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(messagesPath, "utf8"));
  } catch {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(messagesPath, JSON.stringify(data, null, 2));
};

exports.saveMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const messages = readData();
  const now = new Date();

  const newMessage = {
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

  messages.push(newMessage);
  writeData(messages);

  console.log(
    `[Contact] ${name} <${email}> at ${newMessage.createdAtReadable}`
  );

  res.status(201).json({
    success: true,
    message: "Message received successfully.",
  });
};
