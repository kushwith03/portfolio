const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');

const readData = () => {
  try {
    if (!fs.existsSync(projectsPath)) return [];
    return JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  } catch (err) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(projectsPath, JSON.stringify(data, null, 2));
};

exports.getProjects = (req, res) => {
  const data = readData();
  res.json({ success: true, data });
};

exports.createProject = (req, res) => {
  const projects = readData();
  const newProject = { id: Date.now().toString(), ...req.body };
  projects.push(newProject);
  writeData(projects);
  res.json({ success: true, data: newProject });
};

exports.deleteProject = (req, res) => {
  let projects = readData();
  projects = projects.filter(p => p.id !== req.params.id);
  writeData(projects);
  res.json({ success: true, message: "Project deleted" });
};