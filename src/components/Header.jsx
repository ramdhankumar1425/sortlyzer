import React, { useState } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FaRandom } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

import { useProvider } from "../context";

const Header = () => {
    const {
        isOn,
        setIsOn,
        arrSize,
        setArrSize,
        algorithm,
        setAlgorithm,
        speed,
        setSpeed,
        handleRandomizeArray,
        handleReset,
    } = useProvider();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-gray-100">
            <div className="mx-auto flex gap-5 items-center justify-between px-8 md:px-10 py-3">
                {/* Logo Section */}
                <div className="flex items-center py-0.5 cursor-pointer">
                    <span className="text-2xl font-bold">Sortlyzer</span>
                </div>

                {/* Hamburger menu icon */}
                <div
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center md:hidden scale-125"
                >
                    <MenuToggleIcon isOpen={isMenuOpen} />
                </div>

                {/* Menu Buttons */}
                <nav
                    className={`md:flex ${
                        isMenuOpen ? "flex" : "hidden"
                    } flex-wrap absolute md:static top-[60px] w-full md:w-auto left-0 items-center justify-center gap-5 md:gap-6 lg:gap-7 p-3 md:p-0 bg-gray-800`}
                >
                    {/* Randomize Array Button */}
                    <button
                        onClick={handleRandomizeArray}
                        disabled={isOn}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition p-1.5 rounded hover:ring-2 ring-blue-600"
                        title="Randomize array"
                    >
                        <span>Randomize</span>
                        <FaRandom />
                    </button>

                    {/* Array size selector */}
                    <select
                        value={arrSize}
                        onChange={(e) => setArrSize(e.target.value)}
                        disabled={isOn}
                        className="bg-gray-700 hover:bg-gray-600 transition text-white px-1 py-1.5 rounded hover:ring-2 ring-blue-600 cursor-pointer focus:outline-none"
                        title="Array size"
                    >
                        <option value={10} disabled hidden>
                            Array Size
                        </option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                        <option value={1000}>1000</option>
                    </select>

                    {/* Algorithm selector */}
                    <select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                        disabled={isOn}
                        className="bg-gray-700 hover:bg-gray-600 transition text-white p-1.5 rounded hover:ring-2 ring-blue-600 cursor-pointer focus:outline-none"
                        title="Sorting Algorithm"
                    >
                        <option value="bubble">Bubble Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                    </select>

                    {/* Speed Selector */}
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        disabled={isOn}
                        className="bg-gray-700 hover:bg-gray-600 transition text-white p-1.5 rounded hover:ring-2 ring-blue-600 cursor-pointer focus:outline-none"
                        title="Speed"
                    >
                        <option value={1.001} disabled hidden>
                            Speed
                        </option>
                        <option value={1}>Slowest</option>
                        <option value={2}>Slow</option>
                        <option value={3}>Normal</option>
                        <option value={4}>Fast</option>
                        <option value={5}>Fastest</option>
                    </select>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="hidden bg-gray-700 hover:bg-gray-600 transition p-2.5 rounded hover:ring-2 ring-blue-600"
                        title="Reset"
                    >
                        <RiResetLeftLine />
                    </button>

                    {/* ON/OFF Button */}
                    <button
                        onClick={() => setIsOn((prev) => !prev)}
                        className="bg-gray-700 hover:bg-gray-600 transition p-2.5 rounded hover:ring-2 ring-blue-600"
                    >
                        {isOn ? <CiPause1 /> : <CiPlay1 />}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;

const MenuToggleIcon = ({ isOpen }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="cursor-pointer stroke-current text-white"
        >
            {/* Top-left to bottom-right diagonal */}
            <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                strokeLinecap="round"
                strokeWidth="2"
                className={`origin-center transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 scale-0"
                }`}
            />

            {/* Top-right to bottom-left diagonal */}
            <line
                x1="6"
                y1="18"
                x2="18"
                y2="6"
                strokeLinecap="round"
                strokeWidth="2"
                className={`origin-center transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 scale-0"
                }`}
            />

            {/* Hamburger menu lines */}
            <line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                strokeLinecap="round"
                strokeWidth="2"
                className={`origin-center transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
            />
            <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                strokeLinecap="round"
                strokeWidth="2"
                className={`origin-center transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
            />
            <line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                strokeLinecap="round"
                strokeWidth="2"
                className={`origin-center transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
            />
        </svg>
    );
};
