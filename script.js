const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = 'ADVANCE_TODO_LIST'
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos` 
let todos = loadTodo()
todos.forEach(renderTodo)



list.addEventListener('change', e=>{
    if(!e.target.matches('[data-list-item-checkbox]')) return

    //Get the todo that is clicked on
    const parent  = e.target.closest(".list-item")
    const todoID = parent.dataset.todoId
    const todo = todos.find(t=> t.id===todoID)
    todo.complete = e.target.checked
    saveTodo()

})

list.addEventListener('click',e=>{
    if(!e.target.matches('[data-button-delete]')) return

    const parent  = e.target.closest(".list-item")
    const todoID = parent.dataset.todoId

    parent.remove()
     todos = todos.filter(t=> t.id !== todoID)

     saveTodo()

})


form.addEventListener("submit", e => {
    e.preventDefault()
  
    const todoName = todoInput.value
    if(todoName === "") return 
    const newTodo = {
        name: todoName,
        complete:false,
        id: new Date().valueOf().toString()
    }
    todos.push(newTodo)
    renderTodo(newTodo)
    saveTodo()
    todoInput.value = ""            
  })

  function renderTodo(todo) {
    const templateClone = template.content.cloneNode(true)
    const listItem = templateClone.querySelector(".list-item")
    listItem.dataset.todoId = todo.id 
    const textElement = templateClone.querySelector("[data-list-item-text]")
    textElement.innerText = todo.name
    const checkBox = templateClone.querySelector("[data-list-item-checkbox]")
    checkBox.checked = todo.complete
    list.appendChild(templateClone)
  }

  //Save Todo
  function saveTodo(){
    localStorage.setItem(TODOS_STORAGE_KEY,JSON.stringify(todos))
  }

  //Load Todo
  function loadTodo(){
    const todoString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todoString) || []
  }


  