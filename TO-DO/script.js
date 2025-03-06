document.addEventListener('DOMContentLoaded', ()=>{
const addTask = document.getElementById("add-task-btn");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// handling of local storage by using localStorage.getItem("tasks") ---> here local storage is handled for items in task
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach ((task) => renderTask(task)); // for vanilla js rendering means displaying  ---> here for each single task in tasks we are rendering task using renderTask(task)
// adding of task
addTask.addEventListener('click', () =>{
    const taskText = input.value.trim(); //trim ---> means removing of white spaces from both the end
    if(taskText === "") return; //if there is no task simply return

    let newTask = { //if there is any task then in local storage its id, text/content of the task, status of the task(completed/ not completed) is stored
        id: Date.now(),
        text: taskText,
        completed: false,
        date: new Date().toLocaleDateString()
    }; 
    tasks.push(newTask); //all the items in newTask is now pushed into the stack of tasks
    renderTask(newTask); //newTask is rendered/ displayed
    saveTasks();
    input.value =""; //clearing the input
    console.log(tasks);

});

// how rendering of the tasks work
function renderTask(task){
    const li = document.createElement("li"); //here all the task that are need to be renedered are stored in li format
    li.setAttribute("data-id", task.id); //li contains data-id and task.id
    if (task.completed) li.classList.add("completed"); //if task is completed then classList that stored as li will have an updation in status (completed)

    //in simple `...` ---> this works as writing of html in js along with delete button is added ---> to delete tasks
    li.innerHTML = ` 
    <span>${task.text}</span>
    <button>Delete</button>
    `;

    li.addEventListener('click', (e)=>{
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks();
    });

    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation() //prevent toggle from firing
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTasks();
    });

    list.appendChild(li);
}

//adding of local storage to save your tasks
function saveTasks(){
    //JSON.stringify for conversion into string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
});



// const  list = document.getElementById("todo-list");
// const  input = document.getElementById("taskInput"); // Add this line to define the input element
// const  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// tasks.forEach((task) => renderTask(task));

// // adding of task
// document.getElementById("add-task-btn").addEventListener('click', () => {
//     const  taskText = input.value.trim();
//     if (taskText === "") return;

//     const newTask = {
//         id: Date.now(),
//         text: taskText,
//         compconsted: false
//     };
//     tasks.push(newTask);
//     renderTask(newTask);
//     saveTasks();
//     input.value = ""; // clearing the input
//     console.log(tasks);
// });

// function renderTask(task) {
//     const li = document.createElement("li");
//     li.setAttribute("data-id", task.id);
//     if (task.completed) li.classList.add("completed");
//     li.innerHTML = `
//     <span>${task.text}</span>
//     <button>Delete</button>
//     `;

//     li.addEventListener('click', (e) => {
//         if (e.target.tagName === "BUTTON") return;
//         task.completed = !task.completed;
//         li.classList.toggle('completed');
//         saveTasks();
//     });

//     li.querySelector('button').addEventListener('click', (e) => {
//         e.stopPropagation();
//         tasks = tasks.filter(t => t.id !== task.id);
//         li.remove();
//         saveTasks();
//     });

//     list.appendChild(li);
// }

// // adding of local storage to save your tasks
// function saveTasks() {
//     // JSON.stringify for conversion into string
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }