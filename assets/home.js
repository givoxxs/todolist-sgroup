let todo = []
let doing = []
let completed = []
let block = []

if (localStorage.getItem("todo")) {
    todo = JSON.parse(localStorage.getItem("todo"))
    localStorage.setItem("todo", JSON.stringify(todo))
}

if (localStorage.getItem("doing")) {
    doing = JSON.parse(localStorage.getItem("doing"))
    localStorage.setItem("doing", JSON.stringify(doing))
}

if (localStorage.getItem("completed")) {
    completed = JSON.parse(localStorage.getItem("completed"))
    localStorage.setItem("completed", JSON.stringify(completed))
}

if (localStorage.getItem("block")) {
    block = JSON.parse(localStorage.getItem("block"))
    localStorage.setItem("block", JSON.stringify(block))
}

let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let createTask = document.querySelector(".create-task")
let close = document.querySelector("#close")

let taskTodo = document.getElementById('todo')
let taskDoing = document.getElementById('doing')
let taskCompleted = document.getElementById('completed')
let taskBlock = document.getElementById('block')

render()
renderNumber()

// open popup
createTask.addEventListener('click', function() {
    let popupContainer = document.querySelector(".popup-container")
    popupContainer.classList.toggle('active')
})

popupContainer.addEventListener('click', function() {
    popupContainer.classList.toggle('active')
})
// close popup
close.addEventListener('click', function() {
    let popupContainer= document.querySelector(".popup-container")
    document.getElementById("caption").value = ""
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
    popupContainer.classList.toggle('active')
})

popupMain.addEventListener('click', function(event) {
    event.stopPropagation()
})
// add task
popupMain.addEventListener('submit', function(event) {
    event.preventDefault()
    let caption = document.getElementById('caption').value
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value

    console.log(caption)
    console.log(title)
    console.log(content)

    let task = {
        caption: caption,
        title: title,
        content: content
    }
    todo.push(task)
    console.log(todo)
    localStorage.setItem("todo", JSON.stringify(todo))
    render()
    document.getElementById("caption").value = ""
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
    popupContainer.classList.toggle('active')
    renderNumber()
})
// update number for each status
function renderNumber() {
    let todoNumber = document.querySelector('.todo-num')
    let doingNumber = document.querySelector('.doing-num')
    let completedNumber = document.querySelector('.completed-num')
    let blockNumber = document.querySelector('.block-num')

    todoNumber.innerHTML = todo.length
    doingNumber.innerHTML = doing.length
    completedNumber.innerHTML = completed.length
    blockNumber.innerHTML = block.length
}

// delete task
function onDelete(index, type) {
    if (type === 'todo') {
        todo.splice(index, 1)
        localStorage.setItem("todo", JSON.stringify(todo))
        render()
    } else if (type === 'doing') {
        doing.splice(index, 1)
        localStorage.setItem("doing", JSON.stringify(doing))
        render()
    } else if (type === 'completed') {
        completed.splice(index, 1)
        localStorage.setItem("completed", JSON.stringify(completed))
        render()
    } else {
        block.splice(index, 1)
        localStorage.setItem("block", JSON.stringify(block))
        render()
    }
    renderNumber()
}
// edit task
let popupEditContainer = document.querySelector(".edit-container")
let popupEditMain = document.querySelector(".editMain")
let closeEdit = document.querySelector("#editClose")

let captionEdit = document.getElementById('captionEdit')
let titleEdit = document.getElementById('titleEdit')
let contentEdit = document.getElementById('contentEdit')
// open popup edit
popupEditContainer.addEventListener('click', function() {
    popupEditContainer.classList.toggle('active-edit')
})
// close popup edit
closeEdit.addEventListener('click', function() {
    popupEditContainer.classList.toggle('active-edit')
})

popupEditMain.addEventListener('click', function(event) {
    event.stopPropagation()
})

let checkboxTodo = document.querySelector("#box-todo")
let checkboxDoing = document.querySelector("#box-doing")
let checkboxCompleted = document.querySelector("#box-completed")
let checkboxBlock = document.querySelector("#box-block")

// only one checkbox can be checked
document.querySelectorAll('.status-item input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.status-item input[type="checkbox"]').forEach(checkbox => {
            if (checkbox !== input) {
                checkbox.checked = false
            }
        })
    })
})
// pre data
let editIndex = null
let preType = null
let taskToEdit = null
// edit task
function onEdit(index, type) { 
    editIndex = index
    preType = type

    let task = {}
    console.log("index cua no la", index)
    console.log("type cua no la", type) 
    console.log("editIndex: ", editIndex)
    console.log("preType: ", preType)  

    console.log(checkboxTodo)

    if (type === 'todo') {
        task = todo[index]
    } else if (type === 'doing') {
        task = doing[index]
    } else if (type === 'completed') {
        task = completed[index]
    } else {
        task = block[index]
    }

    taskToEdit = task

    console.log(task)
    
    let popupEditContainer = document.querySelector(".edit-container")
    popupEditContainer.classList.toggle('active-edit')

    document.querySelector('#captionEdit').value = task.caption
    document.querySelector('#titleEdit').value = task.title
    document.querySelector('#contentEdit').value = task.content

    let checkboxes = document.querySelectorAll('.box')
    console.log("checkboxs", checkboxes)
    checkboxes.forEach(checkbox => {
        if (checkbox.id === `box-${type}`) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }
    });
}
// save edit task
popupEditMain.addEventListener('submit', function(event) {
    event.preventDefault()
    let caption = document.getElementById('captionEdit').value
    let title = document.getElementById('titleEdit').value
    let content = document.getElementById('contentEdit').value

    console.log(caption)
    console.log(title)
    console.log(content)

    let task = {
        caption: caption,
        title: title,
        content: content
    }

    let type;
    if (checkboxTodo.checked) {
        type = 'todo'
    } else if (checkboxDoing.checked) {
        type = 'doing'
    } else if (checkboxCompleted.checked) {
        type = 'completed'
    } else if (checkboxBlock.checked) {
        type = 'block'
    }

    if (type === 'todo') {
        todo.push(task)
        localStorage.setItem("todo", JSON.stringify(todo))
    } else if (type === 'doing') {
        doing.push(task)
        localStorage.setItem("doing", JSON.stringify(doing))
    } else if (type === 'completed') {
        completed.push(task)
        localStorage.setItem("completed", JSON.stringify(completed))
    } else if (type === 'block') {
        block.push(task)
        localStorage.setItem("block", JSON.stringify(block))
    }

    if (preType === 'todo') {
        todo.splice(editIndex, 1)
        localStorage.setItem("todo", JSON.stringify(todo))
    } else if (preType === 'doing') {
        doing.splice(editIndex, 1)
        localStorage.setItem("doing", JSON.stringify(doing))
    } else if (preType === 'completed') {
        completed.splice(editIndex, 1)
        localStorage.setItem("completed", JSON.stringify(completed))
    } else {
        block.splice(editIndex, 1)
        localStorage.setItem("block", JSON.stringify(block))
    }

    render()
    renderNumber()
    editIndex = null
    preType = null
    popupEditContainer.classList.toggle('active-edit')
})
// render task
function render() { 
    // render task todo
    let elements = todo.map((item, index) => {
        return `
        <div class="item">
        <div class="row-1">
            <div class="col-1">
                <a class="caption" href="#">${item.caption}</a>
                <h2 class="title">${item.title}</h2>
                <div class="division"></div>
            </div>
            <div class="col-2">
                <img class="editTask" onclick="onEdit(${index}, 'todo')" src="./assets/img/icon/pencil.svg" alt="">
                <img class="deleteTask" onclick="onDelete(${index}, 'todo')" src="./assets/img/icon/trashcan.svg" alt="">
            </div>
        </div>
        <div class="row-2">
            <p class="note content">${item.content}</p>
            <div class="date">
                <img src="./assets/img/icon/clock-line.svg" alt="">
                <span>June 30, 2022</span>
            </div>
        </div>
    </div>
        `
    })
    // render task doing
    taskTodo.innerHTML = elements.join('')
    elements = doing.map((item, index) => {
        return `
        <div class="item">
        <div class="row-1">
            <div class="col-1">
                <a class="caption" href="#">${item.caption}</a>
                <h2 class="title">${item.title}</h2>
                <div class="division"></div>
            </div>
            <div class="col-2">
                <img class="editTask" onclick="onEdit(${index}, 'doing')" src="./assets/img/icon/pencil.svg" alt="">
                <img class="deleteTask" onclick="onDelete(${index}, 'doing')" src="./assets/img/icon/trashcan.svg" alt="">
            </div>
        </div>
        <div class="row-2">
            <p class="note content">${item.content}</p>
            <div class="date">
                <img src="./assets/img/icon/clock-line.svg" alt="">
                <span>June 30, 2022</span>
            </div>
        </div>
    </div>
        `
    })
    // render task completed
    taskDoing.innerHTML = elements.join('')
    elements = completed.map((item, index) => {
        return `
        <div class="item">
            <div class="row-1">
                <div class="col-1">
                    <a class="caption" href="#">${item.caption}</a>
                    <h2 class="title">${item.title}</h2>
                    <div class="division"></div>
                </div>
                <div class="col-2">
                    <img class="editTask" onclick="onEdit(${index}, 'completed')" src="./assets/img/icon/pencil.svg" alt="">
                    <img class="deleteTask" onclick="onDelete(${index}, 'completed')" src="./assets/img/icon/trashcan.svg" alt="">
                </div>
            </div>
            <div class="row-2">
                <p class="note content">${item.content}</p>
                <div class="date">
                    <img src="./assets/img/icon/clock-line.svg" alt="">
                    <span>June 30, 2022</span>
                </div>
            </div>
        </div>
        `
    })
    // render task block
    taskCompleted.innerHTML = elements.join('')
    elements = block.map((item, index) => {
        return `
        <div class="item">
            <div class="row-1">
                <div class="col-1">
                    <a class="caption" href="#">${item.caption}</a>
                    <h2 class="title">${item.title}</h2>
                    <div class="division"></div>
                </div>
                <div class="col-2">
                    <img class="editTask" onclick="onEdit(${index}, 'block')" src="./assets/img/icon/pencil.svg" alt="">
                    <img class="deleteTask" onclick="onDelete(${index}, 'block')" src="./assets/img/icon/trashcan.svg" alt="">
                </div>
            </div>
            <div class="row-2">
                <p class="note content">${item.content}</p>
                <div class="date">
                    <img src="./assets/img/icon/clock-line.svg" alt="">
                    <span>June 30, 2022</span>
                </div>
            </div>
        </div>
        `
    })
    taskBlock.innerHTML = elements.join('')
}
