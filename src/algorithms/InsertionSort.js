function insertionSort(arr, arrSize) {
    const arrCopy = [...arr];
    let data = [];

    for (let i = 1; i < arrSize; i++) {
        let key = arrCopy[i];
        let j = i - 1;

        while (j >= 0 && arrCopy[j] > key) {
            // record step
            data.push({
                arr: [...arrCopy],
                actionIndices: [i, j, j + 1],
            });

            arrCopy[j + 1] = arrCopy[j];

            j = j - 1;
        }

        // record step
        data.push({
            arr: [...arrCopy],
            actionIndices: [j + 1],
        });

        arrCopy[j + 1] = key;
    }

    // record step
    data.push({
        arr: [...arrCopy],
        actionIndices: [],
    });

    return data;
}

export default insertionSort;
