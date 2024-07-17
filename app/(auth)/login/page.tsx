import { loginHandler } from "@/lib/action";

const Login = () => {
	return (
		<form
			action={loginHandler}
			className="max-w-xl mx-auto flex flex-col gap-5 mt-10"
		>
			<input
				className="border rounded-md py-2 px-3"
				type="email"
				name="email"
			/>
			<input
				className="border rounded-md py-2 px-3"
				type="password"
				name="password"
				id=""
			/>
			<button type="submit">submit</button>
		</form>
	);
};
export default Login;
