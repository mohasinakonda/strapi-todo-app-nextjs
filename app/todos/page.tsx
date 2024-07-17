import { TodoList } from "@/components/list/todo-list";
import { Input } from "@/components/ui/input";
import { action, getTodos } from "@/lib/action";

export default async function Home({ searchParams }: { searchParams: any }) {
	const todos = await getTodos(searchParams);
	// console.log(todos);
	return (
		<main className="flex min-h-screen flex-col items-center  py-24 ">
			<div className="max-w-5xl mx-auto bg-gray-600 p-5 rounded w-[600px]">
				<form action={action} className="flex ">
					<Input name="description" placeholder="Enter to add task" />
					<Input name="status" type="hidden" value="pending" />
					<button type="submit">submit</button>
				</form>
			</div>
			<TodoList todos={todos.data} />
		</main>
	);
}
