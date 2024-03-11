import Tags from "./tags.js";
import Blog1 from "./content.js";
import { ComponentFooter } from '../components';

const Blog = () => {
	return (
		<div>
			<Tags />
			{/* blog */}
			<div className='mt-5 flex flex-col mb-5'>
				<Blog1 />
			</div>
			<ComponentFooter />
		</div >
	);
}

export default Blog;
