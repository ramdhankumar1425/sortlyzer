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
const colors = {
    def: "#9966ff",
    action: "#e80707",
    final: "#4bc0c0",
};
const maxElement = 100;

// Provider component
export const Provider = ({ children }) => {
    const [isOn, setIsOn] = useState(false); // On/Off
    const isOnRef = useRef(isOn);
    const [isAlreadyRunning, setIsAlreadyRunning] = useState(false); // already running algo

    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(10);
    const [styleArr, setStyleArr] = useState([]);

    const [algorithm, setAlgorithm] = useState("bubble");
    const [speed, setSpeed] = useState(1.001);

    // store action and final indices
    const [actionIndices, setActionIndices] = useState([]);

    // Function to randomize array
    const handleRandomizeArray = () => {
        let array = [];

        for (let i = 0; i < arrSize; i++) {
            let randomElement = Math.floor(Math.random() * maxElement);
            array[i] = randomElement;
        }

        setArr(array);

        // set style array to default
        setActionIndices([]);
    };

    // Master function to handle all sorting
    const handleSort = async () => {
        console.log("Sorting started...");

        setIsAlreadyRunning(true);

        if (algorithm == "bubble") {
            await bubbleSort(
                arr,
                setArr,
                arrSize,
                speed,
                setActionIndices,
                isOnGetter
            );
        } else if (algorithm == "selection") {
            await selectionSort(
                arr,
                setArr,
                arrSize,
                speed,
                setActionIndices,
                isOnGetter
            );
        } else if (algorithm == "insertion") {
            await insertionSort(
                arr,
                setArr,
                arrSize,
                speed,
                setActionIndices,
                isOnGetter
            );
        } else if (algorithm == "merge") {
            await mergeSort(
                arr,
                setArr,
                arrSize,
                speed,
                setActionIndices,
                isOnGetter
            );
        } else if (algorithm == "quick") {
            await quickSort(
                arr,
                setArr,
                arrSize,
                speed,
                setActionIndices,
                isOnGetter
            );
        }

        console.log("Sorting done...");

        setIsAlreadyRunning(false);
        setIsOn(false);

        handleFinalTraversal();
    };

    // Function to get current state of isOn inside algorithms
    const isOnGetter = () => isOnRef.current;

    // Function to manage styleArr
    const handleStyleArr = () => {
        const updatedStyleArr = arr.map((_, idx) =>
            actionIndices.includes(idx) ? colors.action : colors.def
        );

        setStyleArr(updatedStyleArr);
    };

    // Final traversal *****
    const handleFinalTraversal = async () => {
        for (let i = 0; i < arrSize; i++) {
            setStyleArr((prev) =>
                prev.map((_, j) => (j <= i ? colors.final : colors.def))
            );

            await sleep(3);
        }
    };

    // Function to reset to default
    const handleReset = async () => {
        await sleep(1);

        setIsOn(false);
        setIsAlreadyRunning(false);
        setArrSize(10);
        handleRandomizeArray();
        setStyleArr([]);
        setAlgorithm("bubble");
        setSpeed(1.001);
    };

    // To set style array whenever actionIndices changes
    useEffect(() => {
        handleStyleArr();
    }, [actionIndices]);

    // To trigger master sort function
    useEffect(() => {
        isOnRef.current = isOn;

        if (isAlreadyRunning || !isOn) return;

        // no actionIndices at start
        setActionIndices([]);

        handleSort();
    }, [isOn]);

    // To randomize arr
    useEffect(() => {
        handleRandomizeArray();
    }, [arrSize]);

    const values = useMemo(() => {
        return {
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
    ]);

    return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useProvider = () => useContext(Context);
