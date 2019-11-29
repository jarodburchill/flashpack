import ElectronStore = require("electron-store");
import { ISchema } from "../src/models/Schema";

jest.mock("electron-store");

export const getEmptyStore: () => ElectronStore<ISchema> = () => {
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

export const getPopulatedStore: () => ElectronStore<ISchema> = () => {
  return new ElectronStore<ISchema>({
    defaults: {
      cards: [],
      darkMode: false,
      groups: [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
      ],
      nextId: 6,
      packs: [
        {
          id: 3,
          groupId: 1,
          name: "Unit 1",
          type: "flash",
          timed: false,
          liveResults: false,
        },
        {
          id: 4,
          groupId: 1,
          name: "Unit 2",
          type: "flash",
          timed: false,
          liveResults: false,
        },
        {
          id: 5,
          groupId: 2,
          name: "Semester 1",
          type: "quiz",
          timed: true,
          liveResults: false,
        },
      ],
    },
  });
};
