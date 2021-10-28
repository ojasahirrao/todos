const form = document.getElementById('form')
const input = document.getElementById('input')
const todosList = document.getElementById('todos')

const todosLocalStorage = JSON.parse(localStorage.getItem('todos'))

if (todosLocalStorage) {
    todosLocalStorage.forEach(todo => addRemoveTodos(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addRemoveTodos()
})

function addRemoveTodos(todo) {
    let todoText = input.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')

            updateLocalStorage()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()

            updateLocalStorage()
        })

        todosList.appendChild(todoEl)

        input.value = ''

        updateLocalStorage()
    }

}

function updateLocalStorage() {

    todoEl = document.querySelectorAll('li')

    const todos = []

    todoEl.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))

}