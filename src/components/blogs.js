const ComponentBlog = () => {
    return (
        <div class="container mt-24 px-6 mx-auto">

            <section class="text-gray-800 block rounded-lg shadow-lg">
                <div class="flex flex-wrap items-center">
                    <div class="grow-0 shrink-0 basis-auto w-full lg:w-4/12 mb-6 md:mb-0 px-3">
                        {/* <p class="uppercase text-black font-bold mb-6">Blogs I wrote for some of the companies</p> */}
                        <h2 class="text-3xl font-bold mb-6">
                            Featured Blogs
                        </h2>

                        <p class="text-gray-500 mb-12">
                            I enjoy contributing to cybersecurity blogs because it helps to advance the field by promoting best practices and fostering collaboration.
                            It also allows me to share my knowledge and expertise with a wider audience.
                        </p>
                    </div>

                    <div class="grow-0 shrink-0 basis-auto w-full lg:w-8/12 mb-6 mb-md-0 px-3">
                        <div class="flex flex-wrap">
                            <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
                                <div class="flex">
                                    <div class="shrink-0">
                                        <div class="p-4 rounded-md shadow-lg">
                                            <img src={"./images/snyk.png"} alt="this is snyk logo" className="h-16" />
                                        </div>
                                    </div>
                                    <div class="grow ml-4">
                                        <p className="font-bold mb-1 underline">
                                            <a
                                                href="https://snyk.io/blog/exploring-extensions-of-dependency-confusion-attacks-via-npm-package-aliasing/"
                                                target="_blank"
                                                rel="noreferrer">
                                                Snyk' Blog on supply-chain
                                            </a>
                                        </p>
                                        <p class="text-gray-500">
                                            Exploring extensions of dependency confusion attacks via npm package aliasing

                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
                                <div class="flex">
                                    <div class="shrink-0">
                                        <div class="p-4 rounded-md shadow-lg">
                                            <img src={"./images/gitlab.png"} alt="this is GitLab logo" className="h-16" />
                                        </div>
                                    </div>
                                    <div class="grow ml-4">
                                        <p class="font-bold mb-1 underline">
                                            <a
                                                href="https://about.gitlab.com/blog/2021/06/11/how-i-use-gitlab-to-help-my-hack/"
                                                target="_blank"
                                                rel="noreferrer">
                                                GitLab's blog on security researches
                                            </a>
                                        </p>
                                        <p class="text-gray-500">
                                            How do bug bounty hunters use GitLab to help their hack?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    );
};

export default ComponentBlog;