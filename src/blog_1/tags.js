const Tags = () => {
	return (
		<div>
			<div class="flex flex-wrap items-end justify-center space-x-2 space-y-2 text-xl">
				<span
					class="inline-block whitespace-nowrap rounded-full bg-primary-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
					GraphQL
				</span>
				<span
					class="inline-block whitespace-nowrap rounded-full bg-secondary-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800">
					CodeReview
				</span>
				<span
					class="inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700">
					BurpSuite
				</span>
				<span
					class="inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700">
					InQL
				</span>
				<span
					class="inline-block whitespace-nowrap rounded-full bg-warning-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-warning-800">
					OpenSource
				</span>
				<span
					class="inline-block whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
					Automation
				</span>
			</div>
		</div>
	)
}
export default Tags;