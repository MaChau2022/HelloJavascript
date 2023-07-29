class MyPromise {
    constructor(handler) {
        this.state = 'pending';
        this._result = undefined;
        this._reason = undefined;
        this._resolveQueue = [];
        this._rejectQueue = [];
        this._resolve = this._resolve.bind(this);
        this._reject = this._reject.bind(this);

        handler(this._resolve, this._reject);
    }

    /** resolve or reject */
    _resolve(result) {
        if (this.state !== 'pending') return;
        if (result instanceof MyPromise) return result.then(this._resolve, this._reject)
        this.state = 'resolved';
        this._result = result;
        while(this._resolveQueue.length) {
            this._resolveQueue.shift()(result);
        }
    }

    _reject(reason) {
        if (this.state !== 'pending') return;
        this.state = 'rejected';
        this._reason = reason;
        while(this._rejectQueue.length) {
            this._rejectQueue.shift()(reason);
        }
    }

    /** then */
    then(onResolved, onRejected) {
        const { state, _result, _reason, _resolveQueue, _rejectQueue } = this;

        /** another promise */
        return new MyPromise(function (resolve, reject) {
            const onFinally = (isResolved, result) => {
                try {
                    let next;
                    if (isResolved && onResolved) next = onResolved(result);
                    else if (!isResolved && onRejected) next = onRejected(result);
                    else next = result;
                    if (next instanceof MyPromise) {
                        return next.then(resolve, reject);
                    } else resolve(next);
                } catch(error) {
                    reject(error)
                }
            }

            switch(state) {
                case 'pending':
                    _resolveQueue.push(onFinally.bind(null, true));
                    _rejectQueue.push(onFinally.bind(null, false));
                    break;
                /** already finished */
                case 'resolved':
                    onFinally(true, _result)
                    break;
                case 'rejected':
                    onFinally(false, _reason)
                    break;
            }
        })
    }
}

/** test case */
new MyPromise((resolve, reject) => {
    resolve("resolve_1")
})
    .then((result) => {
        console.log(result)
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve("resolve_2")
            }, 1000)
        })
    })
    .then(console.log)