export {ToDoItem, Project}

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
        this.name = name;
    }

    projectItems = [];

    addItem(item) {
        this.projectItems.push(item);
    }

}