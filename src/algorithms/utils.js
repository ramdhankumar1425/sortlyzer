export function sleep(speed, isOnGetter) {
    let ms = 1000;

    // Delay based on speed
    // 1 - 1000
    // 2 - 500
    // 3 - 100
    // 4 - 50
    // 5 - 1
    if (speed == 2) ms = 500;
    else if (speed == 3) ms = 100;
    else if (speed == 4) ms = 50;
    else if (speed == 5) ms = 1;

    if (!isOnGetter) return new Promise((resolve) => setTimeout(resolve, ms));

    return new Promise((resolve) => {
        if (isOnGetter()) {
            setTimeout(resolve, ms);
        } else {
            const interval = setInterval(() => {
                if (isOnGetter()) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        }
    });
}
