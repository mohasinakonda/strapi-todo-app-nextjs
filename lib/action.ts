"use server";

import { useSearchParams } from "next/navigation";

export const action = async (formData: FormData) => {
	const status = formData.get("status");
	const task = formData.get("description");
	const data = { status, description: task };
	const response = await fetch(`${process.env.API_URL}/api/todos`, {
		method: "POST",
		body: JSON.stringify({ data }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.API_TOKEN}`,
		},
	});
	const result = await response.json();
};

type Params = {
	status?: "pending" | "completed" | "all";
	search?: string;
};
export const getTodos = async (searchParams: Params) => {
	let query = "";

	if (searchParams.search) {
		query = `filters[description][$contains]=${searchParams.search}`;
	} else if (searchParams.status !== "all" && searchParams.status) {
		console.log("status");
		query = `filters[status][$eq]=${searchParams.status}`;
	} else {
		query = "";
	}

	try {
		const response = await fetch(
			`${process.env.API_URL}/api/todos?sort[1]=createdAt:desc&${query}`,
			{
				cache: "no-store",
				headers: {
					Authorization: `Bearer ${process.env.API_TOKEN}`,
				},
			}
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
