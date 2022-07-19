// selectors
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let todoForm = document.getElementById('taskForm');
let todoInfo = document.getElementById('taskInput');
let todoDue = document.getElementById('dateInput');
const decOrder = document.getElementById('sortDEC');
const ascOrder = document.getElementById('sortASC');

// object initializer
let todo = {};


//Event Listeners

//submit form listner
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateTodos();
    setLocalStorage();
    e.target.reset();
    displayTodos();
    chackState();
})

// decending order button
decOrder.addEventListener('click', e => {
    sortDEC();
})

// ascening order button
ascOrder.addEventListener('click', e => {
    sortASC();
})

window.addEventListener('load', e => {
    displayTodos();

})



//funtions
function updateTodos() {
    todos.push(new NewTodo(todoInfo.value, todoDue.value))
}

function setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
    const displayList = document.getElementById('taskList');
    displayList.innerHTML = ""

    todos.forEach(todo => {
        const listItem = document.createElement('div');
        listItem.classList.add('tasks');
        listItem.classList.add('lefting');

        const itemTexts = document.createElement('div');
        itemTexts.classList.add("itemTexts");
        const itembuttons = document.createElement('div');
        itembuttons.classList.add('itemButtons');
        itembuttons.classList.add('centering');

        const taskInfo = document.createElement('p');
        taskInfo.classList.add('taskDescription');
        taskInfo.innerText = todo.todoInfo;

        const taskDate = document.createElement('p');
        taskDate.classList.add('taskDueDate');
        taskDate.innerText = todo.todoDate;

        const editButton = document.createElement('span');
        editButton.innerHTML = "<i class=\"fa-solid fa-pencil\">"

        const saveButton = document.createElement('span');
        saveButton.style.display = "none"
        saveButton.innerHTML = "<i class=\"fa-solid fa-floppy-disk\">"

        const doneButton = document.createElement('span');
        doneButton.innerHTML = "<i class=\"fa-solid fa-check\"></i>"

        const deleteButton = document.createElement('span');
        deleteButton.innerHTML = "<i class=\"fa-solid fa-trash-can\">"

        itembuttons.appendChild(editButton);
        itembuttons.appendChild(saveButton);
        itembuttons.appendChild(doneButton);
        itembuttons.appendChild(deleteButton);

        itemTexts.appendChild(taskInfo);
        itemTexts.appendChild(taskDate);

        listItem.appendChild(itemTexts);
        listItem.appendChild(itembuttons);

        displayList.appendChild(listItem);

        editButton.addEventListener("click", function () {
            editButton.style.display = "none"
            saveButton.style.display = "inline-block"

            taskInfo.setAttribute("contentEditable", "true")
            taskInfo.focus();
            taskInfo.classList.add('editing');
            taskInfo.addEventListener("blur", function (e) {
                taskInfo.setAttribute("contentEditable", "false");
                todo.todoInfo = e.target.innerText
                setLocalStorage();
                taskInfo.classList.remove('editing');
                saveButton.style.display = "none";
                editButton.style.display = "inline-block";
                displayTodos();
            })
        })

        saveButton.addEventListener("click", function () {
            saveButton.style.display = "none"
            editButton.style.display = "inline-block"
        })

        deleteButton.addEventListener('click', function () {
            deleteButton.classList.toggle('trash')
            todos = todos.filter(t => t != todo);
            setLocalStorage();
            displayTodos();
        })

        doneButton.addEventListener("click", function () {
            if (todo.todoState == "done") {
                todo.todoState = ""
                setLocalStorage();
                displayTodos();
                
            }
            else {
                todo.todoState = "done"
                setLocalStorage();
                displayTodos();
                
            }
        })

        if (todo.todoState == "done") {
            taskInfo.style.textDecoration = "line-through"
            editButton.style.display = "none"
            taskInfo.classList.add('scratchedText');
            listItem.classList.add('scratched');
        }
        else {
            editButton.style.display = "inline-block"
            taskInfo.classList.remove('scratchedText');
            listItem.classList.remove('scratched');
        }

    });


}

function sortASC() {
    todos.sort(function (a, b) {
        if (a.todoInfo.toLowerCase() < b.todoInfo.toLowerCase()) { return -1 }
        else if (a.todoInfo.toLowerCase() > b.todoInfo.toLowerCase()) { return 1 }
        else { return 0 }
    });
    setLocalStorage();
    displayTodos();
}

function sortDEC() {
    todos.sort(function (a, b) {
        if (a.todoInfo.toLowerCase() > b.todoInfo.toLowerCase()) { return -1 }
        else if (a.todoInfo.toLowerCase() < b.todoInfo.toLowerCase()) { return 1 }
        else { return 0 }
    });
    setLocalStorage();
    displayTodos();
}

// object constructor
function NewTodo(todoDescription, todoDueDate) {
    this.todoInfo = todoDescription,
    this.todoDate = todoDueDate,
    this.todoState = "",
    this.todoMakeDate = new Date
}
