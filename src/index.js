import "./styles.css";
import { ToDoItem, Project , projectsList} from "./projects";
import { displayPage, displayProjectList, displaySelectedProject } from "./interface";

function pageInit() {
  let currentDate = new Date().toLocaleDateString();

  let exampleItem = new ToDoItem(
    "example-title",
    "to-do item description",
    currentDate,
    "Low",
    "notes notes notes"
  );


  //second example item has no notes included
   let exampleItem2 = new ToDoItem(
    "example-title 2",
    "to-do item description",
    currentDate,
    "Medium",
  );

  let exampleItem3 = new ToDoItem(
    "example title 3",
    "item description for item 3",
    currentDate,
    "High",
    "notes about this particular item"
  )

  let defaultProject = new Project("Default Project");

  defaultProject.addItem(exampleItem);
  defaultProject.addItem(exampleItem2);
  defaultProject.addItem(exampleItem3);

  projectsList.addProject(defaultProject);

  let defaultProject2 = new Project("Default Project 2");

  projectsList.addProject(defaultProject2);

  defaultProject2.addItem(exampleItem2);

  exampleItem2.toggleCompleted();

  displayPage();

  displayProjectList(projectsList.list);

  displaySelectedProject(defaultProject);
};

pageInit();
