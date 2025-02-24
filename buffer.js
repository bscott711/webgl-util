class Buffer {
    constructor(capacity, dtype) {
        this.len = 0;
        this.capacity = capacity;
        if (dtype == "uint8") {
            this.buffer = new Uint8Array(capacity);
        } else if (dtype == "int8") {
            this.buffer = new Int8Array(capacity);
        } else if (dtype == "uint16") {
            this.buffer = new Uint16Array(capacity);
        } else if (dtype == "int16") {
            this.buffer = new Int16Array(capacity);
        } else if (dtype == "uint32") {
            this.buffer = new Uint32Array(capacity);
        } else if (dtype == "int32") {
            this.buffer = new Int32Array(capacity);
        } else if (dtype == "float32") {
            this.buffer = new Float32Array(capacity);
        } else if (dtype == "float64") {
            this.buffer = new Float64Array(capacity);
        } else {
            console.log("ERROR: unsupported type " + dtype);
        }
    }
    append(buf) {
        if (this.len + buf.length >= this.capacity) {
            var newCap = Math.floor(Math.max(this.capacity * 1.5), this.len + buf.length);
            var tmp = new (this.buffer.constructor)(newCap);
            tmp.set(this.buffer);

            this.capacity = newCap;
            this.buffer = tmp;
        }
        this.buffer.set(buf, this.len);
        this.len += buf.length;
    }
    clear() {
        this.len = 0;
    }
    stride() {
        return this.buffer.BYTES_PER_ELEMENT;
    }
    view(offset, length) {
        return new (this.buffer.constructor)(this.buffer.buffer, offset, length);
    }
}





