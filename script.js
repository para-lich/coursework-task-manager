let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    { id: 1, title: "Изучить Git-flow", completed: true, priority: "high" },
    { id: 2, title: "Разработать интерфейс", completed: false, priority: "medium" }
];

function renderTasks() {
    const list = document.getElementById('taskList');
    const emptyMsg = document.getElementById('emptyMessage');
    list.innerHTML = '';
    if (tasks.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    } else {
        emptyMsg.style.display = 'none';
    }
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `${task.completed ? 'completed' : ''} ${task.priority}`;
        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.title}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">Удалить</button>
        `;
        list.appendChild(li);
    });
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
renderTasks();
