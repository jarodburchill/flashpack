import ElectronStore = require("electron-store");
import { GroupsDAL } from "../../src/data/classes/GroupsDAL";
import { IGroup } from "../../src/models/Group";
import { ISchema } from "../../src/models/Schema";
import { getEmptyStore, getPopulatedStore } from "../testData";

jest.mock("electron-store");

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
      { id: 3, name: "Art" },
    ]);
  });
});

describe("findGroup", () => {
  it("finds the given group in an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = { id: 1, name: "Math" };
    expect(groupsDAL.findGroup(group)).toBe(true);
  });
  it("does not find a given group in an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = { id: 4, name: "Does not exist" };
    expect(groupsDAL.findGroup(group)).toBe(false);
  });
  it("given group id exists but is not exactly equal to the group in storage", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = { id: 2, name: "Wrong name" };
    expect(groupsDAL.findGroup(group)).toBe(false);
  });
});

describe("getGroup", () => {
  it("gets a specified group from an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    expect(groupsDAL.getGroup(1)).toEqual({ id: 1, name: "Math" });
  });
  it("throws an error when a specified group cannot be found", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    expect(() => {
      groupsDAL.getGroup(1);
    }).toThrow(new Error("Could not find matching Group ID."));
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
      { id: 3, name: "Art" },
      { id: 13, name: "Web Development" },
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

describe("updateGroup", () => {
  it("updates the name of the first group in an existing groups array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = electronStore.store.groups[0];
    group.name = "Updated";
    groupsDAL.updateGroup(group);
    expect(electronStore.store.groups[0]).toEqual({ id: 1, name: "Updated" });
  });
  it("updates the name of the multiple groups in an existing groups array", () => {
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
      { id: 3, name: "Art" },
    ]);
  });
  it("throws an error when attempting to update a non-existing group", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = { id: 1, name: "Does not exist" };
    expect(() => {
      groupsDAL.updateGroup(group);
    }).toThrow(new Error("Could not find matching Group to update."));
  });
});

describe("removeGroup", () => {
  it("removes existing group and all associated packs and cards", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = electronStore.store.groups[1];
    groupsDAL.removeGroup(group);
    expect(electronStore.store.groups).toEqual([
      { id: 1, name: "Math" },
      { id: 3, name: "Art" },
    ]);
    expect(electronStore.store.packs).toEqual([
      {
        id: 4,
        groupId: 1,
        name: "Unit 1",
        type: "flash",
        timed: false,
        liveResults: false,
      },
      {
        id: 5,
        groupId: 1,
        name: "Unit 2",
        type: "flash",
        timed: false,
        liveResults: false,
      },
    ]);
    expect(electronStore.store.cards).toEqual([
      {
        id: 7,
        packId: 4,
        type: "flash",
        term: "2 + 2",
        definition: "4",
        starred: false,
      },
      {
        id: 8,
        packId: 4,
        type: "flash",
        term: "2 - 2",
        definition: "0",
        starred: true,
      },
    ]);
  });
  it("throws an error when attempting to remove an existing group with modified values", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = { id: 1, name: "Wrong name" };
    expect(() => {
      groupsDAL.removeGroup(group);
    }).toThrow(new Error("Could not find matching Group to remove."));
  });
  it("throws an error when attempting to remove a non-existing group", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const groupsDAL: GroupsDAL = new GroupsDAL(electronStore);
    const group: IGroup = { id: 1, name: "Does not exist" };
    expect(() => {
      groupsDAL.removeGroup(group);
    }).toThrow(new Error("Could not find matching Group to remove."));
  });
});
