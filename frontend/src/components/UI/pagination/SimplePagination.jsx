import { React, useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function SimplePagination({
    page = 0,
    changePage,
    totalPages = 1,
}) {
    const [activePage, setActive] = useState(page);

    const next = () => {
        if (activePage === totalPages) return;
        setActive(activePage + 1);
    };

    const prev = () => {
        if (activePage === 1) return;
        setActive(activePage - 1);
    };

    useEffect(() => {
        changePage(activePage);
    }, [activePage, changePage]);

    return (
        <div className="flex w-full justify-center items-center gap-8 mx-auto my-8">
            <button
                onClick={prev}
                disabled={activePage === 1}
                className={`bg-white border border-gray-300 rounded p-2 ${
                    activePage === 1
                        ? ""
                        : "hover:bg-gray-100 hover:border-gray-700 focus:bg-gray-200 focus:border-gray-400"
                } `}
            >
                <ArrowLeftIcon strokeWidth={ activePage === 1 ? 1 : 2} className="h-4 w-4" />
            </button>
            <div color="gray" className="font-normal">
                Page <strong className="text-gray-900">{activePage}</strong> of{" "}
                <strong className="text-gray-900">{totalPages}</strong>
            </div>
            <button
                onClick={next}
                disabled={activePage === totalPages}
                className={`bg-white border border-gray-300 rounded p-2 ${
                    activePage === totalPages
                        ? ""
                        : "hover:bg-gray-100 hover:border-gray-700 focus:bg-gray-200 focus:border-gray-400"
                } `}
            >
                <ArrowRightIcon strokeWidth={activePage === totalPages ? 1 : 2} className="h-4 w-4" />
            </button>
        </div>
    );
}
