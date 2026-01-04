const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '..', 'data', 'messages.json');

const readData = () => {
  try {
    const data = fs.readFileSync(messagesPath, 'utf8');
    return JSON.parse(data);
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
    return res.status(400).json({ error: "Missing required fields." });
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

  console.log(`[Contact Form] Saved message from ${name} (${email})`);
  res.status(201).json({ success: true, message: 'Message saved successfully.' });
};