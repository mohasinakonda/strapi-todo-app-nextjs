"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const action = async (formData: FormData) => {
	const status = formData.get("status");
	const task = formData.get("description");
	const assignee = formData.get("assignee");
	const data = { status, description: task, assignee };
	try {
		const response = await fetch(`${process.env.API_URL}/api/todos`, {
			method: "POST",
			body: JSON.stringify({ data }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});
		const result = await response.json();
		if (result.data) {
			redirect("/todos");
		}
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		console.log(error);
	}
};

export const updateTodo = async (formData: FormData, id: number) => {
	const status = formData.get("status");
	const task = formData.get("description");
	const assignee = formData.get("assignee");
	const data = { status, description: task, assignee };
	const removeEmptyData = Object.entries(data).filter(
		([_, value]) => value !== "" && value !== null
	);

	const updatedData = Object.fromEntries(removeEmptyData);

	try {
		const response = await fetch(`${process.env.API_URL}/api/todos/${id}`, {
			method: "PUT",
			body: JSON.stringify({ data: updatedData }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});

		const result = await response.json();
		console.log(result);
		if (result.data) {
			redirect("/todos");
		}
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		console.log(error);
	}
};

export const getUsers = async () => {
	try {
		const response = await fetch(`${process.env.API_URL}/api/users`, {
			cache: "no-store",
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
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
		query = `filters[status][$eq]=${
			searchParams.status == "pending" ? false : true
		}`;
	} else {
		query = "";
	}

	try {
		const response = await fetch(
			`${process.env.API_URL}/api/todos?sort[1]=createdAt:desc&populate=*&${query}`,
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

export const deleteTodo = async (id: number) => {
	try {
		const response = await fetch(`${process.env.API_URL}/api/todos/${id}`, {
			method: "delete",
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});
		const result = await response.json();
		if (result.data) {
			redirect("/todos");
		}
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		console.log(error);
	}
};
const config: Partial<ResponseCookie> = {
	maxAge: 60 * 60 * 24 * 7, // 1 week
	httpOnly: true,
	domain: process.env.DOMAIN || "localhost",
	path: "/",
	sameSite: "lax",
	secure: true,
};
export const loginHandler = async (formData: FormData) => {
	const credentials = {
		identifier: formData.get("email"),
		password: formData.get("password"),
	};
	try {
		const response = await fetch(`${process.env.API_URL}/api/auth/local`, {
			method: "post",
			body: JSON.stringify(credentials),
			headers: {
				"content-type": "application/json",
			},
			cache: "no-cache",
		});
		const result = await response.json();
		if (result.error) {
		}
		cookies().set("token", result.jwt, config);
		redirect("/todos");
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		} else {
			console.error(error);
		}
	}
};
