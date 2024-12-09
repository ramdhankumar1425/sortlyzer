function bubbleSort(arr, arrSize) {
    const arrCopy = [...arr];
    let data = [];

    for (let i = 0; i < arrSize - 1; i++) {
        for (let j = 0; j < arrSize - i - 1; j++) {
            if (arrCopy[j] > arrCopy[j + 1]) {
                // record step
                data.push({
                    arr: [...arrCopy],
                    actionIndices: [j, j + 1],
                });

                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
            }
        }
    }

    // record step
    data.push({
        arr: [...arrCopy],
        actionIndices: [],
    });

    return data;
}

export default bubbleSort;
