function solve(arr, arrSize) {
    const arrCopy = [...arr];
    let data = [];

    mergeSort(arrCopy, 0, arrSize - 1, data);

    return data;
}

export default solve;

function merge(arrCopy, left, mid, right, data) {
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
        // record step
        data.push({
            arr: [...arrCopy],
            actionIndices: [k],
        });

        if (L[i] <= R[j]) {
            arrCopy[k] = L[i];
            i++;
        } else {
            arrCopy[k] = R[j];
            j++;
        }

        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        // record step
        data.push({
            arr: [...arrCopy],
            actionIndices: [k],
        });

        arrCopy[k] = L[i];

        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        // record step
        data.push({
            arr: [...arrCopy],
            actionIndices: [k],
        });

        arrCopy[k] = R[j];

        j++;
        k++;
    }

    // record step
    data.push({
        arr: [...arrCopy],
        actionIndices: [],
    });
}

function mergeSort(arrCopy, left, right, data) {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);

    // recursive calls for divided arrays
    mergeSort(arrCopy, left, mid, data);
    mergeSort(arrCopy, mid + 1, right, data);

    // merge sorted divided arrays
    merge(arrCopy, left, mid, right, data);
}
