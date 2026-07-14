function greet(name){
    console.log("Hello, " + name + "! JavaScript is working!");
}

greet("Tyler");


// Get Elements
const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const list = document.getElementById("todo-container");
let todos = [];



console.log(input);
//Build out functions
function init(){
    const saved = localStorage.getItem("todoList");
    if(saved){
        todos = JSON.parse(saved);
        todos.forEach((todo, index) => {
            displayPreviousToDos(todo, index);
        });
    }
    
}

function displayPreviousToDos(todo, index){
    const newToDo = document.createElement("li");

    newToDo.textContent = todo;
    newToDo.dataset.index = index;

    const removeButton = document.createElement("button");

    removeButton.textContent = "Remove Task";
    removeButton.classList.add("remove-button");

    list.appendChild(newToDo);
    newToDo.appendChild(removeButton);
   
}

function addToDo(todoText){
    console.log("User typed: ", todoText);
    alert("New Task Created: " + todoText);

    todos.push(todoText);

    localStorage.setItem("todoList", JSON.stringify(todos));
    
    console.log("Current ToDo List: ", localStorage.getItem("todoList"));

    //Build "Toast" notification in future

    const newToDo = document.createElement("li");
    newToDo.textContent = todoText;

    newToDo.dataset.index = todos.length - 1;

    const removeButton = document.createElement("button");

    removeButton.textContent = "Remove Task";
    removeButton.classList.add("remove-button");

    list.appendChild(newToDo);
    newToDo.appendChild(removeButton);

    input.value = "";
}   

//make remove button work with event delegation
list.addEventListener("click", function(event){
    if (event.target.matches(".remove-button")){
        console.log("Remove button clicked!");

        const todoItem = event.target.parentElement;
        const index = todoItem.dataset.index;

        todos.splice(index, 1);

        localStorage.setItem("todoList", JSON.stringify(todos));

        event.target.parentElement.remove();
    }
});

//Add task event listeners
addButton.addEventListener("click", function(){
    console.log("New Task Created!");
    const input = document.getElementById("task-input");
    const todoText = input.value;
    addToDo(todoText);
});

input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        console.log("New Task Created!");
        const input = document.getElementById("task-input");
        const todoText = input.value;
        addToDo(todoText);
    }
});

console.log(localStorage.getItem("todoList"));

init();
