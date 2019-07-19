class AppStore {
  constructor() {
    this.store = {
      appWindow: {},
    };
  }

  updateAppWindow(win) {
    this.store.appWindow = win;
  }

  get appWindow() {
    return this.store.appWindow;
  }
}

export default new AppStore();
