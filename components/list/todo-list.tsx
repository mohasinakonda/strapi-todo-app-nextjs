"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

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
};
export const TodoList = ({ todos }: TodoListProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const status = params.get("status");
	const handleSort = (value: "pending" | "complete" | "all") => {
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
				<h2 className="text-3xl">Todos</h2>
				<div className="space-x-5">
					<button
						className={
							status === "all"
								? "border-b-2 border-b-gray-500"
								: ""
						}
						onClick={() => handleSort("all")}
					>
						All
					</button>
					<button
						className={
							status === "pending"
								? "border-b-2 border-b-gray-500"
								: ""
						}
						onClick={() => handleSort("pending")}
					>
						Pending
					</button>
					<button
						className={
							status === "complete"
								? "border-b-2 border-b-gray-500"
								: ""
						}
						onClick={() => handleSort("complete")}
					>
						Completed
					</button>
				</div>
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
			</div>
			<div className="bg-gray-600 rounded-lg shadow-lg">
				<table>
					<thead>
						<tr className="border-b border-b-gray-500 text-white">
							<th className="p-5">Task</th>
							<th className="p-5">Status</th>
							<th className="p-5">Created At</th>
							<th className="p-5">Action</th>
						</tr>
					</thead>
					<tbody className="text-white">
						{todos.map((todo) => (
							<tr key={todo.id}>
								<td className="p-5">
									{todo.attributes.description}
								</td>
								<td className="p-5">
									<span
										className={cn(
											" px-3 py-1 rounded-full",
											todo.attributes.status === "pending"
												? "bg-yellow-400"
												: "bg-green-400"
										)}
									>
										{todo.attributes.status}
									</span>
								</td>
								<td className="px-3 py-5">
									{new Date(
										todo.attributes.createdAt
									).toLocaleDateString()}
								</td>
								<td className="p-5 space-x-3">
									<button className="border border-gray-500 px-4 rounded">
										Edit
									</button>
									{todo.attributes.status === "pending" && (
										<button className="border border-gray-500 px-4 rounded">
											complete
										</button>
									)}
									<button className="border border-gray-500 px-4 rounded">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
