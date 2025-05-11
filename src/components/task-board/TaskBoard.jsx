import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTasks from "./NoTasks";

export default function TaskBoard() {
	const defaultTask = {
		id: crypto.randomUUID(),
		title: "Integration API",
		description:
			"Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
		tags: ["web", "python", "api"],
		isFavorite: false,
		priority: "high",
	};
	const [tasks, setTasks] = useState([defaultTask]);
	const [showModal, setShowModal] = useState(false);
	const [taskToUpdate, setTaskToUpdate] = useState(null);

	function handleCreateEditTask(newTask, isAdd) {
		if (isAdd) {
			setTasks([...tasks, newTask]);
		} else {
			setTasks(
				tasks.map((task) => {
					if (task.id === newTask.id) {
						return newTask;
					}
					return task;
				})
			);
		}
		setShowModal(false);
		setTaskToUpdate(null);
	}

	function handleEditTask(task) {
		setTaskToUpdate(task);
		setShowModal(true);
	}

	function handleDeleteTask(taskToDelete) {
		const tasksAfterDelete = tasks.filter(
			(task) => task.id !== taskToDelete.id
		);
		setTasks(tasksAfterDelete);
	}

	function handleDeleteAll() {
		setTasks([]);
	}

	function handleFilterTasks(searchTerm) {
		const filteredTasks = tasks.filter((task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setTasks([...filteredTasks]);
	}

	function handleFavorite(favTask) {
		setTasks(
			tasks.map((task) => {
				if (task.id === favTask.id) {
					return { ...task, isFavorite: !task.isFavorite };
				}
				return task;
			})
		);
	}

	return (
		<section className="mb-20" id="tasks">
			{showModal && (
				<AddTaskModal
					onSave={handleCreateEditTask}
					taskToUpdate={taskToUpdate}
					onClose={() => {
						setShowModal(false);
						setTaskToUpdate(null);
					}}
				/>
			)}
			<div className="container">
				<SearchTask onSearch={handleFilterTasks} />
				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions
						onAddClick={() => setShowModal(true)}
						onDeleteAll={handleDeleteAll}
					/>
					{tasks.length > 0 ? (
						<TaskList
							tasks={tasks}
							onEditTask={handleEditTask}
							onDelete={handleDeleteTask}
							onFav={handleFavorite}
						/>
					) : (
						<NoTasks />
					)}
				</div>
			</div>
		</section>
	);
}
