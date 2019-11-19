import { GroupsDAL } from "../../src/data/classes/GroupsDAL";
import { ElectronStoreStub } from "../stubs/ElectronStoreStub";

describe("getGroups", () => {
  it("gets an empty groups array", () => {
    const store: ElectronStoreStub = new ElectronStoreStub();
    const groupDAL: GroupsDAL = new GroupsDAL(store);
    expect(groupDAL.getGroups()).toEqual([]);
  });
  it("gets passed groups array", () => {
    const store: ElectronStoreStub = new ElectronStoreStub({
      cards: [],
      darkMode: false,
      groups: [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
      ],
      nextId: 3,
      packs: [],
    });
    const groupsDAL: GroupsDAL = new GroupsDAL(store);
    expect(groupsDAL.getGroups()).toEqual([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
    ]);
  });
});
