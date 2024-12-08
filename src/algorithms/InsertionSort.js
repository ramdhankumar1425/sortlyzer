import { sleep } from "./utils";

async function insertionSort(
    arr,
    setArr,
    arrSize,
    speed,
    setActionIndices,
    isOnGetter
) {
    const arrCopy = [...arr];

    for (let i = 1; i < arrSize; i++) {
        let key = arrCopy[i];
        let j = i - 1;

        while (j >= 0 && arrCopy[j] > key) {
            // Update actionIndices
            setActionIndices([i, j, j + 1]);

            arrCopy[j + 1] = arrCopy[j];

            setArr(arrCopy);
            await sleep(speed, isOnGetter);

            j = j - 1;
        }
        arrCopy[j + 1] = key;

        setArr(arrCopy);
    }
}

export default insertionSort;
