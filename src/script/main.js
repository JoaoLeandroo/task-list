const buttonAdd = document.querySelector(".button-add")
const ulList = document.querySelector(".ul-list")
const toDoList = JSON.parse(localStorage.getItem("@taskListKey")) || [];


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
        *Limite 250 caracteres*
    `)

    if (taskList === '' || taskList.length > 250) {
        alert("Não salvo, informe a tarefa corretamente.")
        return
    }

    const newToDoList = { title: titleList, task: taskList };
    toDoList.unshift(newToDoList);

    renderList();
    saveList();
}

buttonAdd.addEventListener("click", buttonAddTittleAndTask)

function structureList(title, task, index) {
    return `
        <li class="li-list">
            <h2 class="tittle-task">${title}</h2>
            <p>
                ${task}
            </p>
            <button class="delete-task" data-index="${String(index)}" title="Deletar Tarefa"><div></div></button>
        </li>
    `
}

function renderList() {
    ulList.innerHTML = ""
    ulList.innerHTML = `
        ${toDoList.map((li, index) => {
            console.log(index)
            return structureList(li.title, li.task, index);
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