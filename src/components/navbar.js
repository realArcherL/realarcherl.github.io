import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div>
			<nav className="m-2">
				<ul className="flex flex-row justify-center text-2xl">
					<li className="p-2">
						<Link to="/">About Me</Link>
					</li>
					<li className="p-2">
						<Link to="/blog">Blog</Link>
					</li>
					<li className="p-2">
						<Link to="/writeups">Writeups</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default NavBar;