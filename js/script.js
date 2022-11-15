const TODOS = [];
let sortedAscending = false;

document.querySelector('.main-form').addEventListener("submit", function (e) {     // Добавление элемента
    e.preventDefault();
    let newTodoText = document.querySelector('#newTodo').value;
    document.querySelector('#newTodo').value = "";                                 // Очистка поля ввода
    TODOS.push(newTodoText);
    generateTodoList();                                                            // Запуск генерации ToDo-list'a
});

document.querySelector('#sort').addEventListener("click", function (e) {           // Сортировка элементов
    e.preventDefault();
    TODOS.sort((a, b) => !sortedAscending ? a - b : b - a);
    // Сверху короткая запись при помощи тернарного оператора, в оригинале можно так:
    // TODOS.sort((a, b) => {
    //     if (!sortedAscending) {
    //         return a - b;
    //     } else {
    //         return b - a;
    //     }
    // });

    sortedAscending = !sortedAscending;
    generateTodoList();
});

function generateTodoList() {                              // Генерация ToDo-list'a
    document.querySelector('.todo-list').innerHTML = null; // Обязательно очищаем DOM-узел перед генерацией списка по массиву

    TODOS.forEach((todo, index) => {                       // Генерация списка по массиву
        let li = document.createElement("li");
        li.className = "todo-list-item";

        let p = document.createElement("p");
        p.innerHTML = todo;

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"class="bi bi-x-lg" viewBox = "0 0 16 16" ><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" /></svg >';

        deleteButton.addEventListener("click", function () {    // Обработчик события удаления одного элемента
            TODOS.splice(index, 1);                             // Безопасное удаление элемента из массива
            generateTodoList();                                 // Генерация списка заново после удаления
        })

        li.append(p, deleteButton);
        document.querySelector('.todo-list').append(li);
    });
}