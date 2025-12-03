import "./styles.css";
import { ToDoItem, Project , projectsList} from "./projects";
import { displayPage, displayProjectList, displaySelectedProject } from "./interface";

function pageInit() {
  let currentDate = new Date().toLocaleDateString();

  //initialise example projects

  let defaultProject = new Project("Default Project");

  let defaultProject2 = new Project("Default Project 2");

  let exampleItem = new ToDoItem(
    "example-title",
    "to-do item description",
    currentDate,
    "Low",
    "notes notes notes",
    defaultProject.id,
  );

  //second example item has no notes included
   let exampleItem2 = new ToDoItem(
    "example-title 2",
    "to-do item description",
    currentDate,
    "Medium",
    null,
    defaultProject.id,
  );

  let exampleItem3 = new ToDoItem(
    "example-title 3",
    "item description for item 3",
    currentDate,
    "High",
    "notes about this particular item",
    defaultProject.id,
  );

   let exampleItem4 = new ToDoItem(
    "example-title 4",
    "item description for item 4",
    currentDate,
    "High",
    "notes about this particular item",
    defaultProject2.id,
  )



  defaultProject.addItem(exampleItem);
  defaultProject.addItem(exampleItem2);
  defaultProject.addItem(exampleItem3);

  projectsList.addProject(defaultProject);

  projectsList.addProject(defaultProject2);

  defaultProject2.addItem(exampleItem4);

  exampleItem2.toggleCompleted();

  displayPage();

  displayProjectList(projectsList.list);

  displaySelectedProject(defaultProject);
  
};

pageInit();
