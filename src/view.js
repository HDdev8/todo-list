export const setProjectDisplay = (object) => {
  const project = document.querySelector(".project");
  const title = document.querySelector(".project-title");
  const notes = document.querySelector(".project-notes");
  const dueDate = document.querySelector(`input[list="project-due-dates"]`);
  const priority = document.querySelector(`input[list="project-priorities"]`);
  project.dataset.id = object.id;
  title.dataset.id = object.id;
  notes.dataset.id = object.id;
  dueDate.dataset.id = object.id;
  priority.dataset.id = object.id;
  title.textContent = object.title;
  notes.textContent = object.notes;
  dueDate.value = object.dueDate;
  priority.value = object.priority;
};

export const setNavListItem = (object) => {
  const fragment = document.createDocumentFragment();
  const list = document.querySelector(".nav-list");
  let listItem = document.createElement("li");
  listItem.className = "nav-list-item";
  listItem.dataset.id = object.id;
  listItem.textContent = object.title;
  fragment.appendChild(listItem);
  list.appendChild(fragment);
};

export const updateNavDisplay = () => {
  const listItems = document.querySelectorAll(".nav-list-item");
  const project = document.querySelector(".project");
  const title = document.querySelector(".project-title");
  for (let item of listItems) {
    if (+item.dataset.id === +project.dataset.id) {
      item.textContent = title.textContent;
    }
  }
};

export const setTodoDisplay = (object) => {
  const todoContent = document.querySelector(".todo-container");
  const fragment = document.createDocumentFragment();
  const todo = document.createElement("div");
  const topRow = document.createElement("div");
  const checkboxDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const checkboxLabel = document.createElement("label");
  const titleDiv = document.createElement("div");
  const titleText = document.createElement("p");
  const notesDiv = document.createElement("div");
  const notesText = document.createElement("p");
  const dueDateDiv = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  const dueDate = document.createElement("input");
  const dueDateDatalist = document.createElement("datalist");
  const priorityDiv = document.createElement("div");
  const priorityLabel = document.createElement("label");
  const priority = document.createElement("input");
  const priorityDatalist = document.createElement("datalist");
  const priorityOption1 = document.createElement("option");
  const priorityOption2 = document.createElement("option");
  const priorityOption3 = document.createElement("option");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  todo.appendChild(topRow).className = "todo-top-row";
  topRow.appendChild(checkboxDiv).className = "todo-checkbox-div";
  checkboxDiv.appendChild(checkbox);
  checkboxDiv.appendChild(checkboxLabel);
  topRow.appendChild(titleDiv).className = "todo-title-div";
  topRow.appendChild(editButton).className = "todo-edit-button";
  topRow.appendChild(deleteButton).className = "todo-delete-button";
  editButton.type = "button";
  editButton.textContent = "Edit";
  deleteButton.type = "button";
  deleteButton.textContent = "ⓧ";
  todo.appendChild(notesDiv).className = "todo-notes-div";
  todo.appendChild(dueDateDiv).className = "todo-due-date-div";
  dueDateDiv.appendChild(dueDateLabel);
  dueDateDiv.appendChild(dueDate);
  dueDateDiv.appendChild(dueDateDatalist);
  todo.appendChild(priorityDiv).className = "todo-priority-div";
  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(priority);
  priorityDiv.appendChild(priorityDatalist);
  titleDiv.appendChild(titleText);
  titleText.className = "todo-title";
  notesDiv.appendChild(notesText);
  notesText.className = "todo-notes";
  checkbox.type = "checkbox";
  checkbox.id = "todo-checkbox";
  checkbox.name = "todo-checkbox";
  checkboxLabel.setAttribute("for", "todo-checkbox");
  dueDate.type = "date";
  dueDate.setAttribute("list", "todo-due-dates");
  dueDate.id = "todo-due-date";
  dueDate.name = "todo-due-date";
  dueDate.disabled = true;
  dueDateLabel.setAttribute("for", "todo-due-date");
  dueDateDatalist.id = "todo-due-dates";
  priority.id = "todo-priority";
  priority.name = "todo-priority";
  priority.disabled = true;
  priority.setAttribute("list", "todo-priorities");
  priorityLabel.setAttribute("for", "todo-priority");
  priorityDatalist.id = "todo-priorities";
  priorityOption1.setAttribute("value", "Low");
  priorityOption2.setAttribute("value", "Medium");
  priorityOption3.setAttribute("value", "High");
  priorityDatalist.appendChild(priorityOption1);
  priorityDatalist.appendChild(priorityOption2);
  priorityDatalist.appendChild(priorityOption3);
  todo.className = "todo";
  todo.dataset.id = object.id;
  titleText.dataset.id = object.id;
  notesText.dataset.id = object.id;
  dueDate.dataset.id = object.id;
  priority.dataset.id = object.id;
  titleText.textContent = object.title;
  notesText.textContent = object.notes;
  dueDateLabel.textContent = `Due Date: `;
  priorityLabel.textContent = `Priority: `;
  dueDate.value = object.dueDate;
  priority.value = object.priority;
  topRow.addEventListener("dblclick", () =>
    todo.classList.toggle("todo-small")
  );
  fragment.appendChild(todo);
  todoContent.appendChild(fragment);
};

export const editTitleField = (element) => {
  const titleDiv = document.querySelector(`.${element}-title-div`);
  const titleText = document.querySelector(`.${element}-title`);
  let titleText2 = document.createElement("p");
  let area = document.createElement("textarea");
  area.setAttribute("maxlength", "45");
  area.className = `${element}-title-edit`;
  area.dataset.id = titleText.dataset.id;
  area.value = titleText.innerText;
  area.placeholder = area.value;
  titleDiv.replaceChild(area, titleText);
  area.focus();
};

export const editNotesField = (element) => {
  const notesDiv = document.querySelector(`.${element}-notes-div`);
  const notesText = document.querySelector(`.${element}-notes`);
  let area = document.createElement("textarea");
  area.className = `${element}-notes-edit`;
  area.dataset.id = notesText.dataset.id;
  area.value = notesText.innerText;
  area.placeholder = area.value;
  notesDiv.replaceChild(area, notesText);
  area.focus();
};

export const updateTitleDisplay = (element) => {
  const titleDiv = document.querySelector(`.${element}-title-div`);
  const area = document.querySelector(`.${element}-title-div > textarea`);
  let titleText = document.createElement("p");
  titleText.className = `${element}-title`;
  titleText.dataset.id = area.dataset.id;
  titleText.innerText = area.value;
  titleDiv.appendChild(area);
  titleDiv.replaceChild(titleText, area);
};

export const updateNotesDisplay = (element) => {
  const notesDiv = document.querySelector(`.${element}-notes-div`);
  let area = document.querySelector(`.${element}-notes-div > textarea`);
  let notesText = document.createElement("p");
  notesText.className = `${element}-notes`;
  notesText.dataset.id = area.dataset.id;
  notesText.innerText = area.value;
  notesDiv.appendChild(area);
  notesDiv.replaceChild(notesText, area);
};

export const clearTodos = () => {
  const todoContent = document.querySelector(".todo-container");
  todoContent.replaceChildren();
};

export const clearProject = () => {
  const project = document.querySelector(".project");
  const title = document.querySelector(".project-title");
  const notes = document.querySelector(".project-notes");
  const dueDate = document.querySelector(`input[list="project-due-dates"]`);
  const priority = document.querySelector(`input[list="project-priorities"]`);
  const checkbox = document.querySelector(`.project input[type="checkbox"]`);
  const projectAll = document.querySelectorAll(`.project *`);
  for (let a of projectAll) {
    a.style.textDecoration = "inherit";
  }
  checkbox.checked = false;
  project.dataset.id = "";
  title.dataset.id = "";
  notes.dataset.id = "";
  dueDate.dataset.id = "";
  priority.dataset.id = "";
  title.textContent = "";
  notes.textContent = "";
  dueDate.value = "";
  priority.value = "";
};

export const editTodoTitle = (element) => {
  const titleDiv = element.childNodes[0].childNodes[1];
  const titleText = element.childNodes[0].childNodes[1].childNodes[0];
  let titleText2 = document.createElement("p");
  let area = document.createElement("textarea");
  area.setAttribute("maxlength", "45");
  area.className = `todo-title-edit`;
  area.dataset.id = titleText.dataset.id;
  area.value = titleText.innerText;
  area.placeholder = area.value;
  titleDiv.replaceChild(area, titleText);
  area.focus();
};

export const updateTodoTitleDisplay = (element) => {
  const titleDiv = element.childNodes[0].childNodes[1];
  let area = document.querySelector(`.todo-title-edit`);
  let titleText = document.createElement("p");
  titleText.className = `todo-title`;
  titleText.dataset.id = area.dataset.id;
  titleText.innerText = area.value;
  titleDiv.appendChild(area);
  titleDiv.replaceChild(titleText, area);
};

export const editTodoNotes = (element) => {
  const thisTodoElements = document.querySelector(
    `[data-id="${element.dataset.id}"]`
  );
  const notesDiv = element.childNodes[1];
  const notesText = element.childNodes[1].childNodes[0];
  let area = document.createElement("textarea");
  area.className = `todo-notes-edit`;
  area.dataset.id = notesText.dataset.id;
  area.value = notesText.innerText;
  area.placeholder = area.value;
  notesDiv.replaceChild(area, notesText);
  area.focus();
};

export const updateTodoNotesDisplay = (element) => {
  const thisTodoElements = document.querySelector(
    `[data-id="${element.dataset.id}"]`
  );
  const notesDiv = element.childNodes[1];
  let area = document.querySelector(`.todo-notes-edit`);
  let notesText = document.createElement("p");
  notesText.className = `todo-notes`;
  notesText.dataset.id = area.dataset.id;
  notesText.innerText = area.value;
  notesDiv.appendChild(area);
  notesDiv.replaceChild(notesText, area);
};
