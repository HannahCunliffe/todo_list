export {displayPage, displayProjectList, displaySelectedProject, addProjectSelectionMethod}

import plusIcon from "./assets/plus.svg"

import { projectsList } from "./projects";

function displayPage() {
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

    let btnBackground = document.createElement("img");

    btnBackground.src = plusIcon;

    btnAddProject.append(btnBackground);

    projectsHeader.append(btnAddProject);

    sidebar.append(projectsHeader);
};

function displayProjectList(list) {

    const pageSidebar = document.getElementById("sidebar");

    let projectsDiv = document.createElement("div");

    projectsDiv.id = "projectsList";

    list.forEach(element => {
        //return to this and update it to filter by only incomplete tasks first
        let numberOfTasks = element.projectItems.length;
        let projectContainer = document.createElement("div");
        projectContainer.id = "projectContainer";
        let projectTitle = document.createElement("h2");
        projectTitle.textContent = element.projectName;
        projectContainer.append(projectTitle);

        //add on click method to select project view
        addProjectSelectionMethod(projectContainer, element);

        //add display of currently uncompleted tasks for each project sidebar entry
        if (numberOfTasks > 0) {
            let taskCount = document.createElement("p");
            taskCount.textContent = `${numberOfTasks}`;
            taskCount.id = "taskCounter";
            projectContainer.append(taskCount);
        };

        pageSidebar.append(projectContainer);

    });
};

function displaySelectedProject(project) {
    //locate container for section of page which will display projects
    let pageSection = document.getElementById("pageContent")

    //empty container to ensure that the display is starting from a blank page section
    if (pageSection.hasChildNodes() == true) {
        pageSection.firstChild.remove();
    };

    let projectHeading = document.createElement("h1");

    projectHeading.id = "projectHeading";

    //let currentProject = projectsList.findProjectByName(projectName);

    projectHeading.textContent = project.projectName;

    pageSection.append(projectHeading);
};

function addProjectSelectionMethod(container, element) {
    //adds click method to select project from page sidebar elements
    container.addEventListener("click", () => {
        displaySelectedProject(element);
    });
};