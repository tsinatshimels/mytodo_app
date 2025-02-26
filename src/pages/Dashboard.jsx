import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    priority: "low",
    time: "",
    deadline: "",
  });
  const [sortBy, setSortBy] = useState("deadline");
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null); // Store the task being edited

  useEffect(() => {
    fetchTodos();
  }, [sortBy]); // Fetch todos whenever sort changes

  const fetchTodos = async () => {
    setLoading(true);
    let query = supabase.from("Todolist").select("*");

    if (sortBy === "deadline") {
      query = query.order("deadline", { ascending: true });
    }

    const { data, error } = await query;
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      let sortedData = data;
      if (sortBy === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        sortedData = data.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      }
      setTodoList(sortedData);
    }
    setLoading(false);
  };

  const addTodo = async () => {
    if (!newTodo.name.trim()) return;

    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;

    const newTodoData = {
      ...newTodo,
      isCompleted: false,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from("Todolist")
      .insert([newTodoData])
      .select();

    if (error) {
      console.log("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data[0]]);
      setNewTodo({
        name: "",
        description: "",
        priority: "low",
        deadline: "",
        time: "",
      });
    }
  };
  const completeTask = async (id, isCompleted) => {
    const { error } = await supabase
      .from("Todolist")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) console.log("Error toggling task: ", error);
    else {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("Todolist").delete().eq("id", id);

    if (error) console.log("Error deleting task: ", error);
    else setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditTask = (todo) => {
    setEditTodo(todo);
  };

  const handleEditChange = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  const saveEditTask = async () => {
    const { error } = await supabase
      .from("Todolist")
      .update(editTodo)
      .eq("id", editTodo.id);

    if (error) {
      console.log("Error updating task: ", error);
    } else {
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === editTodo.id ? editTodo : todo))
      );
      setEditTodo(null); // Close the edit modal
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) navigate("/login");
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className=" mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center text-white-600 mb-6">
        Todo List
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="border p-2 rounded w-full md:w-1/4"
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          className="border p-2 rounded w-full md:w-1/4"
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <select
          className=" border p-2 rounded w-full md:w-1/6"
          value={newTodo.priority}
          onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
        >
          <option className="text-black " value="low">
            Low
          </option>
          <option className="text-black " value="medium">
            Medium
          </option>
          <option className="text-black " value="high">
            High
          </option>
        </select>
        <input
          type="date"
          className="border p-2 rounded w-full md:w-1/6"
          value={newTodo.deadline}
          onChange={(e) => setNewTodo({ ...newTodo, deadline: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded w-full md:w-1/6"
          value={newTodo.time}
          onChange={(e) => setNewTodo({ ...newTodo, time: e.target.value })}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      <div className="flex gap-2 justify-center items-center mb-4">
        <label className="text-lg">Sort by: </label>
        <select
          className="border p-2 rounded "
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option className="text-black " value="deadline">
            Deadline
          </option>
          <option className="text-black " value="priority">
            Priority
          </option>
        </select>
        <button onClick={fetchTodos}>Apply Sort</button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue border-solid"></div>
        </div>
      ) : (
        <ul className="space-y-4 flex flex-wrap gap-4 justify-center flex-basis">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="border p-4 rounded shadow-md bg-white text-black"
            >
              <p className="font-semibold text-lg flex justify-center items-center gap-2">
                {todo.name}{" "}
                <span className="text-sm text-gray-500">({todo.priority})</span>
              </p>
              <p>Description: {todo.description}</p>
              <p>Must Finished: {formatDate(todo.deadline)}</p>
              <p>Time: {todo.time ? formatTime(todo.time) : "Not Set"}</p>
              <p>Assigned in: {formatDate(todo.created_at)}</p>

              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => completeTask(todo.id, todo.isCompleted)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-600"
                >
                  {todo.isCompleted ? "Undo" : "Complete Task"}
                </button>
                <button
                  onClick={() => startEditTask(todo)}
                  className="bg-blue-400 text-black px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="bg-red-400 text-black px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={signOut}>Log out</button>

      {/* Edit Modal */}
      {editTodo && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 border rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex justify-center">
            Edit Task
          </h2>
          <input
            type="text"
            name="name"
            value={editTodo.name}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            name="description"
            value={editTodo.description}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-2"
          />
          <select
            name="priority"
            value={editTodo.priority}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={editTodo.deadline}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-2"
          />
          <div className="flex space-x-2 justify-center mt-2">
            <button
              className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600"
              onClick={saveEditTask}
            >
              Save
            </button>
            <button
              className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setEditTodo(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
