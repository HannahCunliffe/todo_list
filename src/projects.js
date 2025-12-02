export {ToDoItem, Project, projectsList}

class ToDoItem {
    constructor(title, description, dueDate, priority, notes) {
        this.id = self.crypto.randomUUID()
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    };

    toggleCompleted(status) {
        if (status == true) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    };
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