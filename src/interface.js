export {displayPage, displayProjectList}

import plusIcon from "./assets/plus.svg"

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

        //add display of currently uncompleted tasks for each project sidebar entry
        if (numberOfTasks > 0) {
            let taskCount = document.createElement("p");
            taskCount.textContent = `${numberOfTasks} >`;
            projectContainer.append(taskCount);
        };

        pageSidebar.append(projectContainer);

    });

   
    

}