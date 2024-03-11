import ContactCard from "./contact_card";

const ComponentHeader = () => {
	return (
<div className="p-4">
<div className="relative max-w-6xl mx-auto md:max-w-7xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
  <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
				className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                src={"./images/12.png"}
				alt="profile"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-sm text-slate-400">Product Security</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-sm text-slate-400">AppSec</span>
              </div>

              <div className="p-3 text-center">
                <span className="text-sm text-slate-400">Bug Bounties</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
            Nishant Jain
          </h3>
          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
		  Boston&nbsp;
            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">
				 (open to relocation)
			</i>
          </div>
        </div>
        <div className="mt-6 py-2 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
			  <p>
				<b>TL;DR</b> I worked in <b>product security at Make My Trip and AppSec at Tinder</b>. I also pursued my passion for security through <b>Bug Bounties</b> where I found vulnerabilities at major
				companies such as <b> GitHub, GitLab, and GlassDoor.</b> I actively contribute to the sec community through
				to <b>open-source projects</b> and the creation of&nbsp;
				<a href="https://infosechub.io" target="_blank" rel="noreferrer" className="text-lg underline">infoSecHub.io</a>
				&nbsp;I am currently completing my Master's in Cybersecurity at Northeastern
				University, further enhancing my expertise in the field. (May, 2023)
				</p>
              </p>
              <a href={"./docs/CV.pdf"} target="_blank" rel="noreferrer" className="font-normal text-slate-700 hover:text-slate-400">
				Find my CV here
              </a>
            </div>
          </div>
		  <ContactCard/>
        </div>
      </div>
    </div>
</div>
  );
};

export default ComponentHeader;