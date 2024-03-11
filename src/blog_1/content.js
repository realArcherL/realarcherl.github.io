import Code1 from './code_show_1';
import { Alert, Tooltip } from "@material-tailwind/react";
import Code2 from './code_show_2';
import Code3 from './code_show_3';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Code4 from './code_show_4';

const Blog1 = () => {

	return (
		<div className="flex flex-col text-center items-center mb-5">
			<h2 className="text-4xl font-bold my-4">
				Using efficient tooling to hunt GraphQL security issues
			</h2>
			<div className="text-normal text-justify w-2/3">

				{/* First 3 paragraphs */}

				<div>
					<p className="mb-2">
						Tooling is crucial for efficiently identifying and enumerating resources.
						This blog will primarily focus on my experiences as a bug bounty hunter, particularly
						in programs built within JavaScript and GraphQL ecosystems. Typically, I begin my hunt
						by targeting the main application before branching out to subdomains.
						Focusing on the primary application offers higher stakes and is more fun.
					</p>

					{/* TL;DR BOX */}

					<p className="block rounded-lg p-6 shadow-lg mb-2 bg-blue-gray-300">
						<b>TL;DR:</b> Using tools that fit your specific needs will enable you to find information more quickly,
						reliably, and in an organized manner. The blog covers mostly GraphQL issues.
					</p>

					<p className="mb-2">
						When it comes to the popularity of GraphQL, it was the fourth most popular API Technology, with its share
						growing from (24% to 28%) according to&nbsp;
						<a
							href="https://www.postman.com/state-of-api/api-technologies/#api-technologies"
							className="underline"
							target="_blank"
							rel="noreferrer"
						>
							Postman's 2022 State of the API Report.
						</a>
						&nbsp;Yet everyone still wonders&nbsp;
						<a
							href="https://ilikekillnerds.com/2023/02/why-dont-you-hear-much-about-graphql-these-days/"
							className="underline"
							target="_blank"
							rel="noreferrer"
						>
							Why Don’t We Hear Much About GraphQL These Days?
						</a>
					</p>
				</div>

				{/* Vulnerable Web Application */}

				<div>
					<p className="mb-2 mt-6">
						<p className="text-xl  font-bold">
							Vulnerable Web App
						</p>
						Here we have a vulnerable implementation of my very dear project&nbsp;
						<a
							href="https://infosechub.io"
							className="underline"
							target="_blank"
							rel="noreferrer"
						>
							InfoSecHub.io
						</a>
					</p>

					{/* COMMENT */}
					<div class="border-l-4 border-gray-400 pl-4 py-2 my-4">
						<p class="text-gray-600 italic">InfoSecHub.io is in beta-testing.</p>
					</div>

					<p className="mb-2">
						This GraphQL instance enables users to sign up and share links to useful posts, blogs, or videos.
						Other users can then upvote or downvote the shared content based on their preferences.
					</p>

				</div>

				{/* ISSUEs */}

				<div className="mt-6">
					<p className="text-xl font-bold">
						Authorization Issues
					</p>

					Using the query below, an unauthenticated user can view all the posts on InfoSecHub.io (This app has
					introspection enabled on it's GraphQL instance.)

					{/* Image1 */}
					<img src={"./blog1/1.png"} alt="graphql playground captures for the blog" className='mt-2' />

					{/* Graphql query highligh */}
					<Code1 />

					<p>
						Each post on InfoSecHub must be associated with a user; hence we can query the user
						information for each post using the following GraphQL query. Before querying the users
						who posted the links, we need to be authenticated. Let's sign up, create an account on
						InfoSecHub, and then try the query again.
					</p>

					{/* Image2 */}

					<img src={"./blog1/2.png"} alt="graphql playground captures for the blog" className='mt-2' />

					<Code2 />

					{/* COMMENT */}
					<div class="border-l-4 border-gray-400 pl-4 py-2 my-4">
						<p class="text-gray-600 italic">The current user here is test2, with emailID test2@infosechub.io</p>
					</div>

					<p className='my-2'>

						As test2 user, we can view all the users who have posted links on InfoSecHub, but we cannot see their email
						addresses except ours.
						This is great, as it indicates that the application is secure and does not expose sensitive information,
						or does it?
					</p>

					{/*  ALERT */}

					<Alert color="green" className='text-xl'>Can we fetch the email IDs of all the users using a different query?</Alert>

					<p className='my-2'>
						Not all websites are cool and provide a playground to its users, which is why we will be hitting the graphQL
						endpoint with&nbsp;

						<a href="https://github.com/doyensec/inql"
							className="underline"
							target="_blank"
							rel="noreferrer"
						>
							InQL
						</a>
					</p>

					{/* Image3 */}
					<img src={"./blog1/3.png"} alt="graphql playground captures for the blog" className='mt-2' />

					{/* COMMENT */}
					<div class="border-l-4 border-gray-400 pl-4 py-2 my-4">
						<p class="text-gray-600 italic">This is InQL's graphQL playground, and we are
							using the auto-complete feature to build queries.
						</p>
					</div>

					{/* Image4 */}
					<img src={"./blog1/5.png"} alt="graphql playground captures for the blog" className='mt-2' />
					<Code3 />

					<p className='my-2'>
						After firing up the tool and reading the documentation, we discovered that the earlier
						query used to fetch posts on InfoSecHub also allowed us <b>an unauthenticated user</b> to fetch information about the
						users who posted them using the <b><i>postedBy</i></b> property. To our surprise, the users' email
						addresses were visible, indicating a security vulnerability in the&nbsp;
						<Tooltip content="Critical bug, Panic Maxx!!" >
							application.
						</Tooltip>
					</p>

					<Alert color="green" className='text-xl'>
						But wait, is it the only place?
						If we further investigate the query, can we obtain email addresses by fetching user details from the earlier query?
					</Alert>

					{/* Image5 */}
					<img src={"./blog1/6.png"} alt="graphql playground captures for the blog" className='mt-2' />
					<Code4 />

					<p className='my-2'>
						Well, guess what there is. What if this was a more extensive schema with multiple values? How would that work?
						How would we find out about each query, including the field <b><i>user</i></b>? Of course, we can read the schema,
						but who wants to do that?
					</p>

					{/* COMMENT */}
					<div class="border-l-4 border-gray-400 pl-4 py-2 my-4">
						<p class="text-gray-600 italic">
							How about spending a week trying to automate it? :P, good news is that you don't have to.
						</p>
					</div>

					<p className='mt-2'>
						You can find the tool and corresponding blog post&nbsp;
						<a
							href="https://blog.deesee.xyz/graphql/security/2020/04/13/graphql-permission-testing.html"
							className="underline"
							target="_blank"
							rel="noreferrer"
						>
							Graphql-path-enum
						</a>
					</p>

					{/* CODE BLOCK 1 (let the code be stuck to the left without tab padding)*/}
					<SyntaxHighlighter language="bash" style={docco} className="my-4 text-sm">
						{`graphql-path-enum (master ✗) ./graphql-path-enum -i infosechub.json -t User
Found 7 ways to reach the "User" node:
- Query (feed) -> Feed (links) -> Link (postedBy) -> User
- Query (feed) -> Feed (links) -> Link (votes) -> Vote (user) -> User
- Query (feed) -> Feed (links) -> Link (downvotes) -> Downvote (user) -> User
- Query (link) -> Link (postedBy) -> User
- Query (link) -> Link (votes) -> Vote (user) -> User
- Query (link) -> Link (downvotes) -> Downvote (user) -> User
- Query (users) -> User`}
					</SyntaxHighlighter>


					{/* ALERT */}

					<Alert color="red" className='text-xl'>
						Guess what? All of them are vulnerable. The question is why? Let's dive into the code. (these are only queries, mutations
						are equally susceptible to the attack.)
					</Alert>

					<p className='my-2'>
						The resolvers are where the actual processing of the GraphQL query happens.
						In our case, the dev, me :), only had a very naive level check like this,
						i.e., permission checks in user resolver:
					</p>

					{/* CODE BLOCK 1 (let the code be stuck to the left without tab padding)*/}
					<SyntaxHighlighter language="javascript" style={docco} className="my-4 text-sm">
						{`
// This is the resolver function for the query users. 
async function users(parent, args, context, info) {
	const { userId } = auth(context)
	const users = await context.prisma.user.findMany()
	users.forEach(user => {
		if (userId && userId !== user.id) {
			user.email = null
		}
		// Check other properties as needed
	});
	return users;
}
						`}
					</SyntaxHighlighter>


					<p className='my-2'>
						How do we fix this though? We can use the following:
						<ul>
							<li>
								1.&nbsp;
								<a
									href="https://www.apollographql.com/docs/apollo-server/security/authentication/#authorization-via-custom-directives"
									className="underline"
									target="_blank"
									rel="noreferrer"
								>
									<b><i>ContextValue</i></b> Fixes
								</a>
								&nbsp;Something which we will also do (API-wide checks).
							</li>
							<li>
								2. You can also use&nbsp;
								<a
									href="https://github.com/dimatill/graphql-shield"
									className="underline"
									target="_blank"
									rel="noreferrer"
								>
									GraphQL shield.
								</a>
							</li>
						</ul>

						We can create a new file named <b><i>Users.js</i></b> in the same folder as the resolvers along with all the resolvers
						and do <b><i>contextValue</i></b> fixes on the <b><i>email</i></b> field like so:
					</p>

					{/* CODE BLOCK 2 (let the code be stuck to the left without tab padding)*/}
					<SyntaxHighlighter language="javascript" style={docco} className="my-4 text-sm">
						{`
function email(parent, args, context, info) {
	const { userId } = auth(context)
	if (userId && userId == parent.id) {
		return parent.email
	} else {
		return null
	}
}
module.exports = {
    email
}
						`}
					</SyntaxHighlighter>

					<p className='my-2'>
						What would a fix using graphQL-Shield look like.
					</p>

					{/* CODE BLOCK 2 (let the code be stuck to the left without tab padding)*/}
					<SyntaxHighlighter language="javascript" style={docco} className="my-4 text-sm">
						{`
const isAuthenticated = rule()(
  async (parent, args, context) => {
    // logic
  }
);

const isAuthorized = rule()(
  async (parent, args, context, info) => {
    const { userId } = context
    // Authorization check logic

  }
)

const permissions = {
  Query: {
    users: and(isAuthorized, isAuthenticated),
    mySavedLinks: and(isAuthorized, isAuthenticated),
  },
  Mutation: {
    createTags: isAuthenticated,
    post: isAuthenticated,
    vote: isAuthenticated,
    downvote: isAuthenticated,
    deleteLink: and(isAuthorized, isAuthenticated),
    saveLink: isAuthenticated,
    updateSavedLink: and(isAuthorized, isAuthenticated),
  },

};					
`}
					</SyntaxHighlighter>


					{/* Image6 */}
					<img src={"./blog1/7.png"} alt="graphql playground captures for the blog" className='mt-2' />

					{/* Alert */}
					<Alert color="blue" className='text-xl my-2'>
						Once the correct fix is deployed
					</Alert>


					<p className='my-2'>
						When it comes to bug bounties, being the first to report a finding is crucial. To achieve this,
						not only do you need to be efficient in discovering issues, but you also need to stay up-to-date
						with the latest changes and updates.

						In context of graphQL you should be able to detect the schema changes. One tool which can come in very
						handy is&nbsp;
						<a
							href="https://gitlab.com/dee-see/graphql-api-monitor"
							className="underline"
							target="_blank"
							rel="noreferrer"
						>
							GraphQL-API-Monitor
						</a> tool.
					</p>

					<p className='my-2'>
						Once you have the configs set up, all you have to do is point it to the GraphQL API of your target.
						The config file would look something like this:
					</p>

					{/* CODE BLOCK 3 (let the code be stuck to the left without tab padding)*/}
					<SyntaxHighlighter language="json" style={docco} className="my-4 text-sm">
						{`
{
		"dataDirectory": ".",
		"webhook": "https://discord.com/api/webhooks/ABCD",
		"targets": [
			{
				"name": "InfoSecHub.io",
				"url": "http://localhost:4000",
				"type": "Introspection"
			}
		]
}
						`}
					</SyntaxHighlighter>


					<p className='my-2'>
						The diffs would allow you to see the changes like this:
					</p>

					{/* CODE BLOCK 3 (let the code be stuck to the left without tab padding)*/}
					<SyntaxHighlighter language="git" style={docco} className="my-4 text-sm">
						{`
diff --git a/schema.graphql b/schema.graphql
index 71d9862..98eb929 100644
--- a/schema.graphql
+++ b/schema.graphql
@@ -56,6 +56,7 @@ type User {
id: ID!
name: String!
email: String
+  phone: String
links: [Link!]!
votes: [Vote!]!
downvotes: [Downvote!]!
						`}
					</SyntaxHighlighter>

					<p className='my-2'>
						As you can see in the new schema changes, a phone number field has been added, which potentially provides
						more Personally Identifiable Information (PII) to exploit.
						As engineers, this leads us to a question: should we leave introspection enabled in our GraphQL
						implementations? There are two schools of thought here. On the one hand, it allows users to use our data
						better. On the other hand, it also leaves room for anyone to discover security issues in our implementation,
						and not all security experts are bug bounty hunters.<br />
						Based on my experience, the trend to combat the latter is for companies to enable
						introspection in their test environments, where they invite bug bounty hunters to identify and report
						vulnerabilities in their implementation. This allows companies to identify and fix potential security issues
						before malicious actors exploit them, but what's stopping adversaries from joining the program and using the
						learned information for malicious purposes?
						<br />
						Ultimately, it is up to companies and their respective security teams to decide whether to leave introspection enabled.
					</p>


				</div>

				{/* Has this helped me? */}
				<div className='mt-5'>
					<p className="text-2xl  font-bold">
						How has this approach helped me
					</p>

					<p>

						Throughout my brief career as a bug bounty hunter, I've found these tricks incredibly helpful
						in reporting numerous GraphQL issues. I'm grateful for the opportunity to have learned so
						much in such a short time. Below are a few examples of the reports I've submitted, ranging
						from low to critical severity. I hope these examples demonstrate the value of persistence and
						continuous learning in the bug-hunting community.
					</p>

					<img src={"./blog1/10.png"} alt="graphql playground captures for the blog" className='mt-2 flex flex-col justify-center items-center' />

					<p className="text-3xl  font-bold mt-8">
						Closing thoughts
					</p>

					<p className='my-2'>
						While several tools are available that perform similar functions to those I mentioned, I prefer to use these because they are open-sourced
						and are in the languages I can code, so it's easy to tweak them. These help you with two things: move faster and learn new things,
						like an edge case you missed or a better coding style. The idea is to utilize the existing tools and modify them instead of reinventing
						the wheel again and again. I hope it helps. Until then happy hunting :)
					</p>

				</div>
			</div>
		</div >
	)
}

export default Blog1;