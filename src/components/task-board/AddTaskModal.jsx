import { useState } from "react";

export default function AddTaskModal({ onSave, taskToUpdate, onClose }) {
	const [task, setTask] = useState(
		taskToUpdate || {
			id: crypto.randomUUID(),
			title: "",
			description: "",
			priority: "",
			tags: [],
			isFavorite: false,
		}
	);
	const isAdd = Object.is(taskToUpdate, null);

	function handleInputChange(event) {
		const name = event.target.name;
		let value = event.target.value;

		if (name === "tags") {
			value = value.split(",");
		}
		setTask({
			...task,
			[name]: value,
		});
	}

	return (
		<>
			<div className="bg-black opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
			<form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 absolute top-1/4 left-1/3 z-10">
				<h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
					{isAdd ? "Edit Task" : "Add New Task"}
				</h2>

				<div className="space-y-9 text-white lg:space-y-10">
					<div className="space-y-2 lg:space-y-3">
						<label htmlFor="title">Title</label>
						<input
							className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
							type="text"
							name="title"
							id="title"
							onChange={handleInputChange}
							value={task.title}
							required
						/>
					</div>

					<div className="space-y-2 lg:space-y-3">
						<label htmlFor="description">Description</label>
						<textarea
							className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
							type="text"
							name="description"
							id="description"
							onChange={handleInputChange}
							value={task.description}
							required
						></textarea>
					</div>

					<div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
						<div className="space-y-2 lg:space-y-3">
							<label htmlFor="tags">Tags</label>
							<input
								className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
								type="text"
								name="tags"
								id="tags"
								onChange={handleInputChange}
								value={task.tags}
								required
							/>
						</div>

						<div className="space-y-2 lg:space-y-3">
							<label htmlFor="priority">Priority</label>
							<select
								className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
								name="priority"
								id="priority"
								onChange={handleInputChange}
								value={task.priority}
								required
							>
								<option value="">Select Priority</option>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>
				</div>

				<div className="mt-16 flex items-center justify-between lg:mt-20">
					<button
						onClick={() => onSave(task, isAdd)}
						type="submit"
						className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
					>
						Close
					</button>
				</div>
			</form>
		</>
	);
}
