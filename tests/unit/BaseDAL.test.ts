import { BaseDAL } from "../../src/data/classes/BaseDAL";
import { ElectronStoreStub } from "../stubs/ElectronStoreStub";

describe("assignId", () => {
  it("assigns the first id", () => {
    const store: ElectronStoreStub = new ElectronStoreStub();
    const baseDAL: BaseDAL = new BaseDAL(store);
    // @ts-ignore
    expect(baseDAL.assignId()).toBe(1);
  });
  it("auto increments next id", () => {
    const store: ElectronStoreStub = new ElectronStoreStub();
    const baseDAL: BaseDAL = new BaseDAL(store);
    // @ts-ignore
    baseDAL.assignId();
    // @ts-ignore
    expect(baseDAL.store.store.nextId).toBe(2);
  });
  it("assigns the fifth id", () => {
    const store: ElectronStoreStub = new ElectronStoreStub({
      cards: [],
      darkMode: false,
      groups: [],
      nextId: 5,
      packs: [],
    });
    const baseDAL: BaseDAL = new BaseDAL(store);
    // @ts-ignore
    expect(baseDAL.assignId()).toBe(5);
  });
});
