const ComponentHackerone = () => {
	return (
		<div className="container px-6 mx-auto">
			<section className="mb-12 text-gray-800">
				<div className="block rounded-lg shadow-lg bg-white">
					<div className="flex flex-wrap items-center">
						<div className="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
							<img src={"./images/hackerReview.png"} alt="Trendy Pants and Shoes"
								className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
						</div>
						<div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
							<div className="px-6 py-12 md:px-12">
								<h2 className="text-3xl font-bold mb-6">
									<a
										className="underline"
										href="https://hackerone.com/deneuve"
										target="_blank"
										rel="noreferrer">
										HackerOne (@deneuve)
									</a>
									&nbsp;Year In Review for 2021</h2>
								<p className="text-gray-500 mb-6">
									<b>All time reputation:</b> 1118 (Ranked 1239)&nbsp;
									<b>Signal:</b> 5.91 (87th percentile)&nbsp;
									<b>Impact:</b> 25.68 (96th percentile)&nbsp;
								</p>
								<ul className="p-2 list-disc">
									<li>
										<b>Ranked 4,</b> on HackerOne's (Upcoming Hackers) leader board for 2021 (Q1)&nbsp;
										<a
											className="underline text-sm"
											href="https://hackerone.com/leaderboard/up_and_comers?year=2021&quarter=1"
											target="_blank"
											rel="noreferrer">
											(view stats here)
										</a>
									</li>
									<li>
										<b>Ranked 39,</b> on HackerOne's leader board for 2021 (Q1, India) with <b>an Impact: 32.86&nbsp;</b>
										<a
											className="underline text-sm"
											href="https://hackerone.com/leaderboard/country?year=2021&quarter=1&country=IN"
											target="_blank"
											rel="noreferrer">
											(view stats here)
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

		</div>
	)
}

export default ComponentHackerone