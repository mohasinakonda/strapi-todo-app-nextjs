import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe } from "./lib/load-me";

export async function middleware(request: NextRequest) {
	const user = await getMe();
	const url = request.nextUrl.clone();
	if (!user.ok) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
	if ((user.ok && url.pathname == "/login") || url.pathname == "/register") {
		url.pathname = "/todos";
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/todos", "/login", "/register"],
};
