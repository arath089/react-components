import { useState } from "react";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAdd = () => {
    if (task === "") return;

    const newTask = { id: Date.now(), task: task, completed: false };
    setTaskList([...taskList, newTask]);
    setTask("");
  };

  const handleToggle = (id) => {
    setTaskList(
      taskList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTaskList(taskList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md flex justify-center flex-col">
      <h3 className="text-xl font-semibold text-gray-800">React To Do List</h3>

      <div className="mt-4">
        <div className="flex gap-2">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Add a task..."
          ></input>
          <button
            onClick={handleAdd}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {taskList.filter((t) => t.completed).length} of {taskList.length}{" "}
          completed!
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {taskList.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2"
          >
            <input
              type="checkbox"
              onChange={() => handleToggle(task.id)}
              checked={task.completed}
              className="h-4 w-4 accent-blue-600"
            />
            <p
              className={`flex-1 text-sm text-gray-800 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.task}
            </p>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
- State
    - task - input the task, then add button click adds it to a set of tasks
    - taskList - a list of tasks to do. 

- Shape
    - task - string
    - taskList - array - [
        { id : 1, task: "Walk Dog", completed: false},
        { id : 2, task: "Exam", completed: true},
    ]

- Operations
    - Add - input the task with a controlled input value and add click adds the new task to the taskList
    - Toggle - checkbox click completes the task in the taskList, adds strikethrough, updates "X of Y completed"
    - delete - delete button click deletes the task from taskList
    - completedCount - taskList.filter(t => t.completed).length

- JSX
    - Input to add the task with an Add button
    - X of Y completed
    - taskList with each task with:
        - checkbox 
        - name of the task
        - delete button
        - completed task with strikethrough - derived from todo.completed
*/
