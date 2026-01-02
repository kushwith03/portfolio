const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aiRoutes = require('./routes/aiRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', aiRoutes);
app.use('/api/stats', statsRoutes);

// Ensure Data Directory Exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

// Ensure Stats File
const statsPath = path.join(dataDir, 'stats.json');
if (!fs.existsSync(statsPath)) {
  fs.writeFileSync(statsPath, JSON.stringify({ visits: 0 }));
}

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});