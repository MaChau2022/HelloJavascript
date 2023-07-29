/** throttle */
function throttle(handler, interval) {
    let timer;
    return {
        dispatch() {
            if (timer) return;
            timer = setTimeout(handler, interval);
        }, 
        cancel() {
            clearTimeout(timer);
            timer = undefined;
        }
    }
}

/** debounce */
function debounce(handler, interval) {
    let timer;
    return {
        dispatch() {
            clearTimeout(timer);
            timer = setTimeout(handler, interval);
        },
        cancel() {
            clearTimeout(timer);
            timer = undefined;
        }
    }
}