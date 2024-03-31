let todo  = []
let doing = []
let completed = []
let block = []

if (localStorage.getItem("data") === null) {
    data = JSON.parse(localStorage.getItem("data"))
    localStorage.setItem("data", JSON.stringify(data))
}

renderNumber()

let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let createTask = document.querySelector(".create-task")
let close = document.querySelector("#close")

let taskTodo = document.getElementById('todo')
let taskDoing = document.getElementById('doing')
let taskCompleted = document.getElementById('completed')
let taskBlock = document.getElementById('block')

// open popup
createTask.addEventListener('click', function() {
    let popupContainer = document.querySelector(".popup-container")
    popupContainer.classList.toggle('active')
})

popupContainer.addEventListener('click', function() {
    popupContainer.classList.toggle('active')
})

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

// render task
// function render() {
//     let elements = todo.map((item, index) => {
//         return `
//             <div class="item">
//                 <div class="row-1">
//                     <div class="col-1">
//                         <a class="caption" href="#">${item.caption}</a>
//                         <h2 class="title">${item.title}</h2>
//                         <div class="division"></div>
//                     </div>
//                     <div class="col-2">
//                         <img class="editTask" onclick="onEdit(${index}, 'todo')" src="./assets/img/icon/pencil.svg" alt="">
//                         <img class="deleteTask" onclick="onDelete(${index}, 'todo')" src="./assets/img/icon/trashcan.svg" alt="">
//                     </div>
//                 </div>
//                 <div class="row-2">
//                     <p class="note content">${item.content}</p>
//                     <div class="date">
//                         <img src="./assets/img/icon/clock-line.svg" alt="">
//                         <span>June 30, 2022</span>
//                     </div>
//                 </div>
//             </div>
//         `
//     })
//     taskTodo.innerHTML = elements.join('')
// }
// update task
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
// move task
function onMove(index, type) {
    let task = {}
    if (type === 'todo') {
        task = todo[index]
        doing.push(task)
        todo.splice(index, 1)
        localStorage.setItem("todo", JSON.stringify(todo))
        localStorage.setItem("doing", JSON.stringify(doing))
    } else if (type === 'doing') {
        task = doing[index]
        completed.push(task)
        doing.splice(index, 1)
        localStorage.setItem("doing", JSON.stringify(doing))
        localStorage.setItem("completed", JSON.stringify(completed))
    } else if (type === 'completed') {
        task = completed[index]
        block.push(task)
        completed.splice(index, 1)
        localStorage.setItem("completed", JSON.stringify(completed))
        localStorage.setItem("block", JSON.stringify(block))
    } else {
        task = block[index]
        doing.push(task)
        block.splice(index, 1)
        localStorage.setItem("block", JSON.stringify(block))
        localStorage.setItem("doing", JSON.stringify(doing))
    }
    render()
    renderNumber()
}
// edit task
let popupEditContainer = document.querySelector(".edit-container")
let popupEditMain = document.querySelector(".editMain")
let closeEdit = document.querySelector("#editClose")

let captionEdit = document.getElementById('captionEdit')
let titleEdit = document.getElementById('titleEdit')
let contentEdit = document.getElementById('contentEdit')

popupEditContainer.addEventListener('click', function() {
    popupEditContainer.classList.toggle('active-edit')
})

closeEdit.addEventListener('click', function() {
    popupEditContainer.classList.toggle('active-edit')
})

popupEditMain.addEventListener('click', function(event) {
    event.stopPropagation()
})
// edit task

function onEdit(index, type) { 
    let task = {}

    type = getTypeFromCheckboxId(index)

    // Function to extract type from checkbox ID
    function getTypeFromCheckboxId(index) {
        let checkboxId = 'box-' + index;
        if (document.getElementById(checkboxId)) {
            if (document.getElementById(checkboxId).checked) {
                if (checkboxId.includes('todo')) {
                    return 'todo';
                } else if (checkboxId.includes('doing')) {
                    return 'doing';
                } else if (checkboxId.includes('completed')) {
                    return 'completed';
                } else if (checkboxId.includes('block')) {
                    return 'block';
                }
            }
        }
        // Default to 'todo' if no checkbox is checked
        return 'todo';
    }

    if (type === 'todo') {
        task = todo[index]
    } else if (type === 'doing') {
        task = doing[index]
    } else if (type === 'completed') {
        task = completed[index]
    } else {
        task = block[index]
    }
    console.log(index)
    let popupEditContainer = document.querySelector(".edit-container")
    popupEditContainer.classList.toggle('active-edit')

    let captionEdit = document.getElementById('captionEdit')
    let titleEdit = document.getElementById('titleEdit')
    let contentEdit = document.getElementById('contentEdit')

    captionEdit.value = task.caption
    titleEdit.value = task.title
    contentEdit.value = task.content

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
        if (type === 'todo') {
            todo.splice(index, 1, task)
            localStorage.setItem("todo", JSON.stringify(todo))
        } else if (type === 'doing') {
            doing.splice(index, 1, task)
            localStorage.setItem("doing", JSON.stringify(doing))
        } else if (type === 'completed') {
            completed.splice(index, 1, task)
            localStorage.setItem("completed", JSON.stringify(completed))
        } else {
            block.splice(index, 1, task)
            localStorage.setItem("block", JSON.stringify(block))
        }
        render()
        popupEditContainer.classList.toggle('active-edit')
    })
}

function render() { 
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
    }
    )
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
    }
    )
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
    }
    )
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
    }
    )
    taskBlock.innerHTML = elements.join('')
}
