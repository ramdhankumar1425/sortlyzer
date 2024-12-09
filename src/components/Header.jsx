import React, { useState } from "react";
import {
    FaFastForward,
    FaFastBackward,
    FaPause,
    FaPlay,
    FaRandom,
} from "react-icons/fa";
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
        handleStepByStepVisualization,
        isSorted,
    } = useProvider();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-gray-100 shadow-lg">
            <div className="mx-auto flex gap-5 items-center justify-between px-8 lg:px-10 py-3">
                {/* Logo Section */}
                <div className="flex items-center py-0.5 cursor-pointer">
                    <span className="text-2xl font-bold">Sortlyzer</span>
                </div>

                {/* Hamburger menu icon */}
                <div
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center lg:hidden scale-125"
                >
                    <MenuToggleIcon isOpen={isMenuOpen} />
                </div>

                {/* Menu Buttons */}
                <nav
                    className={`lg:flex ${
                        isMenuOpen ? "flex" : "hidden"
                    } flex-wrap absolute lg:static top-[60px] w-full lg:w-auto left-0 items-center justify-center gap-5 md:gap-6 lg:gap-7 p-3 lg:p-0 bg-gray-800`}
                >
                    {/* Randomize Array Button */}
                    <button
                        onClick={handleRandomizeArray}
                        disabled={isOn}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition p-1.5 rounded hover:ring-1 ring-blue-600"
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
                        className="bg-gray-700 hover:bg-gray-600 transition text-white px-1 py-1.5 rounded hover:ring-1 ring-blue-600 cursor-pointer focus:outline-none"
                        title="Array size"
                    >
                        <option value={25} disabled hidden>
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
                        className="bg-gray-700 hover:bg-gray-600 transition text-white p-1.5 rounded hover:ring-1 ring-blue-600 cursor-pointer focus:outline-none"
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
                        className="bg-gray-700 hover:bg-gray-600 transition text-white p-1.5 rounded hover:ring-1 ring-blue-600 cursor-pointer focus:outline-none"
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
                        disabled={isOn}
                        className="bg-gray-700 hover:bg-gray-600 transition p-2.5 rounded hover:ring-1 ring-blue-600"
                        title="Reset"
                    >
                        <RiResetLeftLine />
                    </button>

                    {/* ON/OFF and backword forward button */}
                    <div className="bg-gray-700 flex items-center gap-1 rounded overflow-hidden hover:ring-1 ring-blue-600 transition">
                        {/* Backword */}
                        <button
                            onClick={() =>
                                handleStepByStepVisualization("Backword")
                            }
                            disabled={isOn || !isSorted}
                            className="hover:bg-gray-600 p-2.5"
                            title="Previous Step"
                        >
                            <FaFastBackward />
                        </button>
                        {/* ON/OFF */}
                        <button
                            onClick={() => {
                                setIsOn((prev) => !prev);
                                setIsMenuOpen(false);
                            }}
                            className="hover:bg-gray-600 p-2.5"
                            title={
                                isSorted ? (isOn ? "Pause" : "Resume") : "Start"
                            }
                        >
                            {isOn ? <FaPause /> : <FaPlay />}
                        </button>
                        {/* Forward */}
                        <button
                            onClick={() =>
                                handleStepByStepVisualization("Forward")
                            }
                            disabled={isOn || !isSorted}
                            className="hover:bg-gray-600 p-2.5"
                            title="Next Step"
                        >
                            <FaFastForward />
                        </button>
                    </div>
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

const ThemeToggle = ({ isDark }) => {
    return (
        <div className="relative flex items-center gap-2 px-2 py-1.5 rounded-full bg-gray-700 cursor-pointer hover:ring-1 ring-blue-600 transition">
            {/* Sun */}
            <svg
                className=""
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className="fill-yellow-400"
                    d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                />
                <path
                    className="fill-yellow-400"
                    d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                />
            </svg>
            {/* Moon */}
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                    className="fill-slate-400"
                    d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                />
                <path
                    className="fill-slate-500"
                    d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                />
            </svg>

            <svg
                className={`absolute transition-transform duration-200 transform ${
                    isDark ? "translate-x-6" : "-translate-x-1"
                }`}
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="10"
                    cy="10"
                    r="10"
                    fill={isDark ? "white" : "black"}
                />
            </svg>
        </div>
    );
};
