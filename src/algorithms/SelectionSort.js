import { sleep } from "./utils";

async function selectionSort(
    arr,
    setArr,
    arrSize,
    speed,
    setActionIndices,
    isOnGetter
) {
    const arrCopy = [...arr];

    for (let i = 0; i < arrSize; i++) {
        let minEleIdx = i;

        for (let j = i + 1; j < arrSize; j++) {
            if (arrCopy[j] < arrCopy[minEleIdx]) minEleIdx = j;
        }

        // swap j'th and min'th
        [arrCopy[i], arrCopy[minEleIdx]] = [arrCopy[minEleIdx], arrCopy[i]];

        //  Update actionIndices
        setActionIndices([i, minEleIdx]);

        setArr(arrCopy);

        await sleep(speed, isOnGetter);
    }
}

export default selectionSort;
