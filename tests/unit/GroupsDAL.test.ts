import { GroupsDAL } from "../../src/data/classes/GroupsDAL";
import { ISchema } from "../../src/models/Schema";
import { ElectronStoreStub } from "../stubs/ElectronStoreStub";

const storeData: ISchema = {
  cards: [],
  darkMode: false,
  groups: [
    { id: 1, name: "Math" },
    { id: 2, name: "Science" },
  ],
  nextId: 3,
  packs: [],
};

describe("getGroups", () => {
  it("gets an empty groups array", () => {
    const store: ElectronStoreStub = new ElectronStoreStub();
    const groupDAL: GroupsDAL = new GroupsDAL(store);
    expect(groupDAL.getGroups()).toEqual([]);
  });
  it("gets a given groups array", () => {
    const store: ElectronStoreStub = new ElectronStoreStub(storeData);
    const groupsDAL: GroupsDAL = new GroupsDAL(store);
    expect(groupsDAL.getGroups()).toEqual([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
    ]);
  });
});

describe("addGroup", () => {
  it("adds a new group to an empty groups array", () => {
    const store: ElectronStoreStub = new ElectronStoreStub();
    const groupsDAL: GroupsDAL = new GroupsDAL(store);
    groupsDAL.addGroup({ name: "Math" });
    expect(groupsDAL.getGroups()).toEqual([{ id: 1, name: "Math" }]);
  });
  it("adds a new group to an existing groups array", () => {
    const store: ElectronStoreStub = new ElectronStoreStub(storeData);
    const groupsDAL: GroupsDAL = new GroupsDAL(store);
    groupsDAL.addGroup({ name: "Web Development" });
    expect(groupsDAL.getGroups()).toEqual([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
      { id: 3, name: "Web Development" },
    ]);
  });
  it("auto increments next id", () => {
    const store: ElectronStoreStub = new ElectronStoreStub();
    const groupsDAL: GroupsDAL = new GroupsDAL(store);
    groupsDAL.addGroup({ name: "Math" });
    groupsDAL.addGroup({ name: "Science" });
    expect(groupsDAL.getGroup(2).name).toBe("Science");
  });
});
