const fs = require("fs");
const path = require("path");

const projectsPath = path.join(__dirname, "..", "data", "projects.json");

// Ensures the data is always an array.
const readData = () => {
  try {
    if (!fs.existsSync(projectsPath)) return [];

    const raw = JSON.parse(fs.readFileSync(projectsPath, "utf8"));
    return Array.isArray(raw) ? raw : Object.values(raw);
  } catch (err) {
    console.error("Failed to read projects:", err);
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(projectsPath, JSON.stringify(data, null, 2));
};

exports.getProjects = (req, res) => {
  res.json({
    success: true,
    data: readData(),
  });
};

exports.createProject = (req, res) => {
  const projects = readData();
  const newProject = { id: Date.now().toString(), ...req.body };

  writeData([...projects, newProject]);

  res.status(201).json({
    success: true,
    data: newProject,
  });
};

exports.deleteProject = (req, res) => {
  const projects = readData();
  const updatedProjects = projects.filter((p) => p.id !== req.params.id);

  writeData(updatedProjects);

  res.json({
    success: true,
    message: "Project deleted",
  });
};
