export { storageAvailable, populateStorage, loadStorage };

import { projectsList,Project, ToDoItem } from "./projects";

//check if localstorage is supported and available
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function populateStorage() {

  //clear previous storage before saving
  localStorage.clear();

  //create classes for the data to be stored
  class ToDoItem {
    constructor(
      id,
      title,
      description,
      dueDate,
      priority,
      notes,
      completed,
      projectID
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.completed = completed;
      this.projectID = projectID;
    };
  };

  class Project {
    constructor(name, id) {
      this.projectName = name;
      this.id = id;
    };
  };

  //arrays to store class data prior to json conversion
  let toDoItem = [];
  let projects = [];

  //extract data only from the projects list
  let currentProjectList = projectsList.list;

  currentProjectList.forEach((element) => {
    let project = new Project(element.projectName, element.id);
    projects.push(project);
    //iterate through each projects items to retrieve data
    element.projectItems.forEach((item) => {
      let todo = new ToDoItem(
        item.id,
        item.title,
        item.description,
        item.dueDate,
        item.priority,
        item.notes,
        item.completed,
        item.projectID
      );
      toDoItem.push(todo)
    });
  });

  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("tasks", JSON.stringify(toDoItem));
};

function loadStorage() {

  //clear project list to avoid erroneous data being included
  projectsList.list = []

  //retrieve and convert to objects stored project and task data

  let storedProjects = JSON.parse(localStorage.getItem("projects"));
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
 
  storedProjects.forEach((project) => {
    //convert stored project back to a project object
    let newProject = new Project(project.projectName);
    //set project id to match the stored project ID
    newProject.id = project.id;
  
    //let projectTasks = storedTasks.from((task) => task.projectID == project.id);
    storedTasks.forEach((task) => {
        if (task.projectID == project.id) {
            let newTask = new ToDoItem(task.title, task.description, task.dueDate, task.priority, task.notes, task.projectID);
            newTask.id = task.id;
            newTask.completed = task.completed;
            newProject.addItem(newTask);
        };
    });

    projectsList.addProject(newProject);
  });
};
