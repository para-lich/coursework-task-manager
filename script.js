let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'default';

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    // Фильтрация
    let filteredTasks = [...tasks];
    if (currentFilter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    // Сортировка (из настроек)
    if (currentSort === 'high') {
        const weight = { high: 3, medium: 2, low: 1 };
        filteredTasks.sort((a, b) => weight[b.priority] - weight[a.priority]);
    } else if (currentSort === 'low') {
        const weight = { high: 3, medium: 2, low: 1 };
        filteredTasks.sort((a, b) => weight[a.priority] - weight[b.priority]);
    }

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.findIndex(t => t.id === task.id);
        
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        
        // Вставляем правильную структуру: Галочка -> Название -> Бейдж -> Удалить
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${originalIndex})">
            <span class="task-title">${task.title}</span>
            <span class="priority-badge priority-${task.priority}">
                ${task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
            </span>
            <button class="delete-btn" onclick="deleteTask(${originalIndex})">✕</button>
        `;
        list.appendChild(li);
    });

    const activeTasks = tasks.filter(t => !t.completed).length;
    document.getElementById('task-counter').textContent = `Активных задач: ${activeTasks}`;
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

function toggleTask(index) { tasks[index].completed = !tasks[index].completed; renderTasks(); }
function deleteTask(index) { tasks.splice(index, 1); renderTasks(); }

function setFilter(filter, event) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTasks();
}

// --- Логика вкладок и настроек ---
function switchTab(tabName, event) {
    // Переключение меню
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    // Переключение контента
    document.getElementById('tab-tasks').classList.add('hidden');
    document.getElementById('tab-settings').classList.add('hidden');
    
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
}

function sortTasks() {
    currentSort = document.getElementById('sortSelect').value;
    renderTasks();
}

function clearAllTasks() {
    if (confirm('Вы уверены, что хотите удалить все задачи?')) {
        tasks = [];
        renderTasks();
    }
}

// Первичная инициализация
renderTasks();
