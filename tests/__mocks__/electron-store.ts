class ElectronStore<T = any> {
  public store: any;
  constructor(options?: { defaults: T }) {
    this.store = options.defaults;
  }
  public get(key: string): any {
    this.store = JSON.parse(JSON.stringify(this.store));
    return this.store[key];
  }
  public set(key: string, value: any): void {
    this.store[key] = value;
    this.store = JSON.parse(JSON.stringify(this.store));
  }
}

module.exports = ElectronStore;
