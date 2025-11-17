export {ToDoItem, Project, projectsList}

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

const projectsList = new class ProjectList {
    
    list = [];

    addProject(project) {
        this.list.push(project);
    };

    //functionality to search and return a project item via name
    findProjectByName(name) {
        let foundItem = null;
        this.list.forEach(element => {
            if(element.projectName == name) {
                foundItem = element;
            }
        });
        if(foundItem != null) {
            return foundItem;
        }
    };
};