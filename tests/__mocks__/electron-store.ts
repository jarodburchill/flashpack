class ElectronStore<T = any> {
  public store: any;
  constructor(options?: { defaults: T }) {
    this.store = JSON.parse(JSON.stringify(options.defaults));
  }
  public get(key: string): any {
    return this.store[key];
  }
  public set(key: string, value: any): void {
    this.store[key] = value;
  }
}

module.exports = ElectronStore;
