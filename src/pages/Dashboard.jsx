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
      setNewTodo({ name: "", description: "", priority: "low", deadline: "" });
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

  return (
    <div class=" mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <h1 class="text-3xl font-bold text-center text-white-600 mb-6">
        Todo List
      </h1>
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <input
          class="border p-2 rounded w-full md:w-1/4"
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          class="border p-2 rounded w-full md:w-1/4"
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <select
          class=" border p-2 rounded w-full md:w-1/6"
          value={newTodo.priority}
          onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
        >
          <option class="text-black " value="low">
            Low
          </option>
          <option class="text-black " value="medium">
            Medium
          </option>
          <option class="text-black " value="high">
            High
          </option>
        </select>
        <input
          type="date"
          class="border p-2 rounded w-full md:w-1/6"
          value={newTodo.deadline}
          onChange={(e) => setNewTodo({ ...newTodo, deadline: e.target.value })}
        />
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      <div class="flex gap-2 justify-center items-center mb-4">
        <label class="text-lg">Sort by: </label>
        <select
          class="border p-2 rounded "
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option class="text-black " value="deadline">
            Deadline
          </option>
          <option class="text-black " value="priority">
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
        <ul class="space-y-4 flex flex-wrap gap-4 justify-center flex-basis">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              class="border p-4 rounded shadow-md bg-white text-black"
            >
              <p class="font-semibold text-lg flex justify-center items-center gap-2">
                {todo.name}{" "}
                <span class="text-sm text-gray-500">({todo.priority})</span>
              </p>
              <p>Description: {todo.description}</p>
              <p>Must Finished: {formatDate(todo.deadline)}</p>
              <p>Assigned in: {formatDate(todo.created_at)}</p>

              <div class="flex space-x-2 mt-2">
                <button
                  onClick={() => completeTask(todo.id, todo.isCompleted)}
                  class="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-600"
                >
                  {todo.isCompleted ? "Undo" : "Complete Task"}
                </button>
                <button
                  onClick={() => startEditTask(todo)}
                  class="bg-blue-400 text-black px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(todo.id)}
                  class="bg-red-400 text-black px-3 py-1 rounded hover:bg-red-600"
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
        <div class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 border rounded shadow-lg">
          <h2 class="text-2xl font-bold mb-4 flex justify-center">Edit Task</h2>
          <input
            type="text"
            name="name"
            value={editTodo.name}
            onChange={handleEditChange}
            class="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            name="description"
            value={editTodo.description}
            onChange={handleEditChange}
            class="border p-2 rounded w-full mb-2"
          />
          <select
            name="priority"
            value={editTodo.priority}
            onChange={handleEditChange}
            class="border p-2 rounded w-full mb-2"
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
            class="border p-2 rounded w-full mb-2"
          />
          <div class="flex space-x-2 justify-center mt-2">
            <button
              class="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600"
              onClick={saveEditTask}
            >
              Save
            </button>
            <button
              class="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600"
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
