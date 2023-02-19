import "./styles.css";
import {
  projectObjectFactory,
  todoObjectFactory,
  editedObject,
  projectArray,
  todoArray,
  getLocalTodos,
  getLocalProject,
  setOriginalProject,
  restoreProjectArray,
  restoreTodoArray,
  storeChecked,
} from "./model";

import {
  setProjectDisplay,
  setNavListItem,
  setTodoDisplay,
  clearTodos,
  clearProject,
  editTitleField,
  updateTitleDisplay,
  editNotesField,
  updateNotesDisplay,
  editTodoTitle,
  editTodoNotes,
  updateTodoTitleDisplay,
  updateTodoNotesDisplay,
  updateNavDisplay,
} from "./view";

const renderOriginalProject = () => {
  if (setOriginalProject() !== undefined) {
    const project = setOriginalProject();
    setProjectDisplay(project);
  }
};

const renderFirstProject = () => {
  const localProjectArray = JSON.parse(localStorage.getItem("projects"));
  const firstProject = localProjectArray[0];
  setProjectDisplay(firstProject);
};

const renderProject = (datasetId) => {
  const project = getLocalProject("projects", datasetId);
  setProjectDisplay(project);
};

const renderNavList = () => {
  const localProjectArray = JSON.parse(localStorage.getItem("projects"));
  for (let project of localProjectArray) {
    setNavListItem(project);
  }
};

const renderFirstTodos = () => {
  const localProjectArray = JSON.parse(localStorage.getItem("projects"));
  const firstProject = localProjectArray[0];
  const keys = Object.keys(localStorage);
  if (keys.includes("todos")) {
    const tArray = getLocalTodos("todos", firstProject.id);
    for (let todo of tArray) setTodoDisplay(todo);
  }
};

const renderTodos = (datasetId) => {
  const keys = Object.keys(localStorage);
  if (keys.includes("todos")) {
    const tArray = getLocalTodos("todos", datasetId);
    for (let todo of tArray) setTodoDisplay(todo);
  }
};

const renderProjectStrikethrough = () => {
  const project = document.querySelector(`.project`);
  const dataId = project.dataset.id;
  const checkbox = document.querySelector(
    `.${project.className}[data-id="${dataId}"] input[type="checkbox"]`
  );
  if (dataId !== localStorage.getItem(dataId)) {
    !checkbox.checked;
    const allChildren = document.querySelectorAll(
      `.${project.className}[data-id="${dataId}"] *`
    );
    for (let child of allChildren) {
      child.style.textDecoration = "default";
    }
  } else if (dataId === localStorage.getItem(dataId)) {
    checkbox.checked = true;
    const allChildren = document.querySelectorAll(
      `.${project.className}[data-id="${dataId}"] *`
    );
    for (let child of allChildren) {
      child.style.textDecoration = "line-through";
    }
  }
};

const renderTodoStrikethrough = () => {
  const keys = Object.keys(localStorage);
  if (keys.includes("todos")) {
    const todos = document.querySelectorAll(`.todo`);
    for (let todo of todos) {
      const dataId = todo.dataset.id;
      const checkbox = document.querySelector(
        `.${todo.className}[data-id="${dataId}"] input[type="checkbox"]`
      );
      if (dataId === localStorage.getItem(dataId)) {
        checkbox.checked = true;
        const allChildren = document.querySelectorAll(
          `.${todo.className}[data-id="${dataId}"] *`
        );
        for (let child of allChildren) {
          child.style.textDecoration = "line-through";
        }
      }
    }
  }
};

document.addEventListener("load", renderOriginalProject);
document.addEventListener("load", renderNavList);

const renderDisplay = () => {
  const keys = Object.keys(localStorage);
  if (keys.includes("projects") === true) {
    renderNavList();
    restoreProjectArray();
    restoreTodoArray();
    renderFirstProject();
    renderFirstTodos();
    renderProjectStrikethrough();
    renderTodoStrikethrough();
  }
};

document.addEventListener("DOMContentLoaded", renderDisplay);
// document.addEventListener("DOMContentLoaded", renderProjectStrikethrough);
// document.addEventListener("DOMContentLoaded", renderTodoStrikethrough);

const loadSelectedProject = (e) => {
  const navListItems = document.querySelectorAll(".nav-list-item");
  for (let listItem of navListItems) {
    if (e.target === listItem) {
      clearProject();
      renderProject(+listItem.dataset.id);
      renderProjectStrikethrough();
      clearTodos();
      renderTodos(listItem.dataset.id);
      renderTodoStrikethrough();
    }
  }
};

document.addEventListener("click", loadSelectedProject);

const newTodoButton = (() => {
  const button = document.querySelector(".new-todo-button");
  button.addEventListener("click", () => {
    const project = document.querySelector(".project");
    const todo = todoObjectFactory(project.dataset.id);
    setTodoDisplay(todo);
    todoArray.setTodo(todo);
    localStorage.setItem(`todos`, JSON.stringify(todoArray.getTodos()));
  });
})();

const newProjectButton = (() => {
  const button = document.querySelector(".new-project-button");
  button.addEventListener("click", () => {
    clearProject();
    clearTodos();
    const project = projectObjectFactory();
    setProjectDisplay(project);
    setNavListItem(project);
    projectArray.setProject(project);
    localStorage.setItem(
      `projects`,
      JSON.stringify(projectArray.getProjects())
    );
  });
})();

const updateLocalTodo = (object) => {
  const todoElements = document.querySelectorAll(
    `[data-id="${object.dataset.id}"]`
  );
  const todo = todoElements[0];
  const title = todoElements[1].textContent;
  const notes = todoElements[2].textContent;
  const dueDate = todoElements[3].value;
  const priority = todoElements[4].value;
  const todoObject = editedObject(
    todo.dataset.id,
    title,
    notes,
    dueDate,
    priority
  );
  const foundTodo = todoArray.getById(todoObject.id)[0];
  const foundIndex = todoArray.getIndex(todoObject.id);
  foundTodo.id = todoObject.id;
  foundTodo.title = todoObject.title;
  foundTodo.notes = todoObject.notes;
  foundTodo.dueDate = todoObject.dueDate;
  foundTodo.priority = todoObject.priority;
  todoArray.updateTodo(foundIndex, foundTodo);
  const arrayString = JSON.stringify(todoArray.getTodos());
  localStorage.setItem(`todos`, arrayString);
};

const updateLocalProject = () => {
  const project = document.querySelector(".project");
  const projectId = project.dataset.id;
  const title = document.querySelector(".project-title").textContent;
  const notes = document.querySelector(".project-notes").textContent;
  const dueDate = document.querySelector(
    `input[list="project-due-dates"]`
  ).value;
  const priority = document.querySelector(
    `input[list="project-priorities"]`
  ).value;
  const projectObject = editedObject(
    +projectId,
    title,
    notes,
    dueDate,
    priority
  );
  const foundProject = projectArray.getById(projectObject.id)[0];
  const foundIndex = projectArray.getIndex(projectObject.id);
  foundProject.id = projectObject.id;
  foundProject.title = projectObject.title;
  foundProject.notes = projectObject.notes;
  foundProject.dueDate = projectObject.dueDate;
  foundProject.priority = projectObject.priority;
  projectArray.updateProject(foundIndex, foundProject);
  const arrayString = JSON.stringify(projectArray.getProjects());
  localStorage.setItem(`projects`, arrayString);
};

const projectEditButton = (() => {
  const button = document.querySelector(".project-edit-button");
  const dueDate = document.querySelector(`input[list="project-due-dates"]`);
  const priority = document.querySelector(`input[list="project-priorities"]`);
  button.addEventListener("click", () => {
    if (button.textContent === "Edit Project") {
      editTitleField("project");
      editNotesField("project");
      dueDate.disabled = false;
      priority.disabled = false;
      button.textContent = "Finish";
    } else if (button.textContent === "Finish") {
      updateNotesDisplay("project");
      updateTitleDisplay("project");
      updateNavDisplay();
      updateLocalProject();
      dueDate.disabled = true;
      priority.disabled = true;
      button.textContent = "Edit Project";
    }
  });
})();

const deleteProjectButton = (() => {
  const button = document.querySelector(".project-delete-button");
  button.addEventListener("click", () => {
    const project = document.querySelector(`.project`);
    const dataId = project.dataset.id;
    clearProject();
    const foundIndex = projectArray.getIndex(dataId);
    projectArray.deleteProject(foundIndex);
    const arrayString = JSON.stringify(projectArray.getProjects());
    localStorage.setItem(`projects`, arrayString);
  });
})();

const todoEditButtons = (e) => {
  const buttons = document.querySelectorAll(".todo-edit-button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i] === e.target) {
      const thisTodo = buttons[i].parentElement.parentElement;
      const dataId = thisTodo.dataset.id;
      const dueDate = document.querySelector(
        `.${thisTodo.className}[data-id="${dataId}"] input[list="todo-due-dates"]`
      );
      const priority = document.querySelector(
        `.${thisTodo.className}[data-id="${dataId}"] input[list="todo-priorities"]`
      );
      if (buttons[i].textContent === "Edit") {
        editTodoNotes(thisTodo);
        editTodoTitle(thisTodo);
        dueDate.disabled = false;
        priority.disabled = false;
        buttons[i].textContent = "Finish";
      } else if (buttons[i].textContent === "Finish") {
        updateTodoNotesDisplay(thisTodo);
        updateTodoTitleDisplay(thisTodo);
        updateLocalTodo(thisTodo);
        dueDate.disabled = true;
        priority.disabled = true;
        buttons[i].textContent = "Edit";
      }
    }
  }
};
document.addEventListener("click", todoEditButtons);

const todoDeleteButtons = (e) => {
  const buttons = document.querySelectorAll(".todo-delete-button");
  const todoContent = document.querySelector(".todo-container");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i] === e.target) {
      const thisTodo = buttons[i].parentElement.parentElement;
      const dataId = thisTodo.dataset.id;
      todoContent.remove(
        document.querySelector(`.${thisTodo.className}[data-id="${dataId}"]`)
      );
      const foundIndex = todoArray.getIndex(dataId);
      todoArray.deleteTodo(foundIndex);
      const arrayString = JSON.stringify(todoArray.getTodos());
      localStorage.setItem(`todos`, arrayString);
    }
  }
};
document.addEventListener("click", todoDeleteButtons);

const removeStrikeThrough = (e) => {
  if (e.target.matches(`input[type="checkbox"]`) && !e.target.checked) {
    e.target.checked;
    const sourceElement = e.target.parentElement.parentElement.parentElement;
    const dataId = sourceElement.dataset.id;
    const allChildren = document.querySelectorAll(
      `.${sourceElement.className}[data-id="${dataId}"] *`
    );
    storeChecked.deleteItem(dataId);
    for (let child of allChildren) {
      child.style.textDecoration = "inherit";
    }
  }
};

const addStrikeThrough = (e) => {
  if (e.target.matches(`input[type="checkbox"]`) && e.target.checked) {
    !e.target.checked;
    const sourceElement = e.target.parentElement.parentElement.parentElement;
    const dataId = sourceElement.dataset.id;
    const allChildren = document.querySelectorAll(
      `.${sourceElement.className}[data-id="${dataId}"] *`
    );
    storeChecked.set(dataId);
    for (let child of allChildren) {
      child.style.textDecoration = "line-through";
    }
  }
};
document.addEventListener("click", removeStrikeThrough);
document.addEventListener("click", addStrikeThrough);
