import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Loading from "../Components/Loading";

const Todo = () => {
  const { user } = useContext(UserContext);

  // Static tasks (for now, this is hardcoded)
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "task"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(todosArray);
      setTaskLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Handle task input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to the list
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "task"), {
        completed: false,
        task: task,
        userId: user.uid,
      });
    } catch (error) {
      console.log(error.message);
    }
    setTask('')
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'task', id))
  };

  // Handle task completion update
  const update = async (id, completed) => {
    await updateDoc(doc(db, 'task', id),{
      completed: !completed
    })
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full sm:w-[500px] bg-gray-800 p-6 rounded-xl shadow-lg">
        {/* Logout Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

        {/* Form to add new task */}
        <form onSubmit={handleAddTask} className="flex mb-4 space-x-2">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Enter a new task"
            className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
          >
            Add
          </button>
        </form>

        {/* Static Task List */}
        <div className="space-y-4">
          {taskLoading ? (
            <Loading />
          ) : (
            tasks?.map((task) => (
              <div
                key={task.id} // Assuming each task has a unique id
                className="bg-gray-700 px-4 py-2 rounded-md flex items-center justify-between"
              >
                {/* Checkbox to toggle task completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => update(task.id, task.completed)}
                  className="h-5 w-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                />

                {/* Task text, conditionally styled based on completion */}
                <p
                  className={`text-gray-200 font-semibold flex-grow px-4 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.task}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
