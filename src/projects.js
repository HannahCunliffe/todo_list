export {ToDoItem, Project, ProjectList}

class ToDoItem {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}

class Project {
    constructor(name) {
        this.projectName = name;
    };

    projectName;

    projectItems = [];

    addItem(item) {
        this.projectItems.push(item);
    };

};

class ProjectList {
    
    projectsList = [];

    addProject(project) {
        this.projectsList.push(project);
    };

    testMethod() {
        console.log("hello")
    }
}