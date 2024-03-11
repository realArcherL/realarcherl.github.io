const Timeline2021 = () => {
    return (
        <div className="container mx-10 md:mx-auto w-auto">
            <ol className="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center md:gap-6">
                <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p className="text-gray-500 text-sm mt-2">Sep 2020 - Sep 2021</p>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                            Independent Security Researcher
                            <h5 className="font-small text-sm text-gray-600">
                                HackerOne | Synack Red Team
                            </h5>
                        </h4>
                        <p className="text-gray-500 mb-3">
                            <ul className="list-disc">
                                <li>Performed vulnerability assessments on web applications, identifying and reporting security vulnerabilities</li>
                                <li>Specialized in identifying various types of bugs, such as code injections, cross-site scripting and information disclosure vulnerabilities</li>
                                <li>Successfully identified and reported critical and high-rated security vulnerabilities in companies such as GitLab, GitHub, GlassDoor</li>
                                <li>Developed custom scripts in Python and Bash to automate and enhance the process of uncovering security vulnerabilities in web applications.</li>
                            </ul>
                        </p>
                    </div>
                </li>

                <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p className="text-gray-500 text-sm mt-2">May 2019 - August 2019</p>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                            Security Analyst Intern <h5 className="font-small text-sm text-gray-600">Make My Trip (Gurgaon, India)</h5>
                        </h4>
                        <p className="text-gray-500 mb-3">
                            <ul className="list-disc">
                                <li>Acquired expertise in OWASP top 10 vulnerabilities by learning and testing them on development and staging websites</li>
                                <li>Used advanced tools such as Burp Suite and Qualys software to conduct comprehensive audits of over 1,000+ domains</li>
                                <li>Collaborated in web security assessments to identify potential vulnerabilities</li>
                            </ul>
                        </p>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default Timeline2021