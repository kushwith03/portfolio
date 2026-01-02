const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '..', 'data', 'skills.json');

const readData = () => {
  try {
    if (!fs.existsSync(skillsPath)) return {};
    return JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  } catch (err) {
    return {};
  }
};

exports.getSkills = (req, res) => {
  const data = readData();
  res.json({ success: true, data });
};