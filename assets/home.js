let todo  = []
let doing = []
let completed = []
let block = []

if (localStorage.getItem("data") === null) {
    data = JSON.parse(localStorage.getItem("data"))
    localStorage.setItem("data", JSON.stringify(data))
}

let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let createTask = document.querySelector(".create-task")
let close = document.querySelector("#close")

let taskTodo = document.getElementById('#todo')
let taskDoing = document.getElementById('#doing')
let taskCompleted = document.getElementById('#completed')
let taskBlock = document.getElementById('#block')

// open popup
createTask.addEventListener('click', function() {
    let popupContainer = document.querySelector(".popup-container")
    popupContainer.classList.toggle('active')
})
//close popup
popupContainer.addEventListener('submit', function() {
    let popupContainer= document.querySelector(".popup-container")
    document.getElementById("caption").value = ""
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
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
    // console.log("event", event)
    event.stopPropagation()
})

// add task
let form = document.querySelector('.popup-main')
form.addEventListener('submit', function(event) {
    event.preventDefault()
    let caption = document.getElementById('caption').value
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let task = {
        caption: caption,
        title: title,
        content: content
    }
    todo.push(task)
    localStorage.setItem("data", JSON.stringify(data))
    document.getElementById("caption").value = ""
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
    render()
})

// render task
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
                        <img src="./assets/img/icon/pencil.svg" alt="">
                        <img src="./assets/img/icon/trashcan.svg" alt="">
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
    // data.forEach((task, index) => {
    //     let taskItem = document.createElement('div')
    //     taskItem.classList.add('task-item')
    //     taskItem.innerHTML = `
    //     <div class="item">
    //                     <div class="row-1">
    //                         <div class="col-1">
    //                             <a class="caption" href="#">${caption}</a>
    //                             <h2 class="title">${title}}</h2>
    //                             <div class="division"></div>
    //                         </div>
    //                         <div class="col-2">
    //                             <img src="./assets/img/icon/pencil.svg" alt="">
    //                             <img src="./assets/img/icon/trashcan.svg" alt="">
    //                         </div>
    //                     </div>
    //                     <div class="row-2">
    //                         <p class="note content">${content}}</p>
    //                         <div class="date">
    //                             <img src="./assets/img/icon/clock-line.svg" alt="">
    //                             <span>June 30, 2022</span>
    //                         </div>
                            
    //                     </div>
    //                 </div>
    //     `
    //     taskList.appendChild(taskItem)
    // })
    taskTodo.innerHTML = elements.join('')
}

render()

