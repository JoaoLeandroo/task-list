const buttonAdd = document.querySelector(".button-add")
const ulList = document.querySelector(".ul-list")
const toDoList = JSON.parse(localStorage.getItem("@taskListKey")) || [];

function registerDateAndHour() {
    const date = new Date()
    let day = date.getDate()
    day = String(day).padStart(2, "0")

    let month = date.getMonth() + 1
    month = String(month).padStart(2, "0")

    let year = date.getFullYear()
    year = String(year).padStart(2, "0")

    let hour = date.getHours()
    hour = String(hour).padStart(2, "0")

    let minutes = date.getMinutes()
    minutes = String(minutes).padStart(2, "0")

    let seconds = date.getSeconds()
    seconds = String(seconds).padStart(2, "0")
    
    return {
        dia: day,
        mes: month,
        ano: year,

        hora: hour,
        minuto: minutes,
        segundo: seconds
    }
}

function buttonAddTittleAndTask() {
    const titleList = prompt(`
        Informe um Título
        *Com até 30 Caracteres*
    `)

    if (titleList === '' || titleList.length > 30) {
        alert("Não salvo, informe o título corretamente.")
        return
    }

    const taskList = prompt(`
        Informe a tarefa
        *Limite 200 caracteres*
    `)

    if (taskList === '' || taskList.length > 250) {
        alert("Não salvo, informe a tarefa corretamente.")
        return
    }

    const x = registerDateAndHour()
    const taskDate = `${x.dia}/${x.mes}/${x.ano}`
    const taskHour = `${x.hora}:${x.minuto}:${x.segundo}`

    const newToDoList = { title: titleList, task: taskList, date: taskDate, hour: taskHour };
    toDoList.unshift(newToDoList);

    renderList();
    saveList();
}

buttonAdd.addEventListener("click", buttonAddTittleAndTask)

function structureList(title, task, date, hour, index) {
    return `
        <li class="li-list">
            <h2 class="tittle-task">${title}</h2>
            <p>
                ${task}
            </p>
            <button class="delete-task" data-index="${String(index)}" title="Deletar Tarefa"><div></div></button>
            <div class="contain-date-and-hour">            
                <span>${date}</span>
                <span>${hour}</span>
            </div>
        </li>
    `
}

function renderList() {
    ulList.innerHTML = ""
    ulList.innerHTML = `
        ${toDoList.map((li, index) => {
            return structureList(li.title, li.task, li.date, li.hour, index);
        })}
    `

    const deleteButtons = document.querySelectorAll(".delete-task")
    deleteButtons.forEach((item) => {
        item.addEventListener("click", deleteTask)
    })
}

function deleteTask(event) {
    const confirmDelete = prompt('Para remover uma tarefa da lista, digite "DELETAR"')
    if (confirmDelete.toUpperCase() === 'DELETAR') {
        const index = event.target.getAttribute("data-index")
        toDoList.splice(index, 1)
        renderList()
        saveList()
        return
    }
}

renderList()

function saveList() {
    localStorage.setItem('@taskListKey', JSON.stringify(toDoList));
}