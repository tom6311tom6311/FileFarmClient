import events from 'events';

class EventEmitter {
  constructor() {
    this.emitter = new events.EventEmitter();
  }

  emit(event, params = {}) {
    this.emitter.emit(event, params);
  }

  register(event, callback = () => {}) {
    this.emitter.on(event, callback);
  }
}

export default new EventEmitter();
