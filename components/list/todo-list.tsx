"use client";

import { deleteTodo, getUser, updateTodo } from "@/lib/action";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { TodoModal } from "./todo-modal";

type attributes = {
	description: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};
type Todo = {
	id: number;
	attributes: attributes;
};
type TodoListProps = {
	todos: Todo[];
	users: any[];
};
export const TodoList = ({ todos, users }: TodoListProps) => {
	const [addtoda, setAddtodo] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const status = params.get("status");

	const handleSort = (value: string) => {
		router.push(`${pathname}?status=${value}`);
	};
	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const search = new FormData(event.currentTarget).get(
			"search"
		) as string;
		router.push(`${pathname}?search=${search}`);
	};
	return (
		<div className="">
			<div className="flex justify-between items-center py-5">
				<h2 className="text-sm font-bold">TODOS</h2>

				<select
					className="border border-gray-500 rounded py-2 px-3"
					onChange={(e) => handleSort(e.target.value)}
					id=""
				>
					<option>select</option>
					<option value="all">All</option>
					<option value="complete">Complete</option>
					<option value="pending">Pending</option>
				</select>

				<form onSubmit={handleSearch} className="relative">
					<input
						name="search"
						id=""
						className="focus:outline-none border p-2 border-gray-500 rounded w"
						placeholder="Search todos"
					/>
					<button className="absolute top-0 right-0 border-l p-2 border-l-gray-500">
						search
					</button>
				</form>
				<button
					onClick={() => setAddtodo(true)}
					className="bg-green-400 text-white py-2 px-3 rounded"
				>
					Add to-do
				</button>
			</div>
			<div className="bg-gray-600 rounded-lg shadow-lg px-5">
				<table>
					<thead className="sticky top-0 h-12 bg-gray-600">
						<tr className="border-b border-b-gray-500 text-white">
							<th>
								<input
									type="checkbox"
									className="w-5 h-5 accent-[#4b5563] border border-gray-500"
								/>{" "}
							</th>
							<th className="p-5 text-start">Task</th>
							<th className="p-5">Status</th>
							<th className="p-5">Assignee</th>
							<th className="p-5">Created At</th>
							<th className="p-5">Action</th>
						</tr>
					</thead>
					<tbody className="text-white divide-y divide-gray-500">
						{todos.map((todo) => (
							<tr key={todo.id}>
								<td>
									<input
										type="checkbox"
										className="w-5 h-5  accent-[#4b5563] border border-gray-500"
									/>{" "}
								</td>
								<td className="p-5 text-lg">
									{todo.attributes.description}
								</td>
								<td>
									<span
										className={cn(
											" px-3 rounded-full leading-[1] flex items-center justify-center text-sm font-medium py-1",
											todo.attributes.status
												? "bg-green-500"
												: "bg-yellow-500"
										)}
									>
										{todo.attributes.status
											? "completed"
											: "pending"}
									</span>
								</td>
								<td>
									<span className="px-3 underline">
										{
											todo.attributes?.assignee?.data
												?.attributes.username
										}
									</span>
								</td>
								<td className="px-3 py-5">
									{new Date(
										todo.attributes.createdAt
									).toLocaleDateString()}
								</td>
								<td className="p-5 space-x-3 flex gap-2 justify-end">
									<button className="border border-gray-500 px-4 rounded">
										Edit
									</button>
									{!todo.attributes.status && (
										<form
											action={(formdata) =>
												updateTodo(formdata, todo.id)
											}
										>
											<input
												type="hidden"
												value={"true"}
												name="status"
											/>
											<button className="border border-gray-500 px-4 rounded">
												complete
											</button>
										</form>
									)}
									<button
										onClick={() => deleteTodo(todo.id)}
										className="border border-gray-500 px-4 rounded"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{addtoda && (
				<TodoModal users={users} onClose={() => setAddtodo(false)} />
			)}
		</div>
	);
};
