export {
  displayPage,
  displayProjectList,
  displaySelectedProject,
  addProjectSelectionMethod,
};

import { projectsList } from "./projects";

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
  });

  let btnBackground = document.createElement("img");

  btnBackground.src = plusIcon;

  btnAddProject.append(btnBackground);

  projectsHeader.append(btnAddProject);

  sidebar.append(projectsHeader);
};

function displayProjectList() {
  let list = projectsList.list;

  const pageSidebar = document.getElementById("sidebar");

  let projectsDiv = document.createElement("div");

  projectsDiv.id = "projectsList";

  list.forEach((element) => {
    //return to this and update it to filter by only incomplete tasks first
    let numberOfTasks = element.projectItems.length;
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
    }

    pageSidebar.append(projectContainer);
  });
}

function displaySelectedProject(project) {
  //locate container for section of page which will display projects
  let pageSection = document.getElementById("pageContent");

  //empty container to ensure that the display is starting from a blank page section
  while (pageSection.hasChildNodes() == true) {
    pageSection.firstChild.remove();
  };

  let projectHeading = document.createElement("h1");

  projectHeading.id = "projectHeading";

  //let currentProject = projectsList.findProjectByName(projectName);

  projectHeading.textContent = project.projectName;

  pageSection.append(projectHeading);

  let tasksContainer = document.createElement("div");
  tasksContainer.id = "tasksContainer";

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

    if (element.notes != null) {
      let heading = document.createElement("h4");
      heading.textContent = "Additional Notes:";
      let notes = document.createElement("p");
      notes.id = "taskNotes";
      notes.textContent = element.notes;

      taskContent.append(heading);
      taskContent.append(notes);
    }

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

    //check if task is marked completed and apply correct styling if so
    if (element.completed == true) {
      taskContainer.classList.add("taskComplete");
      checkbox.checked = true;
    }
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
      updateTaskCounter(task, "incomplete");
      task.toggleCompleted(false);
    } else {
      container.classList.add("taskComplete");
      //run function to keep sidebar task numbers correct
      updateTaskCounter(task, "complete");
      task.toggleCompleted(true);
    }
  });
};

function updateTaskCounter(task, taskStatus) {
  let currentProject = task.projectID;

  let counterToUpdate = document.getElementById(
    `taskCounter:${currentProject}`
  );

  let taskCount = Number(counterToUpdate.textContent);

  if (taskStatus == "incomplete") {
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

  let content = document.createElement("p");

  content.textContent = "some text in the modal";

  modalContent.append(modalHeader);

  modalContent.append(content);

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
};
