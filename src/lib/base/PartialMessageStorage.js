export default class PartialMessageStorage {
    constructor(count) {
        this.Count = count;
        this.MessageData = '';
        this.CurrentIndex = -1;
    }
    getMessageData() {
        return this.MessageData;
    }
    appendMessage(data, index, count) {
        if (this.Count != count) {
            console.error('Invalid message size');
            return null;
        }
        if (index < 0 || index >= this.Count) {
            console.error('Invalid message index');
            return null;
        }
        if ((this.CurrentIndex + 1) != index) {
            console.error('Invalid duff message');
            return false;
        }
        this.CurrentIndex = index;
        this.MessageData += data;
        return index === count - 1;
    }
}
