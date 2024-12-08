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

    await mergeSort(
        arrCopy,
        0,
        arrSize - 1,
        setArr,
        arrSize,
        speed,
        setActionIndices,
        isOnGetter
    );
}

export default solve;

async function merge(
    arrCopy,
    left,
    mid,
    right,
    setArr,
    speed,
    setActionIndices,
    isOnGetter
) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = arrCopy[left + i];
    for (let j = 0; j < n2; j++) R[j] = arrCopy[mid + 1 + j];

    let i = 0,
        j = 0;
    let k = left;

    // Merge the temp arrays back into arr[left..right]
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arrCopy[k] = L[i];
            i++;
        } else {
            arrCopy[k] = R[j];
            j++;
        }

        //  Update actionIndices
        setActionIndices([k]);

        setArr(arrCopy);
        await sleep(speed, isOnGetter);

        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arrCopy[k] = L[i];

        //  Update actionIndices
        setActionIndices([k]);

        i++;
        k++;

        setArr(arrCopy);
        await sleep(speed, isOnGetter);
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arrCopy[k] = R[j];

        //  Update actionIndices
        setActionIndices([k]);

        j++;
        k++;

        setArr(arrCopy);
        await sleep(speed, isOnGetter);
    }
}

async function mergeSort(
    arrCopy,
    left,
    right,
    setArr,
    arrSize,
    speed,
    setActionIndices,
    isOnGetter
) {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);

    await mergeSort(
        arrCopy,
        left,
        mid,
        setArr,
        arrSize,
        speed,
        setActionIndices,
        isOnGetter
    );
    await mergeSort(
        arrCopy,
        mid + 1,
        right,
        setArr,
        arrSize,
        speed,
        setActionIndices,
        isOnGetter
    );

    await merge(
        arrCopy,
        left,
        mid,
        right,
        setArr,
        speed,
        setActionIndices,
        isOnGetter
    );
}
