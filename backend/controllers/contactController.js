const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '..', 'data', 'messages.json');

const readData = () => {
  try {
    if (!fs.existsSync(messagesPath)) return [];
    return JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  } catch (err) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(messagesPath, JSON.stringify(data, null, 2));
};

exports.saveMessage = (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const messages = readData();
  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  messages.push(newMessage);
  writeData(messages);

  console.log(`[CONTACT SAVED] From: ${name} (${email})`);
  res.json({ success: true, message: 'Message saved successfully' });
};