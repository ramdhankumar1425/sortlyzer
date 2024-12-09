import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { sleep } from "../algorithms/utils";
import bubbleSort from "../algorithms/BubbleSort";
import selectionSort from "../algorithms/SelectionSort";
import insertionSort from "../algorithms/InsertionSort";
import mergeSort from "../algorithms/MergeSort";
import quickSort from "../algorithms/QuickSort";

// Create a Context
const Context = createContext();

// Colors
// default - #9966ff
// action - #ff6384
// final - #4bc0c0

// Delay based on speed
// 1 - 1000
// 2 - 500
// 3 - 100
// 4 - 50
// 5 - 1

const colors = {
    def: "#9966ff",
    action: "#e80707",
    final: "#4bc0c0",
};
const maxElement = 5999;

// Provider component
export const Provider = ({ children }) => {
    const [isOn, setIsOn] = useState(false); // On/Off state
    const isOnRef = useRef(isOn);
    const [isSorted, setIsSorted] = useState(false);

    const [data, setData] = useState([]); // to store all steps of sorting
    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(25);
    const [styleArr, setStyleArr] = useState([]); // bar color array
    const [actionIndices, setActionIndices] = useState([]); // indices that are checked or updated

    const [algorithm, setAlgorithm] = useState("bubble");
    const [speed, setSpeed] = useState(1.001); // visualization speed
    const [index, setIndex] = useState(0);

    // Function to randomize array
    const handleRandomizeArray = () => {
        // console.log("Randomizing array...");
        let array = [];

        for (let i = 0; i < arrSize; i++) {
            let randomElement = Math.floor(Math.random() * maxElement);
            array[i] = randomElement;
        }

        setArr(array);

        // set values to default
        setIsOn(false);
        setIsSorted(false);
        setActionIndices([]);
        setData([]);
        setIndex(0);
    };

    // Master function to handle all sorting
    const handleSort = () => {
        // console.log("Sorting started...");

        let sortingData = [];

        if (algorithm == "bubble") {
            sortingData = bubbleSort(arr, arrSize);
        } else if (algorithm == "selection") {
            sortingData = selectionSort(arr, arrSize);
        } else if (algorithm == "insertion") {
            sortingData = insertionSort(arr, arrSize);
        } else if (algorithm == "merge") {
            sortingData = mergeSort(arr, arrSize);
        } else if (algorithm == "quick") {
            sortingData = quickSort(arr, arrSize);
        }

        // console.log("Sorting done...");

        setData(sortingData);
        setIsSorted(true);
    };

    // Function to manage styleArr
    const handleStyleArr = () => {
        const updatedStyleArr = arr.map((_, idx) =>
            actionIndices.includes(idx) ? colors.action : colors.def
        );

        setStyleArr(updatedStyleArr);
    };

    // Function to reset to default
    const handleReset = () => {
        // console.log("Resetting...");
        handleRandomizeArray();
    };

    // Function for final traversal
    const handleFinalTraversal = () => {
        // console.log("Final traversal...");
        let i = 0;

        // Final traversal
        const interval = setInterval(() => {
            if (i >= arrSize || !isOnRef.current) {
                setIsOn(false);
                clearInterval(interval);
                return;
            }

            setStyleArr((prev) =>
                prev.map((_, j) => (j <= i ? colors.final : colors.def))
            );

            i++;
        }, 10);
    };

    // Function to handle visualization
    const handleVisualization = async () => {
        // console.log("Visualization started...");
        let i = index;
        let ms = 1000;

        if (speed == 2) ms = 500;
        else if (speed == 3) ms = 100;
        else if (speed == 4) ms = 50;
        else if (speed == 5) ms = 1;

        const interval = setInterval(() => {
            // if visualization is turned off in between
            if (!isOnRef.current) {
                setIndex(i);
                clearInterval(interval);
                return;
            }
            // If visualization is completed
            else if (i >= data.length) {
                clearInterval(interval);
                setIndex(0);

                // For final color traversal
                handleFinalTraversal();
                return;
            }

            const currState = data[i++];

            setArr(currState.arr);
            setActionIndices(currState.actionIndices);
        }, ms);
    };

    // Function to handle step by step visualization
    const handleStepByStepVisualization = (direction) => {
        // console.log("Moving", direction);

        if (direction == "Forward" && index < data.length - 1) {
            const nextState = data[index + 1];

            setArr(nextState.arr);
            setActionIndices(nextState.actionIndices);

            setIndex((prev) => prev + 1);
        } else if (direction == "Backword" && index > 0) {
            const prevState = data[index - 1];

            setArr(prevState.arr);
            setActionIndices(prevState.actionIndices);

            setIndex((prev) => prev - 1);
        }
    };

    // To activate visualization when sorting is done
    useEffect(() => {
        if (data.length == 0) return;

        handleVisualization();
    }, [data]);

    // To set style array whenever actionIndices changes
    useEffect(() => {
        handleStyleArr();
    }, [actionIndices]);

    // To trigger master sort function
    useEffect(() => {
        isOnRef.current = isOn;

        if (!isOn) {
            return;
        } else if (data.length) {
            handleVisualization();
        } else {
            // no actionIndices at start
            setActionIndices([]);

            handleSort();
        }
    }, [isOn]);

    // To randomize arr
    useEffect(() => {
        handleRandomizeArray();
    }, [arrSize, algorithm]);

    const values = useMemo(() => {
        return {
            arr,
            styleArr,
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
        };
    }, [
        arr,
        setArr,
        styleArr,
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
    ]);

    return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useProvider = () => useContext(Context);
