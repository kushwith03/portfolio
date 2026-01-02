const fs = require('fs');
const path = require('path');

const statsPath = path.join(__dirname, '..', 'data', 'stats.json');

const readData = () => {
  try {
    if (!fs.existsSync(statsPath)) return { visits: 0 };
    return JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  } catch (err) {
    return { visits: 0 };
  }
};

const writeData = (data) => {
  fs.writeFileSync(statsPath, JSON.stringify(data, null, 2));
};

exports.getStats = (req, res) => {
  const stats = readData();
  stats.visits += 1;
  writeData(stats);
  res.json({ success: true, visits: stats.visits });
};