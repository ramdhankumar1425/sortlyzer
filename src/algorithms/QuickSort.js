function solve(arr, arrSize) {
    const arrCopy = [...arr];
    let data = [];

    quickSort(arrCopy, 0, arrSize - 1, data);

    return data;
}

export default solve;

function partition(arr, low, high, data) {
    // choose pivot
    const pivot = arr[low];

    // two pointer
    let i = low + 1;
    let j = high;

    while (i <= j) {
        while (i <= high && arr[i] <= pivot) i++;

        while (j >= low && arr[j] > pivot) j--;

        if (i < j) {
            // record step
            data.push({
                arr: [...arr],
                actionIndices: [low, i, j],
            });

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // record step
    data.push({
        arr: [...arr],
        actionIndices: [low, j],
    });

    [arr[low], arr[j]] = [arr[j], arr[low]];

    // record step
    data.push({
        arr: [...arr],
        actionIndices: [],
    });

    return j;
}

// The QuickSort function implementation
function quickSort(arr, low, high, data) {
    // base case
    if (low >= high) return;

    // find pivot
    const pivotIdx = partition(arr, low, high, data);

    // recursive calls
    quickSort(arr, low, pivotIdx - 1, data);
    quickSort(arr, pivotIdx + 1, high, data);
}
