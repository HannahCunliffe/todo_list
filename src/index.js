import "./styles.css";
import { ToDoItem, Project } from "./projects";

function pageInit() {
  let currentDate = new Date();

  let exampleItem = new ToDoItem(
    "example-title",
    "to-do item description",
    "7/11/2025",
    "Important",
    "notes notes notes"
  );

  console.log(exampleItem);

  let defaultProject = new Project("Default Project");

  defaultProject.addItem(exampleItem);

  console.log(defaultProject);
};

pageInit();
