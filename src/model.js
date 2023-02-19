export const projectObjectFactory = () => ({
  id: +new Date().getTime().toString().slice(5),
  title: "New Project",
  notes: "Notes",
  dueDate: "",
  priority: "",
});

export const todoObjectFactory = (projectId) => ({
  id: `${projectId}: ${+new Date().getTime().toString().slice(5)}`,
  title: "New Todo",
  notes: "Notes",
  dueDate: "",
  priority: "",
});

export const editedObject = (id, title, notes, dueDate, priority) => ({
  id,
  title,
  notes,
  dueDate,
  priority,
});

const PROJECT_ARRAY = () => {
  const projects = [];
  const setProject = (project) => {
    projects.push(project);
  };
  const updateProject = (index, project) => projects.splice(index, 1, project);
  const getIndex = (datasetId) =>
    projects.findIndex((project) => project.id === +datasetId);
  const getById = (id) => projects.filter((project) => project.id === id);
  const getProjects = () => projects;
  const deleteProject = (index) => projects.splice(index, 1);
  return {
    setProject,
    updateProject,
    getIndex,
    getById,
    getProjects,
    deleteProject,
  };
};

const TODO_ARRAY = () => {
  const todos = [];
  const setTodo = (todo) => {
    todos.push(todo);
  };
  const updateTodo = (index, todo) => todos.splice(index, 1, todo);
  const getIndex = (datasetId) =>
    todos.findIndex((todo) => todo.id === datasetId);
  const getById = (id) => todos.filter((todo) => todo.id === id);
  const getTodos = () => todos;
  const deleteTodo = (index) => todos.splice(index, 1);
  return {setTodo, updateTodo, getIndex, getById, getTodos, deleteTodo};
};

export const projectArray = PROJECT_ARRAY();
export const todoArray = TODO_ARRAY();

export const setOriginalProject = () => {
  const keys = Object.keys(localStorage);
  if (keys.includes("projects") === false) {
    const project = projectObjectFactory();
    projectArray.setProject(project);
    localStorage.setItem(
      `projects`,
      JSON.stringify(projectArray.getProjects())
    );
    return project;
  }
};

export const getLocalProject = (storageKey, datasetId) => {
  const storedArray = JSON.parse(localStorage.getItem(storageKey));
  for (let project of storedArray) {
    if (project.id === datasetId) {
      return project;
    }
  }
};
export const getLocalTodos = (storageKey, datasetId) => {
  const storedArray = JSON.parse(localStorage.getItem(storageKey));
  const todoArray = [];
  for (let todo of storedArray) {
    if (todo.id.match(datasetId) !== null) {
      todoArray.push(todo);
    }
  }
  return todoArray.flat();
};

export const restoreProjectArray = () => {
  const storedArray = JSON.parse(localStorage.getItem("projects"));
  for (let project of storedArray) {
    projectArray.setProject(project);
  }
};

export const restoreTodoArray = () => {
  const keys = Object.keys(localStorage);
  if (keys.includes("todos")) {
    const storedArray = JSON.parse(localStorage.getItem("todos"));
    for (let todo of storedArray) {
      todoArray.setTodo(todo);
    }
  }
};

export const storeChecked = (() => {
  const set = (id) => {
    localStorage.setItem(id, id);
  };
  const deleteItem = (id) => localStorage.removeItem(id);
  return {set, deleteItem};
})();
