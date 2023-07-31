module.exports = class MyEvent {
    constructor() {
        this.on = this._register.bind(this)
        this.off = this._unregister.bind(this)
        this.handlers = [];
        this.tempHandlers = []
    }
    
    _register(cb, once) {
        if (once) {
            this.tempHandlers.push(cb);
        } else {
            this.handlers.push(cb);
        }
        return () => this._unregister(cb)
    }

    _unregister(cb) {
        let index = this.handlers.indexOf(cb);
        if (index >= 0) this.handlers.splice(index, 1);

        index = this.tempHandlers.indexOf(cb);
        if (index >= 0) this.tempHandlers.splice(index, 1);
    }

    emit(data) {
        this.handlers.forEach(cb => cb(data));
        this.tempHandlers.forEach(cb => cb(data));
        this.tempHandlers = [];
    }
}