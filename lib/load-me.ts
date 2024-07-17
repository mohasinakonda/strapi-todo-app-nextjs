import { getAuthToken } from "./get-authtoken";
import { getBaseUrl } from "./get-baseurl";

export const getMe = async () => {
	const url = new URL("/api/users/me", getBaseUrl);
	const authToken = await getAuthToken();
	if (!authToken?.value) return { ok: false, data: null, error: null };

	try {
		const response = await fetch(url.href, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken.value}`,
			},
			cache: "no-cache",
		});
		const data = await response.json();
		if (data.error) return { ok: false, data: null, error: data.error };
		return { ok: true, data: data, error: null };
	} catch (error) {
		console.log(error);
		return { ok: false, data: null, error: error };
	}
};
