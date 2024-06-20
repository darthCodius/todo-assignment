import { useEffect, useRef, useState } from "react";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../utils/tasksSlice";
import { checkValidData } from "../utils/validate";

const Dashboard = () => {
  const [id, setId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hideToDoData, sethideToDoData] = useState(false);
  const [hideDoingData, sethideDoingData] = useState(false);
  const [hideDoneData, sethideDoneData] = useState(false);
  const [isEditSession, setIsEditSession] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const taskName = useRef(null);
  const taskAssignee = useRef(null);
  const taskDeadline = useRef(null);
  const taskStatus = useRef(null);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks");

    const data = await res.json();

    dispatch(setTasks(data));
  };

  const tasks = useSelector((store) => store.tasks.tasks);

  const addTask = async (task = null, id = null) => {
    if (!isEditSession) {
      const res = await fetch("http://localhost:8000/tasks", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
    } else {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const handleEdit = async (id) => {
    setIsEditSession(true);
    setShowForm((curr) => !curr);

    const res = await fetch(`http://localhost:8000/tasks/${id}`);

    const data = await res.json();

    taskName.current.value = data?.name;
    taskAssignee.current.value = data?.assignee;
    taskDeadline.current.value = data?.date;
    taskStatus.current.value = data?.status;

    console.log(taskStatus.current.value);

    setId(id);
  };

  const handleHideToDoData = () => {
    sethideToDoData((curr) => !curr);
  };

  const handleHideDoingData = () => {
    sethideDoingData((curr) => !curr);
  };

  const handleHideDoneData = () => {
    sethideDoneData((curr) => !curr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = checkValidData(
      taskName.current.value.trim(),
      taskAssignee.current.value.trim(),
      taskDeadline.current.value
    );

    setError(message);

    if (message) return;

    const taskData = {
      name: taskName.current.value.trim(),
      assignee: taskAssignee.current.value.trim(),
      date: taskDeadline.current.value,
      status: taskStatus.current.value,
    };

    !isEditSession ? addTask(taskData) : addTask(taskData, id);

    setShowForm(false);
    setIsEditSession(false);
  };

  const handleClose = () => {
    setError(null);
    setIsEditSession(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-wrap gap-10 justify-center mt-20">
      <div className="flex flex-col gap-5 w-[300px] lg:w-[400px] bg-gray-300 p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">To Do</h1>
          <button
            className="text-xs text-gray-500"
            onClick={handleHideToDoData}
          >
            <FaRegArrowAltCircleDown />
          </button>
        </div>
        {!hideToDoData && (
          <div>
            <ul className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.status === "pending")
                .map((task, idx) => {
                  return (
                    <li
                      draggable
                      key={task.id}
                      className="bg-white flex items-center justify-between p-1 rounded-sm hover:bg-slate-100 shadow-md"
                    >
                      <span>{task.name}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEdit(task.id)}
                      >
                        <MdEdit />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        {!showForm && (
          <div>
            <button className="text-gray-500" onClick={() => setShowForm(true)}>
              Add a card...
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 w-[300px] lg:w-[400px] bg-gray-300 p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Doing</h1>
          <button
            className="text-xs text-gray-500"
            onClick={handleHideDoingData}
          >
            <FaRegArrowAltCircleDown />
          </button>
        </div>
        {!hideDoingData && (
          <div>
            <ul className="flex flex-col gap-2">
              {tasks
                ?.filter((task) => task.status === "wip")
                ?.map((task) => {
                  return (
                    <li
                      draggable
                      key={task.id}
                      className="bg-white flex items-center justify-between p-1 rounded-sm hover:bg-slate-100 shadow-md"
                    >
                      <span>{task.name}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEdit(task.id)}
                      >
                        <MdEdit />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        {!showForm && (
          <div>
            <button className="text-gray-500" onClick={() => setShowForm(true)}>
              Add a card...
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 w-[300px] lg:w-[400px] bg-gray-300 p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Done</h1>
          <button
            className="text-xs text-gray-500"
            onClick={handleHideDoneData}
          >
            <FaRegArrowAltCircleDown />
          </button>
        </div>
        {!hideDoneData && (
          <div>
            <ul className="flex flex-col gap-2">
              {tasks
                ?.filter((task) => task.status === "completed")
                ?.map((task) => {
                  return (
                    <li
                      draggable
                      key={task.id}
                      className="bg-white flex items-center justify-between p-1 rounded-sm hover:bg-slate-100 shadow-md"
                    >
                      <span>{task.name}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEdit(task.id)}
                      >
                        <MdEdit />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        {!showForm && (
          <div>
            <button className="text-gray-500" onClick={() => setShowForm(true)}>
              Add a card...
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <div className="absolute w-full h-full bg-black p-5 rounded-sm bg-opacity-50">
          <form
            className="flex bg-gray-300 p-5 w-[300px] lg:w-[600px]  flex-col gap-4 absolute left-20 top-20 md:left-[300px] lg:md:left-[650px] rounded-md"
            onSubmit={handleSubmit}
          >
            <span className="flex items-center justify-between mb-7">
              <h1 className="font-bold text-xl">
                {isEditSession ? "Edit Task!" : "Add Task!"}
              </h1>
              <button onClick={handleClose}>
                <IoClose />
              </button>
            </span>

            <span className="flex items-center justify-around">
              <label htmlFor="task" className="font-semibold">
                Task Title
              </label>
              <input
                className="px-2 py-1 rounded-sm border-2 border-gray-700"
                type="text"
                name="task"
                id="task"
                ref={taskName}
              />
            </span>
            <span className="flex items-center justify-around">
              <label className="font-semibold" htmlFor="assignee">
                Assignee
              </label>
              <input
                className="px-2 py-1 rounded-sm border-2 border-gray-700"
                type="text"
                name="assignee"
                id="assignee"
                ref={taskAssignee}
              />
            </span>
            <span className="flex items-center justify-around">
              <label className="font-semibold" htmlFor="date">
                Deadline
              </label>
              <input
                className="px-2 py-1 rounded-sm border-2 border-gray-700"
                type="date"
                name="date"
                id="date"
                ref={taskDeadline}
              />
            </span>

            <span className="flex items-center justify-around">
              <label className="font-semibold" htmlFor="date">
                Status
              </label>
              <select ref={taskStatus} className="p-1 rounded-md">
                <option value="pending">Pending</option>
                <option value="wip">Attend</option>
                <option value="completed">Complete</option>
              </select>
            </span>

            {error && (
              <div className="flex items-center justify-center">
                <h1 className="text-sm text-red-500">{error}</h1>
              </div>
            )}

            <button className="bg-gray-400 p-2 rounded-md hover:bg-gray-500 transition-all duration-200">
              {!isEditSession ? "Add Task" : "Edit Task"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
