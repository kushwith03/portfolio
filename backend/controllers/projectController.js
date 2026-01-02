const fs = require("fs");
const path = require("path");

const projectsPath = path.join(__dirname, "..", "data", "projects.json");

/**
 * Always returns an ARRAY
 */
const readData = () => {
  try {
    if (!fs.existsSync(projectsPath)) return [];

    const raw = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

    // ✅ Normalize object → array
    return Array.isArray(raw) ? raw : Object.values(raw);
  } catch (err) {
    console.error("Failed to read projects:", err);
    return [];
  }
};

/**
 * Always writes ARRAY
 */
const writeData = (data) => {
  fs.writeFileSync(projectsPath, JSON.stringify(data, null, 2));
};

exports.getProjects = (req, res) => {
  const projects = readData();
  res.json({
    success: true,
    data: projects,
  });
};

exports.createProject = (req, res) => {
  const projects = readData();

  const newProject = {
    id: Date.now().toString(),
    ...req.body,
  };

  projects.push(newProject);
  writeData(projects);

  res.json({
    success: true,
    data: newProject,
  });
};

exports.deleteProject = (req, res) => {
  let projects = readData();

  projects = projects.filter((p) => p.id !== req.params.id);
  writeData(projects);

  res.json({
    success: true,
    message: "Project deleted",
  });
};
