import "./styles.css";
import { ToDoItem, Project , projectsList} from "./projects";
import { displayPage, displayProjectList, displaySelectedProject } from "./interface";

function pageInit() {
  let currentDate = new Date().toLocaleDateString();

  let exampleItem = new ToDoItem(
    "example-title",
    "to-do item description",
    currentDate,
    "Important",
    "notes notes notes"
  );

   let exampleItem2 = new ToDoItem(
    "example-title 2",
    "to-do item description",
    currentDate,
    "Important",
    "notes notes notes"
  );

  let defaultProject = new Project("Default Project");

  defaultProject.addItem(exampleItem);
  defaultProject.addItem(exampleItem2);

  //let allProjects = new ProjectList;

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
