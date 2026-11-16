# app.py - Простая ИС для управления задачами

tasks = []

def add_task(title):
    """Добавляет новую задачу в список."""
    tasks.append({"id": len(tasks) + 1, "title": title, "status": "В работе"})
    return f"Задача '{title}' успешно добавлена!"

def get_all_tasks():
    """Возвращает список всех задач."""
    return tasks

if __name__ == "__main__":
    print(add_task("Сделать курсовую по Git-flow"))
    print("Текущие задачи:", get_all_tasks())
