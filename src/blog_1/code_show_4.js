import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Code4() {

	const query_1 = <SyntaxHighlighter language="javascript" style={docco} className="content-start text-sm">
		{`
query{
	users{
	  id
	  name
	  email
	  links{
		postedBy{
		  id
		  name
		  email
		}
	  }
	}
  }  
`}
	</SyntaxHighlighter>

	const response_1 = <SyntaxHighlighter language="json" style={docco} className="content-start text-sm">
		{`
{
	"data": {
	  "users": [
		{
		  "id": "aaf1d17c-a4ef-4c07-a5dd-a94d50162677",
		  "name": "test1",
		  "email": null,
		  "links": [
			{
			  "postedBy": {
				"id": "aaf1d17c-a4ef-4c07-a5dd-a94d50162677",
				"name": "test1",
				"email": "test-1@infosechub.io"
			  }
			},
			{
			  "postedBy": {
				"id": "aaf1d17c-a4ef-4c07-a5dd-a94d50162677",
				"name": "test1",
				"email": "test-1@infosechub.io"
			  }
			}
		  ]
		},
		{
		  "id": "e684d974-d216-4e25-a7e3-e485fc26115f",
		  "name": "test2",
		  "email": "test-2@infosechub.io",
		  "links": []
		}
	  ]
	}
  }
  `}
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