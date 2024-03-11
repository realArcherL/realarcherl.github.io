const OpenSourceWork = () => {
    return (
        <div className="container mt-12 px-6 mx-auto">
            <div class="p-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
                <h2 class="font-semibold text-3xl mb-5 text-center">Open-Source Contributions</h2>
                <p>
                    Contributed to SecLists, the most comprehensive collection of lists used for security assessments,&nbsp;
                    <a
                        className="underline"
                        href="https://github.com/danielmiessler/SecLists/commits/master/Discovery/Web-Content/graphql.txt"
                        target="_blank"
                        rel="noreferrer">
                        added more keywords to their GraphQL path brute force list
                    </a>
                </p>
                <hr class="my-6 border-gray-300" />

                {/* Contribution 2 */}
                <p>
                    Identified and reported a security oversight on GitLab related to unauthorized ability to see the number of forks on a private repo using GraphQL,&nbsp;
                    <a
                        className="underline"
                        href="https://gitlab.com/gitlab-org/gitlab/-/issues/259693#note_423546592"
                        target="_blank"
                        rel="noreferrer">
                        #259693
                    </a>
                </p>
                <hr class="my-6 border-gray-300" />

                {/* Contribution 3 */}
                <p>
                    Assisted &nbsp;
                    <a
                        className="underline"
                        href="https://prisma.io"
                        target="_blank"
                        rel="noreferrer">
                        Prisma&nbsp;
                    </a>
                    the world's most popular and open-source TypeORM, with testing their&nbsp;
                    <a
                        className="underline"
                        href="https://github.com/prisma/prisma/blob/8fb82844dddeecf45d433bceff39b8671f3667da/packages/migrate/src/utils/setupMongo.ts"
                        target="_blank"
                        rel="noreferrer">
                        MongoDB&nbsp;
                    </a>
                    implementation
                </p>
                <hr class="my-6 border-gray-300" />

                {/* Contribution 4 */}
                <p>
                    Scripted a bot notifier for a bug bounty recon tool,&nbsp;
                    <a
                        className="underline"
                        href="https://github.com/harsh-bothra/Bheem/pull/28"
                        target="_blank"
                        rel="noreferrer">
                        Bheem
                    </a>
                    &nbsp;with more than 300 stars on GitHub
                </p>
            </div>
        </div >
    )
}

export default OpenSourceWork;
