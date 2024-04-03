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
    document.getElementById("")
    popupContainer.classList.toggle('active')
})

popupMain.addEventListener('click', function(event) {
    event.stopPropagation()
})

// clock
function getCurrentTime() {
    const now = new Date();
    const month = now.toLocaleString('en', { month: 'long' })
    const day = now.getDate()
    const year = now.getFullYear()
    return `${month} ${day}, ${year}`
}
// add task
popupMain.addEventListener('submit', function(event) {
    event.preventDefault()
    let caption = document.getElementById('caption').value
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value

    let captionStyle = document.getElementById('caption')
    let titleStyle = document.getElementById('title')
    let contentStyle = document.getElementById('content')

    if (!caption || !title || !content) {
        if (!caption) {
            captionStyle.style.border = "2px solid red"
            console.log("t đè màu đỏ rồi")
        } else {
            captionStyle.style.border = "1px solid green"
        }
        if (!title) {
            titleStyle.style.border = "2px solid red"
            console.log('t cũng đè màu đỏ rồi')
        } else {
            titleStyle.style.border = "1px solid green"
        }
        if (!content) {
            contentStyle.style.border = "2px solid red"
        } else {
            contentStyle.style.border = "1px solid green"
        }
        return
    } else {
        captionStyle.style.border = "1px solid rgba(0, 0, 0, 0.5);"
        titleStyle.style.border = "1px solid rgba(0, 0, 0, 0.5);"
        contentStyle.style.border = "1px solid rgba(0, 0, 0, 0.5);"
    }

    let currentTime = getCurrentTime();
    console.log(currentTime)

    let task = {
        caption: caption,
        title: title,
        content: content,
        time: currentTime
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
let timeSave = null
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
    timeSave = task.time

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
        content: content,
        time: timeSave
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
        <div class="item" draggable="true">
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
                <span class="clock">${item.time}</span>
            </div>
        </div>
    </div>
        `
    })
    // render task doing
    taskTodo.innerHTML = elements.join('')
    elements = doing.map((item, index) => {
        return `
        <div class="item" draggable="true">
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
                <span class="clock">${item.time}</span>
            </div>
        </div>
    </div>
        `
    })
    // render task completed
    taskDoing.innerHTML = elements.join('')
    elements = completed.map((item, index) => {
        return `
        <div class="item" draggable="true">
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
                    <span class="clock">${item.time}</span>
                </div>
            </div>
        </div>
        `
    })
    // render task block
    taskCompleted.innerHTML = elements.join('')
    elements = block.map((item, index) => {
        return `
        <div class="item" draggable="true">
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
                    <span class="clock">${item.time}</span>
                </div>
            </div>
        </div>
        `
    })
    taskBlock.innerHTML = elements.join('')
}

// drag and drop
taskTodo.addEventListener('dragstart', dragStart)
taskDoing.addEventListener('dragstart', dragStart)
taskCompleted.addEventListener('dragstart', dragStart)
taskBlock.addEventListener('dragstart', dragStart)

taskTodo.addEventListener('dragover', dragOver)
taskDoing.addEventListener('dragover', dragOver)
taskCompleted.addEventListener('dragover', dragOver)
taskBlock.addEventListener('dragover', dragOver)

taskTodo.addEventListener('drop', drop)
taskDoing.addEventListener('drop', drop)
taskCompleted.addEventListener('drop', drop)
taskBlock.addEventListener('drop', drop)

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id)
}

function dragOver(event) {
    event.preventDefault()
}

function drop(event) {
    event.preventDefault()
    const taskId = event.dataTransfer.getData("text/plain")
    const taskElement = document.getElementById(taskId)
    const targetElement = event.currentTarget

    const targetId = targetElement.id
    const targetList = getListById(targetId)

    const sourceId = taskElement.parentElement.id
    const sourceList = getListById(sourceId)

    const taskIndex = Array.from(sourceList.children).indexOf(taskElement)

    if (sourceList === targetList) {
        const targetIndex = Array.from(targetList.children).indexOf(targetElement)
        if (taskIndex < targetIndex) {
            targetList.insertBefore(taskElement, targetElement.nextSibling)
        } else {
            targetList.insertBefore(taskElement, targetElement)
        }
    } else {
        targetList.insertBefore(taskElement, targetElement)
    }

    updateLocalStorage()
}

function getListById(id) {
    switch (id) {
        case 'todo':
            return taskTodo
        case 'doing':
            return taskDoing
        case 'completed':
            return taskCompleted
        case 'block':
            return taskBlock
        default:
            return null
    }
}

function updateLocalStorage() {
    todo = Array.from(taskTodo.children).map(task => getTaskData(task))
    doing = Array.from(taskDoing.children).map(task => getTaskData(task))
    completed = Array.from(taskCompleted.children).map(task => getTaskData(task))
    block = Array.from(taskBlock.children).map(task => getTaskData(task))

    localStorage.setItem("todo", JSON.stringify(todo))
    localStorage.setItem("doing", JSON.stringify(doing))
    localStorage.setItem("completed", JSON.stringify(completed))
    localStorage.setItem("block", JSON.stringify(block))
}

function getTaskData(taskElement) {
    const caption = taskElement.querySelector('.caption').textContent
    const title = taskElement.querySelector('.title').textContent
    const content = taskElement.querySelector('.content').textContent

    return {
        caption,
        title,
        content
    }
}
