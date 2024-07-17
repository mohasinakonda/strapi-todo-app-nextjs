import { cookies } from "next/headers";

export const getAuthToken = () => {
	return cookies().get("token");
};
