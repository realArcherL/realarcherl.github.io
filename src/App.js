import Portfolio from "./scenes/portfolio";
import Blog from "./blog_1/blog";
import { Route, Routes } from "react-router-dom";
import { NavBar, PersonalInfo, WriteUps } from "./components";
import Wrt1 from "./writeups/write_up_1";

function App() {
	return (
		<div>
			<PersonalInfo />
			<NavBar />
			<Routes>
				<Route default path="/" element={<Portfolio />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/writeups" element={<WriteUps />} />
				<Route path="/writeups/1" element={<Wrt1 />} />
			</Routes>
		</div>
	);
}

export default App;
