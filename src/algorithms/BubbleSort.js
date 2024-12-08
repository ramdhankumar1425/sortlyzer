import { sleep } from "./utils";

async function bubbleSort(
    arr,
    setArr,
    arrSize,
    speed,
    setActionIndices,
    isOnGetter
) {
    const arrCopy = [...arr];

    for (let i = 0; i < arrSize - 1; i++) {
        for (let j = 0; j < arrSize - i - 1; j++) {
            //  Update actionIndices
            setActionIndices([j, j + 1]);

            if (arrCopy[j] > arrCopy[j + 1]) {
                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];

                setArr([...arrCopy]);
                await sleep(speed, isOnGetter);
            }
        }
    }
}

export default bubbleSort;
