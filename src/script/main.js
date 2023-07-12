const buttonAdd = document.querySelector(".button-add")
const ulList = document.querySelector(".ul-list")
const toDoList = JSON.parse(localStorage.getItem("@taskListKey")) || [];


function buttonAddTittleAndTask() {

    const titleList = prompt(`
        Informe um Titulo
        *Com até 30 Caracteres*
    `)

    if(titleList === '' || titleList.length > 30) {
        alert("Não salvo, informe o titulo corretamente.")
        return
    }

    const taskList = prompt(`
        Informe a tarefa
        *Limite 250 caracteres"
    `)

    if(taskList === '' || taskList.length > 250) {
        alert("Não salvo, informe a tarefa corretamente.")
        return
    }

    const newToDoList = structureList(titleList, taskList)
    toDoList.unshift(newToDoList)
    
    renderList()
    saveList()
}
buttonAdd.addEventListener("click", buttonAddTittleAndTask)

function structureList(title, task) {
    return `
        <li class="li-list">
            <h2 class="tittle-task">${title}</h2>
            <p>
                ${task}
            </p>
            <button class="delete-task" title="Deletar Tarefa"><div></div></button>
        </li>
    `
}

let postion

function renderList() {
    ulList.innerHTML = ""
    ulList.innerHTML = `
        ${toDoList.map((li, index) => {
            postion = index
            return li
        })}
    `

    const deleteButtons = document.querySelectorAll(".delete-task")
    deleteButtons.forEach((item) => {
        item.addEventListener("click", deleteTask)
    })

}

function deleteTask() {
    const confirmDelete = prompt('Para remover uma tarefa da lista, digite "DELETAR"')
    if(confirmDelete.toUpperCase() === 'DELETAR'){
        toDoList.splice(postion, 1)
        renderList()
        saveList()
        return
    }
}

renderList()

function saveList() {
    localStorage.setItem('@taskListKey', JSON.stringify(toDoList));
}