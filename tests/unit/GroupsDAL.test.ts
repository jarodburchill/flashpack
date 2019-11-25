import ElectronStore = require("electron-store");
import { GroupsDAL } from "../../src/data/classes/GroupsDAL";
import { IGroup } from "../../src/models/Group";
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
  it("auto increments next id upon adding a group", () => {
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

describe("updateGroup", () => {
  it("updates the name of the first group in an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = electronStore.store.groups[0];
    group.name = "Updated";
    groupsDAL.updateGroup(group);
    expect(electronStore.store.groups[0]).toEqual({ id: 1, name: "Updated" });
  });
  it("updates the name of the both groups in an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const first: IGroup = electronStore.store.groups[0];
    const second: IGroup = electronStore.store.groups[1];
    first.name = "Update";
    second.name = "Next Update";
    groupsDAL.updateGroup(first);
    groupsDAL.updateGroup(second);
    expect(electronStore.store.groups).toEqual([
      { id: 1, name: "Update" },
      { id: 2, name: "Next Update" },
    ]);
  });
});
