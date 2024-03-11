import { ComponentHeader, Timeline2022, Timeline2021, ComponentHackerone, OpenSourceWork, ComponentFooter, ComponentBlog } from "../components/index"

function Portfolio() {
	return (
		<div>
			{/* HEADER */}
			<ComponentHeader />
			<ComponentHackerone />
			<ComponentBlog />

			<OpenSourceWork />

			<Timeline2022 />
			<Timeline2021 />

			{/* FOOTER */}
			<ComponentFooter />
		</div>
	);
}

export default Portfolio;
