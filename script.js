let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    let filteredTasks = tasks;
    if (currentFilter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.findIndex(t => t.id === task.id);
        const date = new Date(task.id).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
        
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${originalIndex})">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-date">Создано: ${date}</div>
                </div>
                <span class="priority-badge priority-${task.priority}">
                    ${task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${originalIndex})">✕</button>
        `;
        list.appendChild(li);
    });

    // Счетчик
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

// Первичная инициализация
renderTasks();
