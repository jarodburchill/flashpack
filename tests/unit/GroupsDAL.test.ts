import ElectronStore = require("electron-store");
import { GroupsDAL } from "../../src/data/classes/GroupsDAL";
import { ISchema } from "../../src/models/Schema";

jest.mock("electron-store");

const getEmptyStore: () => ElectronStore<ISchema> = () => {
  return new ElectronStore<ISchema>({
    defaults: {
      cards: [],
      darkMode: false,
      groups: [],
      nextId: 1,
      packs: [],
    },
  });
};

const getPopulatedStore: () => ElectronStore<ISchema> = () => {
  return new ElectronStore<ISchema>({
    defaults: {
      cards: [],
      darkMode: false,
      groups: [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
      ],
      nextId: 3,
      packs: [],
    },
  });
};

describe("getGroups", () => {
  it("gets an empty groups array", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupDAL: GroupsDAL = new GroupsDAL(electronStore);
    expect(groupDAL.getGroups()).toEqual([]);
  });
  it("gets a given groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    expect(groupsDAL.getGroups()).toEqual([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
    ]);
  });
});

describe("addGroup", () => {
  it("adds a new group to an empty groups array", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    groupsDAL.addGroup({ name: "Math" });
    expect(electronStore.store.groups).toEqual([{ id: 1, name: "Math" }]);
  });
  it("adds a new group to an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    groupsDAL.addGroup({ name: "Web Development" });
    expect(electronStore.store.groups).toEqual([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
      { id: 3, name: "Web Development" },
    ]);
  });
  it("auto increments next id", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    groupsDAL.addGroup({ name: "Math" });
    groupsDAL.addGroup({ name: "Science" });
    expect(electronStore.store.groups).toEqual([
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
    ]);
  });
});

describe("getGroup", () => {
  it("gets a specified group from a given groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    expect(groupsDAL.getGroup(1)).toEqual({ id: 1, name: "Math" });
  });
  it("throws an error when a specified group cannot be found", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    try {
      groupsDAL.getGroup(1);
    } catch (error) {
      expect(error).toEqual(new Error("Could not find matching Group ID."));
    }
  });
});
