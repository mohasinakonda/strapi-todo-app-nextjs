import Link from "next/link";

type Props = {
	children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
	return (
		<main className="max-w-6xl mx-auto bg-slate-300 ">
			<div className="flex justify-between items-center p-5 bg-slate-400">
				<h1 className="text-3xl text-slate-100">Logo</h1>
				<nav>
					<ul className="flex gap-5">
						<li>
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/register">Register</Link>
						</li>
					</ul>
				</nav>
			</div>

			{children}
		</main>
	);
};

export default Layout;
