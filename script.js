let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    // Для примера добавим пару задач, чтобы скриншот был красивее
    { id: 1, title: "Сделать курсовую работу", completed: false, priority: "high" },
    { id: 2, title: "Настроить Git-flow", completed: true, priority: "medium" }
];

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Добавляем классы для цвета полоски и зачеркивания
        li.className = `${task.priority} ${task.completed ? 'completed' : ''}`;
        
        // Структура: [Галочка] [Текст] [Кнопка Удалить]
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class="task-title">${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Удалить</button>
        `;
        list.appendChild(li);
    });

    // Сохраняем в БД (LocalStorage)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('priorityInput').value;
    if (input.value.trim() !== '') {
        tasks.push({ id: Date.now(), title: input.value, completed: false, priority: priority });
        input.value = '';
        renderTasks();
    }
}

function toggleTask(index) { 
    tasks[index].completed = !tasks[index].completed; 
    renderTasks(); 
}

function deleteTask(index) { 
    tasks.splice(index, 1); 
    renderTasks(); 
}

// Запуск при загрузке страницы
renderTasks();
