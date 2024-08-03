import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { action } from "@/lib/action";
import { closeOutsideClick } from "@/lib/close-outside-click";

export const TodoModal = ({
	users,
	onClose,
}: {
	users: any[];
	onClose: () => void;
}) => {
	const [activeTab, setActiveTab] = useState("createTodo");
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		closeOutsideClick(ref, onClose);
	}, []);
	return (
		<div className="bg-gray-900/80 inset-0 fixed z-50 flex items-center ">
			<div
				ref={ref}
				className="max-w-2xl bg-white/70 mx-auto p-12 rounded"
			>
				<div className="flex gap-5 pb-10">
					<button
						onClick={() => setActiveTab("createTodo")}
						className={cn(
							"uppercase text-sm font-bold",
							activeTab === "createTodo" &&
								"border-b-2 border-b-gray-500"
						)}
					>
						Create todo
					</button>
					<button
						onClick={() => setActiveTab("createGroup")}
						className={cn(
							"uppercase text-sm font-bold",
							activeTab === "createGroup" &&
								"border-b-2 border-b-gray-500"
						)}
					>
						Create group
					</button>
				</div>
				{activeTab == "createTodo" && (
					<form action={action} className="flex flex-col gap-5">
						<input
							className="w-80 p-2 border border-gray-500 rounded"
							type="text"
							placeholder="task name"
							name="description"
						/>
						<select
							className="w-80 p-2 border border-gray-500 rounded"
							name="assignee"
						>
							{users.map((user) => (
								<option value={user.id}>{user.username}</option>
							))}
						</select>
						<button>create</button>
					</form>
				)}
				{activeTab == "createGroup" && (
					<div className="flex flex-col gap-5">
						<input
							className="w-80 p-2 border border-gray-500 rounded"
							type="text"
							placeholder="group name"
							name="group"
						/>
						<Input
							type="hidden"
							value={"hazrat"}
							name="author_ame"
						/>
						<button>create</button>
					</div>
				)}
			</div>
		</div>
	);
};
