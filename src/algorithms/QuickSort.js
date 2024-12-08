import { sleep } from "./utils";

async function solve(
    arr,
    setArr,
    arrSize,
    speed,
    setActionIndices,
    isOnGetter
) {
    const arrCopy = [...arr];

    await quickSort(
        arrCopy,
        0,
        arrSize - 1,
        setArr,
        speed,
        setActionIndices,
        isOnGetter
    );
}

export default solve;

async function partition(
    arr,
    low,
    high,
    setArr,
    speed,
    setActionIndices,
    isOnGetter
) {
    // choose pivot
    const pivot = arr[low];

    // two pointer
    let i = low + 1;
    let j = high;

    while (i <= j) {
        while (i <= high && arr[i] <= pivot) i++;

        while (j >= low && arr[j] > pivot) j--;

        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];

            //  Update actionIndices
            setActionIndices([low, i, j]);

            setArr([...arr]);
            await sleep(speed, isOnGetter);
        }
    }

    [arr[low], arr[j]] = [arr[j], arr[low]];

    //  Update actionIndices
    setActionIndices([low, j]);

    setArr([...arr]);
    await sleep(speed, isOnGetter);

    return j;
}

// The QuickSort function implementation
async function quickSort(
    arr,
    low,
    high,
    setArr,
    speed,
    setActionIndices,
    isOnGetter
) {
    // base case
    if (low >= high) return;

    // find pivot
    const pivotIdx = await partition(
        arr,
        low,
        high,
        setArr,
        speed,
        setActionIndices,
        isOnGetter
    );

    // recursive calls
    await quickSort(
        arr,
        low,
        pivotIdx - 1,
        setArr,
        speed,
        setActionIndices,
        isOnGetter
    );
    await quickSort(
        arr,
        pivotIdx + 1,
        high,
        setArr,
        speed,
        setActionIndices,
        isOnGetter
    );
}
