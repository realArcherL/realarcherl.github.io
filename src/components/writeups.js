import { Link } from "react-router-dom";

const WriteUps = () => {
    return (
        <div class="flex justify-center mt-12 ml-3">
        <Link to="/writeups/1">
        <div
        class="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
        <img
            class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={"./images/wrt1.png"}
            alt="" />
        <div class="flex flex-col justify-start p-6">
            <h5
            class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            Challenge 0323 by 0xGodson_ and BrunoModificato
            </h5>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Challenge by Intigriti
            </p>
            {/* <p class="text-xs text-neutral-500 dark:text-neutral-300">
            Last updated 3 mins ago
            </p> */}
        </div>
        </div>
        </Link>
        </div>
    );
};

export default WriteUps;