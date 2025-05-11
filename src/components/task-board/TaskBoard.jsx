import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
	return (
		<section class="mb-20" id="tasks">
			<div class="container">
				<SearchTask />
				<div class="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions />
					<TaskList />
				</div>
			</div>
		</section>
	);
}
