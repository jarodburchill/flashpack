import ElectronStore = require("electron-store");
import { PacksDAL } from "../../src/data/classes/PacksDAL";
import { IGroup } from "../../src/models/Group";
import { IPack } from "../../src/models/Pack";
import { ISchema } from "../../src/models/Schema";
import { getEmptyStore, getPopulatedStore } from "../testData";

jest.mock("electron-store");

describe("getPacks", () => {
  it("gets an empty packs array", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    expect(packsDAL.getPacks()).toEqual([]);
  });
  it("gets a given packs array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    expect(packsDAL.getPacks()).toEqual([
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
      {
        id: 6,
        groupId: 2,
        name: "Semester 1",
        type: "quiz",
        timed: true,
        liveResults: false,
      },
    ]);
  });
});

describe("getGroupPacks", () => {
  it("gets an array of packs that belong to an existing group", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = electronStore.store.groups[0];
    expect(packsDAL.getGroupPacks(group)).toEqual([
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
  });
  it("gets an empty array for an existing group that has no packs", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = electronStore.store.groups[2];
    expect(packsDAL.getGroupPacks(group)).toEqual([]);
  });
  it("throws an error when attempting to get packs for a non-existing group", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = { id: 1, name: "Does not exist" };
    expect(() => {
      packsDAL.getGroupPacks(group);
    }).toThrow(new Error("Could not find matching Group to get Packs from."));
  });
  it("throws an error when attempting to get packs for an existing group with modified values", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = { id: 1, name: "Wrong name" };
    expect(() => {
      packsDAL.getGroupPacks(group);
    }).toThrow(new Error("Could not find matching Group to get Packs from."));
  });
});

describe("findPack", () => {
  it("finds the given pack in an existing packs array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const pack: IPack = {
      id: 4,
      groupId: 1,
      name: "Unit 1",
      type: "flash",
      timed: false,
      liveResults: false,
    };
    expect(packsDAL.findPack(pack)).toBe(true);
  });
  it("does not find a given pack in an existing packs array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const pack: IPack = {
      id: 20,
      groupId: 1,
      name: "Does not exist",
      type: "flash",
      timed: false,
      liveResults: false,
    };
    expect(packsDAL.findPack(pack)).toBe(false);
  });
  it("given pack id exists but is not exactly equal to the pack in storage", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const pack: IPack = {
      id: 4,
      groupId: 1,
      name: "Wrong name",
      type: "flash",
      timed: true,
      liveResults: false,
    };
    expect(packsDAL.findPack(pack)).toBe(false);
  });
});

describe("getPack", () => {
  it("gets a specified pack from an existing packs array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    expect(packsDAL.getPack(4)).toEqual({
      id: 4,
      groupId: 1,
      name: "Unit 1",
      type: "flash",
      timed: false,
      liveResults: false,
    });
  });
  it("throws an error when a specified pack cannot be found", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    expect(() => {
      packsDAL.getPack(4);
    }).toThrow(new Error("Could not find matching Pack ID."));
  });
});

describe("addPack", () => {
  it("adds a new pack to an existing group", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = electronStore.store.groups[0];
    packsDAL.addPack(group, {
      name: "New pack",
      type: "flash",
      timed: false,
      liveResults: false,
    });
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
      {
        id: 6,
        groupId: 2,
        name: "Semester 1",
        type: "quiz",
        timed: true,
        liveResults: false,
      },
      {
        id: 13,
        groupId: 1,
        name: "New pack",
        type: "flash",
        timed: false,
        liveResults: false,
      },
    ]);
  });
  it("throws an error when attempting to add a pack to a non existing group", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = { id: 1, name: "Does not exist" };
    expect(() => {
      packsDAL.addPack(group, {
        name: "New pack",
        type: "flash",
        timed: false,
        liveResults: false,
      });
    }).toThrow(new Error("Could not find matching Group to add Pack to."));
  });
  it("auto increments next id upon adding a pack", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const group: IGroup = electronStore.store.groups[0];
    packsDAL.addPack(group, {
      name: "Pack 1",
      type: "flash",
      timed: false,
      liveResults: false,
    });
    packsDAL.addPack(group, {
      name: "Pack 2",
      type: "quiz",
      timed: true,
      liveResults: false,
    });
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
      {
        id: 6,
        groupId: 2,
        name: "Semester 1",
        type: "quiz",
        timed: true,
        liveResults: false,
      },
      {
        id: 13,
        groupId: 1,
        name: "Pack 1",
        type: "flash",
        timed: false,
        liveResults: false,
      },
      {
        id: 14,
        groupId: 1,
        name: "Pack 2",
        type: "quiz",
        timed: true,
        liveResults: false,
      },
    ]);
  });
});

describe("updatePack", () => {
  it("updates the name of the first pack in an existing packs array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const packsDAL: PacksDAL = new PacksDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    pack.name = "Updated";
    packsDAL.updatePack(pack);
    expect(electronStore.store.packs).toEqual([
      {
        id: 4,
        groupId: 1,
        name: "Updated",
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
      {
        id: 6,
        groupId: 2,
        name: "Semester 1",
        type: "quiz",
        timed: true,
        liveResults: false,
      },
    ]);
  });
});
