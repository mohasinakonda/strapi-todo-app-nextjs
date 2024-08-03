import { TodoList } from "@/components/list/todo-list";
import { Input } from "@/components/ui/input";
import { action, getTodos, getUsers } from "@/lib/action";

export default async function Home({ searchParams }: { searchParams: any }) {
	const todos = await getTodos(searchParams);
	const users = await getUsers();

	return (
		<main className="flex min-h-screen flex-col items-center  py-24 ">
			<TodoList todos={todos.data} users={users} />
		</main>
	);
}
