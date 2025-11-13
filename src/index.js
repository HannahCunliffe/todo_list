import "./styles.css";
import { ToDoItem, Project , ProjectList} from "./projects";
import { displayPage, displayProjectList } from "./interface";

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

  let allProjects = new ProjectList;

  allProjects.addProject(defaultProject);

  let defaultProject2 = new Project("Default Project 2");

  allProjects.addProject(defaultProject2);

  displayPage();

  displayProjectList(allProjects.projectsList);

  //let test = projectsList.projectsList[1].projectName;

  //console.log(test)

};

pageInit();
