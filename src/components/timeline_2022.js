const ComponentTimeline2022 = () => {
    return (
        <div className="container mt-12 mx-10 md:mx-auto w-auto">
            <h2 class="font-semibold text-3xl mb-5 text-center">
                Experience Timeline
            </h2>

            <ol className="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center md:gap-6">
                <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p className="text-gray-500 text-sm mt-2">Sep 2022 - Present</p>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                            Teaching Assistant <h5 className="font-small text-sm text-gray-600">Northeastern University, Network Security Practices (CY5150)</h5>
                        </h4>
                        <p className="text-gray-500 mb-3">
                            <ul className="list-disc">
                                <li>Created and maintained comprehensive course materials, including labs and CTFs, for the course</li>
                                <li>Participated in the development and implementation of course assessments and exams</li>
                                <li>Assisted in the overall administration of the course, ensuring that students had access to the resources and support they needed to succeed.</li>
                            </ul>
                        </p>
                    </div>
                </li>

                <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p className="text-gray-500 text-sm mt-2">May 2022 - August 2022</p>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                            AppSec Engineering Intern <h5 className="font-small text-sm text-gray-600">Tinder Inc (Los Angeles, CA) </h5>
                        </h4>
                        <p className="text-gray-500 mb-3">
                            <ul className="list-disc">
                                <li>Performed code reviews on the source code of TinderWeb and internal toolings, identifying and addressing security issues</li>
                                <li>Developed tools to manage supply chain issues in NPM and Python environments, improving security and integrity</li>
                                <li>Automated the security review process for open-source projects, streamlining and enhancing the review process</li>
                                <li>Contributed to the overall security and integrity of Tinder's software and infrastructure.</li>
                            </ul>
                        </p>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default ComponentTimeline2022