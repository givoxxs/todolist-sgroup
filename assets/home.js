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

    document.getElementById("caption").value = ""
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""

    let captionStyle = document.getElementById('caption')
    let titleStyle = document.getElementById('title')
    let contentStyle = document.getElementById('content')

    captionStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
    titleStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
    contentStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
})

popupContainer.addEventListener('click', function() {
    popupContainer.classList.toggle('active')
})
// close popup
close.addEventListener('click', function() {
    let popupContainer= document.querySelector(".popup-container")
    popupContainer.classList.toggle('active')
})

popupMain.addEventListener('click', function(event) {
    event.stopPropagation()
})

// clock
function getCurrentTime() {
    const now = new Date()
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
        } else {
            captionStyle.style.border = "1px solid green"
        }
        if (!title) {
            titleStyle.style.border = "2px solid red"
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
        captionStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
        titleStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
        contentStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
    }

    let currentTime = getCurrentTime()

    let task = {
        caption: caption,
        title: title,
        content: content,
        time: currentTime
    }
    todo.push(task)
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
    console.log("editIndex: ", editIndex)
    console.log("preType: ", preType)
    console.log("index: ", index)
    console.log("type: ", type)

    let task = {} 

    if (type === 'todo') {
        task = todo[index]
    } else if (type === 'doing') {
        task = doing[index]
    } else if (type === 'completed') {
        task = completed[index]
    } else {
        task = block[index]
    }

    console.log("task: ", task)

    taskToEdit = task
    timeSave = task.time
    
    let popupEditContainer = document.querySelector(".edit-container")
    popupEditContainer.classList.toggle('active-edit')

    document.querySelector('#captionEdit').value = task.caption
    document.querySelector('#titleEdit').value = task.title
    document.querySelector('#contentEdit').value = task.content

    let checkboxes = document.querySelectorAll('.box')
    checkboxes.forEach(checkbox => {
        if (checkbox.id === `box-${type}`) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }
    })
}
// save edit task
popupEditMain.addEventListener('submit', function(event) {
    event.preventDefault()
    let caption = document.getElementById('captionEdit').value
    let title = document.getElementById('titleEdit').value
    let content = document.getElementById('contentEdit').value

    let task = {
        caption: caption,
        title: title,
        content: content,
        time: timeSave
    }

    let type
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
let lists = document.querySelectorAll('.item')
console.log(lists)

lists.forEach(list => {
    list.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', list.id)
    })
})

function setupDrapDrop() {
    let lists = document.querySelectorAll('.item')
    lists.forEach(list => {
        list.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', list.id)
        })
    })
}

let found = false; 

for (let list of lists) {
    setupDrapDrop()
    console.log(found)
    if (found) {
        break; 
    }
    console.log("begin drap list external")
    list.addEventListener('dragstart', function(e) {
        console.log("begin drap list internal")
        let selected = e.target;
        console.log("selected : " +selected);
        
        taskDoing.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        taskDoing.addEventListener('drop', function(e) {
            console.log("taskDoing nhận 1 item")
            e.preventDefault();
            taskDoing.appendChild(selected);
            selected = null;
            render2();
            console.log("out render2")
            // setupDrapDrop();
            renderNumber();
            found = true; // Đặt found thành true để thoát khỏi vòng lặp
            console.log(found)
            return 
        });

        taskCompleted.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        taskCompleted.addEventListener('drop', function(e) {
            console.log("taskCompleted nhận 1 item")
            e.preventDefault();
            taskCompleted.appendChild(selected);
            selected = null;
            render2();
            console.log("out render2")
            // setupDrapDrop();
            renderNumber();
            found = true; // Đặt found thành true để thoát khỏi vòng lặp
            console.log(found)
            return;
            console.log('đã return')
        });

        taskBlock.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        taskBlock.addEventListener('drop', function(e) {
            console.log("taskBlock Nhận 1 item")
            e.preventDefault();
            taskBlock.appendChild(selected);
            selected = null;
            render2();
            console.log("out render2")
            // setupDrapDrop();
            renderNumber();
            found = true; // Đặt found thành true để thoát khỏi vòng lặp
            console.log(found)
            return
        });

        taskTodo.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        taskTodo.addEventListener('drop', function(e) {
            console.log("taskTodo nhận 1 item")
            e.preventDefault();
            taskTodo.appendChild(selected);
            selected = null;
            render2();
            console.log("out render2")
            // setupDrapDrop();
            renderNumber();
            found = true; // Đặt found thành true để thoát khỏi vòng lặp
            console.log(found)
            return
        });

        console.log("selected - after: ", selected);
        console.log("end drap list internal");
        console.log("found: ", found)
    });
    console.log("end drap list external");
}

//update data after drag and drop
function render2() {
    console.log('begin render2')
    let todoItems = taskTodo.querySelectorAll('.item')
    console.log("todoItem: ", todoItems)
    let doingItems = taskDoing.querySelectorAll('.item')
    console.log("doingItem: ", doingItems)
    let completedItems = taskCompleted.querySelectorAll('.item')
    console.log("completedItem: ", completedItems)
    let blockItems = taskBlock.querySelectorAll('.item')
    console.log("blockItem: ", blockItems)

    // Update todo
    todo = Array.from(todoItems).map(item => {
        return {
            caption: item.querySelector('.caption').innerText,
            title: item.querySelector('.title').innerText,
            content: item.querySelector('.note.content').innerText,
            time: item.querySelector('.clock').innerText
        }
    })
    console.log("todo: ", todo)

    // Update doing
    doing = Array.from(doingItems).map(item => {
        return {
            caption: item.querySelector('.caption').innerText,
            title: item.querySelector('.title').innerText,
            content: item.querySelector('.note.content').innerText,
            time: item.querySelector('.clock').innerText
        }
    })
    console.log("doing: ", doing)

    // Update completed
    completed = Array.from(completedItems).map(item => {
        return {
            caption: item.querySelector('.caption').innerText,
            title: item.querySelector('.title').innerText,
            content: item.querySelector('.note.content').innerText,
            time: item.querySelector('.clock').innerText
        }
    })
    console.log("completed: ", completed)

    // Update block
    block = Array.from(blockItems).map(item => {
        return {
            caption: item.querySelector('.caption').innerText,
            title: item.querySelector('.title').innerText,
            content: item.querySelector('.note.content').innerText,
            time: item.querySelector('.clock').innerText
        }
    })
    console.log("block: ", block)

    localStorage.setItem("todo", JSON.stringify(todo))
    localStorage.setItem("doing", JSON.stringify(doing))
    localStorage.setItem("completed", JSON.stringify(completed))
    localStorage.setItem("block", JSON.stringify(block))

    console.log("end render2")
}

function onStage() {
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

    render()
    renderNumber()
}