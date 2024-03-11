import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Code1() {

	const query_1 = <SyntaxHighlighter language="javascript" style={docco} className="content-start text-sm">
		{`
		query{
			feed{
			  links{
				id
				url
				title
				description
			  }
			}
		  }`}
	</SyntaxHighlighter>

	const response_1 = <SyntaxHighlighter language="json" style={docco} className="content-start text-sm">
		{`
{
	"data": {
	  "feed": {
		"links": [
		  {
			"id": "9d56ad3c-8613-4c88-9ddb-54a02d564a3d",
			"url": "https://example.com",
			"title": "Title -1 for the example post on Infosechub.io",
			"description": "This is an example website"
		  },
		  {
			"id": "ffdeffc9-8337-465d-906c-6f54305b05c5",
			"url": "https://infosechub.io",
			"title": "Title -2 for the example post on Infosechub.io",
			"description": "This is the best resource website for hackers"
		  }
		]
	  }
	}
  }`}
	</SyntaxHighlighter>


	const data = [
		{
			label: "Query",
			value: "query",
			desc: query_1,
		},
		{
			label: "Response",
			value: "response",
			desc: response_1,
		}
	];

	return (
		<Tabs value="html">
			<TabsHeader>
				{data.map(({ label, value }) => (
					<Tab key={value} value={value}>
						{label}
					</Tab>
				))}
			</TabsHeader>
			<TabsBody>
				{data.map(({ value, desc }) => (
					<TabPanel key={value} value={value}>
						{desc}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	);
}