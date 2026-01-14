import "./styles.css";
import { ToDoItem, Project, projectsList } from "./projects";
import {
  displayPage,
  displayProjectList,
  displaySelectedProject,
} from "./interface";
import { loadStorage, populateStorage, storageAvailable } from "./storage";

function pageInit() {
  let currentDate = new Date().toDateString();

  //initialise example projects

  let defaultProject = new Project("Default Project");

  let defaultProject2 = new Project("Default Project 2");

  let exampleItem = new ToDoItem(
    "example-title",
    "to-do item description",
    currentDate,
    "Low",
    "notes notes notes",
    defaultProject.id
  );

  //second example item has no notes included
  let exampleItem2 = new ToDoItem(
    "example-title 2",
    "to-do item description",
    currentDate,
    "Medium",
    "",
    defaultProject.id
  );

  let exampleItem3 = new ToDoItem(
    "example-title 3",
    "item description for item 3",
    currentDate,
    "High",
    "notes about this particular item",
    defaultProject.id
  );

  let exampleItem4 = new ToDoItem(
    "example-title 4",
    "item description for item 4",
    currentDate,
    "High",
    "notes about this particular item",
    defaultProject2.id
  );

  defaultProject.addItem(exampleItem);
  defaultProject.addItem(exampleItem2);
  defaultProject.addItem(exampleItem3);

  projectsList.addProject(defaultProject);

  projectsList.addProject(defaultProject2);

  defaultProject2.addItem(exampleItem4);

  exampleItem2.toggleCompleted();

  displayPage();

  displayProjectList();

  displaySelectedProject(defaultProject);
  
};

function loadPage() {
  //pick first project on the list to display by default
  let defaultProject = projectsList.list[0];
  
  displayPage();
  displayProjectList();
  displaySelectedProject(defaultProject);
};

//check if local storage is available, proceed with using it if it is,
// if not proceed with just loading the page with default data

if (storageAvailable("localStorage")) {
  //check if storage exists, if it does, do not add the default project data
  if (!localStorage.getItem("projects")) {
    pageInit();
    populateStorage();
  } else {
    loadStorage();
    loadPage();
  }
} else {
  console.log("Local storage not available");
  pageInit();
};
