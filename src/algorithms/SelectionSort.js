function selectionSort(arr, arrSize) {
    const arrCopy = [...arr];
    let data = [];

    for (let i = 0; i < arrSize; i++) {
        let minEleIdx = i;

        for (let j = i + 1; j < arrSize; j++) {
            if (arrCopy[j] < arrCopy[minEleIdx]) minEleIdx = j;
        }

        // record step
        data.push({
            arr: [...arrCopy],
            actionIndices: [i, minEleIdx],
        });

        // swap j'th and min'th
        [arrCopy[i], arrCopy[minEleIdx]] = [arrCopy[minEleIdx], arrCopy[i]];
    }

    // record step
    data.push({
        arr: [...arrCopy],
        actionIndices: [],
    });

    return data;
}

export default selectionSort;
