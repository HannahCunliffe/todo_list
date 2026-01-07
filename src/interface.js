export {
  displayPage,
  displayProjectList,
  displaySelectedProject,
  addProjectSelectionMethod,
};

import { projectsList } from "./projects";
import { Project } from "./projects";
import { ToDoItem } from "./projects";

import { populateStorage } from "./storage";

import plusIcon from "./assets/plus.svg";
import deleteIcon from "./assets/delete-filled-svgrepo-com.svg";

function displayPage() {
  //create general page sections and handle sidebar initial layout

  //run function to create modal used for page forms

  createPageModal();

  let contentContainer = document.createElement("div");

  contentContainer.id = "contentContainer";

  document.body.append(contentContainer);

  let sidebar = document.createElement("div");

  sidebar.id = "sidebar";

  contentContainer.append(sidebar);

  let pageContent = document.createElement("div");

  pageContent.id = "pageContent";

  contentContainer.append(pageContent);

  let projectsHeader = document.createElement("div");

  projectsHeader.id = "projectsHeader";

  let sideHeading = document.createElement("h2");

  sideHeading.textContent = "Projects";

  projectsHeader.append(sideHeading);

  let btnAddProject = document.createElement("button");

  btnAddProject.id = "btnAddProject";

  //add function to button for adding new project application logic

  btnAddProject.addEventListener("click", () => {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    createProjectForm();
  });

  let btnBackground = document.createElement("img");

  btnBackground.src = plusIcon;

  btnAddProject.append(btnBackground);

  projectsHeader.append(btnAddProject);

  sidebar.append(projectsHeader);
}

function displayProjectList() {
  let list = projectsList.list;

  const pageSidebar = document.getElementById("sidebar");

  //empty project container to prevent display errors

  let projectContainers = document.getElementsByClassName("projectContainer");

  while (projectContainers.length > 0) {
    projectContainers[0].remove();
  };

  let projectsDiv = document.createElement("div");

  projectsDiv.id = "projectsList";

  list.forEach((element) => {
    let numberOfTasks = 0;
    
    element.projectItems.forEach((item) => {
      if (item.completed == false) {
        numberOfTasks += 1;
      };
    });
    let projectContainer = document.createElement("div");
    projectContainer.classList.add("projectContainer");
    let projectTitle = document.createElement("h2");
    projectTitle.textContent = element.projectName;
    projectContainer.append(projectTitle);

    //add on click method to select project view
    addProjectSelectionMethod(projectContainer, element);

    //add display of currently uncompleted tasks for each project sidebar entry
    if (numberOfTasks > 0) {
      let taskCount = document.createElement("p");
      taskCount.textContent = `${numberOfTasks}`;
      taskCount.id = `taskCounter:${element.id}`;
      taskCount.classList.add("taskCounter");
      projectContainer.append(taskCount);
    };

    pageSidebar.append(projectContainer);
  });
}

function displaySelectedProject(project) {
  //locate container for section of page which will display projects
  let pageSection = document.getElementById("pageContent");

  //empty container to ensure that the display is starting from a blank page section
  while (pageSection.hasChildNodes() == true) {
    pageSection.firstChild.remove();
  }

  let projectHeading = document.createElement("h1");

  projectHeading.classList.add("projectHeading");

  projectHeading.id = project.id;

  projectHeading.textContent = project.projectName;

  pageSection.append(projectHeading);

  let tasksContainer = document.createElement("div");
  tasksContainer.id = "tasksContainer";

  //create button to add new project tasks
  let btnAddTask = document.createElement("button");

  btnAddTask.textContent = "Add ToDo";

  btnAddTask.id = "btnAddTask";

  //add function to display task form once button clicked

  btnAddTask.addEventListener("click", () => {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    createTaskForm();
  });

  tasksContainer.append(btnAddTask);

  project.projectItems.forEach((element) => {
    let taskContainer = document.createElement("div");
    taskContainer.id = element.id;
    taskContainer.classList.add("task");

    let checkbox = document.createElement("input");
    checkbox.id = "taskCheckbox";
    checkbox.setAttribute("type", "checkbox");

    //runs function to enable checkbox method for toggling task complete/incomplete
    addToggleTaskStatus(taskContainer, checkbox, element);

    //create separate div for checkbox and task content for page formatting purposes
    let checkboxDiv = document.createElement("div");
    checkboxDiv.id = "checkboxContainer";
    checkboxDiv.append(checkbox);

    let taskContent = document.createElement("div");
    taskContent.classList.add("taskContent");

    let taskTitle = document.createElement("h2");
    taskTitle.textContent = element.title;

    taskContent.append(taskTitle);

    let taskDescription = document.createElement("p");
    taskDescription.textContent = element.description;

    taskContent.append(taskDescription);

    //if there are notes present for the task, display them
    if (element.notes != "") {
      let heading = document.createElement("h4");
      heading.textContent = "Additional Notes:";
      let notes = document.createElement("p");
      notes.id = "taskNotes";
      notes.textContent = element.notes;

      taskContent.append(heading);
      taskContent.append(notes);
    }

    //add display of due-date
    let dueDate = document.createElement("div");
    let label = document.createElement("h4");
    label.textContent = "Due Date:";
    dueDate.append(label);
    let taskDate = document.createElement("p");
    taskDate.textContent = element.dueDate;
    dueDate.append(taskDate);

    taskContent.append(dueDate);

    //assign different colour styles depending on task priority
    if (element.priority == "Low") {
      taskContainer.classList.add("lowPriority");
    } else if (element.priority == "Medium") {
      taskContainer.classList.add("mediumPriority");
    } else if (element.priority == "High") {
      taskContainer.classList.add("highPriority");
    }

    //create delete button for task
    let deleteButton = document.createElement("p");
    let deleteBackground = document.createElement("img");
    deleteBackground.src = deleteIcon;
    deleteButton.append(deleteBackground);
    deleteButton.classList.add("btnDeleteTask");

    taskContainer.append(checkboxDiv);
    taskContainer.append(taskContent);
    taskContainer.append(deleteButton);
    tasksContainer.append(taskContainer);

    //apply delete function to each task delete button
    deleteButton.addEventListener("click", () => {
      let taskID = element.id;
      project.removeItem(taskID);
      //update storage with changed data
      populateStorage();
      displaySelectedProject(project);
      displayProjectList();
    });

    //check if task is marked completed and apply correct styling if so
    if (element.completed == true) {
      taskContainer.classList.add("taskComplete");
      checkbox.checked = true;
    };
  });

  pageSection.append(tasksContainer);
}

function addProjectSelectionMethod(container, element) {
  //adds click method to select project from page sidebar elements
  container.addEventListener("click", () => {
    displaySelectedProject(element);
  });
}

function addToggleTaskStatus(container, element, task) {
  //adds click method to toggle task status
  element.addEventListener("click", () => {
    if (container.classList.contains("taskComplete")) {
      container.classList.remove("taskComplete");
      //run function to keep sidebar task numbers correct
      updateTaskCounter(task, false);
      task.toggleCompleted(false);
    } else {
      container.classList.add("taskComplete");
      //run function to keep sidebar task numbers correct
      updateTaskCounter(task, true);
      task.toggleCompleted(true);
    };
      //update storage data
      populateStorage();
  });
}

function updateTaskCounter(task, taskStatus) {

  let currentProject = task.projectID;

  let counterToUpdate = document.getElementById(
    `taskCounter:${currentProject}`
  );

  let taskCount = Number(counterToUpdate.textContent);

  if (taskStatus == false) {
    taskCount += 1;
    //remove styling reserved for all tasks complete if currently applied
    counterToUpdate.classList.remove("allTasksComplete");
  } else {
    taskCount -= 1;
    //sets background of counter to green if no tasks remaining
    if (taskCount == 0) {
      counterToUpdate.classList.add("allTasksComplete");
    }
  }

  counterToUpdate.textContent = taskCount;
};

function createPageModal() {
  //create modal container
  let modal = document.createElement("div");

  modal.classList.add("modal");

  modal.id = "modal";

  //create modal content container

  let modalContent = document.createElement("div");

  let modalHeader = document.createElement("div");

  modalHeader.classList.add("modalHeader");

  modalContent.classList.add("modal-content");

  let closeSpan = document.createElement("span");

  closeSpan.classList.add("close");

  closeSpan.textContent = "x";

  modalHeader.append(closeSpan);

  let modalMainSection = document.createElement("div");

  modalMainSection.id = "modalMainSection";

  modalContent.append(modalHeader);

  modalContent.append(modalMainSection);

  modal.append(modalContent);

  //closes modal if user clicks outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //closes modal if close button is clicked
  closeSpan.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.body.append(modal);
}

function createProjectForm() {
  let formContainer = document.getElementById("modalMainSection");

  //removes any leftover elements that may already be in the section
  while (formContainer.hasChildNodes() == true) {
    formContainer.firstChild.remove();
  }

  let form = document.createElement("div");

  form.id = "formContainer";

  let nameLabel = document.createElement("label");

  nameLabel.textContent = "Project Name:";

  nameLabel.htmlFor = "projectName";

  let projectName = document.createElement("input");

  projectName.id = "projectName";

  projectName.type = "text";

  let btnSubmit = document.createElement("button");

  btnSubmit.textContent = "Create Project";

  btnSubmit.addEventListener("click", addProject);

  form.append(nameLabel, projectName, btnSubmit);

  formContainer.append(form);
}

function addProject() {
  let projectName = document.getElementById("projectName").value;

  //if project name is blank, display message that input is invalid and exit this function
  if (projectName == "") {
    //only create error message if one isn't already on the page
    if (document.getElementById("errorMessage") == null) {
      let errorMsg = document.createElement("p");
      errorMsg.id = "errorMessage";
      errorMsg.textContent = "Please enter a project name.";
      let parentContainer = document.getElementById("formContainer");
      parentContainer.append(errorMsg);
    }
  } else {
    //create new project using provided name

    let newProject = new Project(projectName);

    //add the new project to list for storage

    projectsList.addProject(newProject);

    //close modal since form is completed
    let modal = document.getElementById("modal");
    modal.style.display = "none";

    //update local storage with new project
    populateStorage();

    //refresh project display so it will update with the new project
    displayProjectList();

    //switches the page display over to the newly created project
    displaySelectedProject(newProject);
  }
}

function addTask() {
  //retrieve the id for the currently selected project from where it is saved on the page
  let projectID = document.getElementsByClassName("projectHeading")[0].id;

  //retrieve and check values from all form fields when submit clicked
  //check if required fields are filled, don't continue adding task if not filled

  let taskTitle = document.getElementById("taskTitle");
  let taskDescription = document.getElementById("taskDescription");
  let dueDate = document.getElementById("taskDate");
  let taskPriority = document.getElementById("taskPriority");
  let taskNotes = document.getElementById("taskNotes");

  let title = taskTitle.value;
  let description = taskDescription.value;
  let date = dueDate.value;
  let priority = taskPriority.value;
  let notes = taskNotes.value;

  //will not progress if task title, description and date fields are empty
  if (title != "" && description != "" && date != "") {
    //find selected project, and create new task using input information, then add to project
    let project = projectsList.findProjectByID(projectID);

    let newTask = new ToDoItem(title, description,  date, priority, notes, projectID);

    project.addItem(newTask);

    //update storage with new data
    populateStorage();
   
    //close modal since form is completed
    let modal = document.getElementById("modal");
    modal.style.display = "none";

    //refresh task display so it will update with the new task
    displaySelectedProject(project);
    //refresh project list to update task counter
    displayProjectList();
  } else {
    //remove pre-existing error messages so they're not displayed if
    //the fields have since been filled in
    let titleError = document.getElementById("titleError");
    let descriptionError = document.getElementById("descriptionError");
    let dateError = document.getElementById("dateError");

    if (titleError != null) {
      titleError.remove();
    };

    if (descriptionError != null) {
      descriptionError.remove();
    };

    if (dateError != null) {
      dateError.remove();
    };

    //add error messages to inform user of unfilled required fields
    if (title == "") {
      if (document.getElementById("titleError") == null) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Task must have a title";
        errorMessage.classList.add("errorMessage");
        errorMessage.id = "titleError";
        taskTitle.after(errorMessage);
      };
    };

    if (description == "") {
      if (document.getElementById("descriptionError") == null) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Task must have a description";
        errorMessage.classList.add("errorMessage");
        errorMessage.id = "descriptionError";
        taskDescription.after(errorMessage);
      };
    };

    if (date == "") {
      if (document.getElementById("dateError") == null) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Task must have a due date";
        errorMessage.classList.add("errorMessage");
        errorMessage.id = "dateError";
        dueDate.after(errorMessage);
      };
    };
  };
};

function createTaskForm() {
  let formContainer = document.getElementById("modalMainSection");

  //removes any leftover elements that may already be in the section
  while (formContainer.hasChildNodes() == true) {
    formContainer.firstChild.remove();
  }

  //create input form and appropriate fields to add a new task

  let form = document.createElement("div");

  form.id = "formContainer";

  let nameLabel = document.createElement("label");

  nameLabel.textContent = "Task Title:";

  nameLabel.htmlFor = "taskTitle";

  let taskTitle = document.createElement("input");

  taskTitle.id = "taskTitle";

  taskTitle.required = true;

  taskTitle.type = "text";

  let descriptionLabel = document.createElement("label");

  descriptionLabel.textContent = "Description:";

  descriptionLabel.htmlFor = "taskDescription";

  let taskDescription = document.createElement("textarea");

  taskDescription.inputMode = "text";

  taskDescription.id = "taskDescription";

  taskDescription.rows = 6;

  let dateLabel = document.createElement("label");

  dateLabel.textContent = "Due Date:";

  dateLabel.htmlFor = "taskDate";

  let taskDate = document.createElement("input");

  taskDate.type = "date";

  taskDate.id = "taskDate";

  let priorityLabel = document.createElement("label");

  priorityLabel.textContent = "Priority:";

  priorityLabel.htmlFor = "taskPriority";

  let taskPriority = document.createElement("select");

  taskPriority.id = "taskPriority";

  let lowPriority = document.createElement("option");

  lowPriority.textContent = "Low";

  let mediumPriority = document.createElement("option");

  mediumPriority.textContent = "Medium";

  let highPriority = document.createElement("option");

  highPriority.textContent = "High";

  taskPriority.add(lowPriority);
  taskPriority.add(mediumPriority);
  taskPriority.add(highPriority);

  let labelNotes = document.createElement("label");

  labelNotes.textContent = "Notes:";

  labelNotes.htmlFor = "taskNotes";

  let taskNotes = document.createElement("textarea");

  taskNotes.id = "taskNotes";

  taskNotes.rows = 4;

  let btnSubmit = document.createElement("button");

  btnSubmit.textContent = "Create Task";

  btnSubmit.addEventListener("click", addTask);

  form.append(
    nameLabel,
    taskTitle,
    descriptionLabel,
    taskDescription,
    dateLabel,
    taskDate,
    priorityLabel,
    taskPriority,
    labelNotes,
    taskNotes,
    btnSubmit
  );

  formContainer.append(form);
};
