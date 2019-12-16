import ElectronStore = require("electron-store");
import { ISchema } from "../src/models/Schema";

jest.mock("electron-store");

export const getEmptyStore: () => ElectronStore<ISchema> = () => {
  return new ElectronStore<ISchema>({
    defaults: {
      darkMode: false,
      nextId: 1,
      groups: [],
      packs: [],
      cards: [],
    },
  });
};

export const getPopulatedStore: () => ElectronStore<ISchema> = () => {
  return new ElectronStore<ISchema>({
    defaults: {
      darkMode: false,
      nextId: 14,
      groups: [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
        { id: 3, name: "Art" },
      ],
      packs: [
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
          id: 7,
          groupId: 2,
          name: "Semester 2",
          type: "quiz",
          timed: false,
          liveResults: true,
        },
      ],
      cards: [
        {
          id: 8,
          packId: 4,
          type: "flash",
          term: "2 + 2",
          definition: "4",
          starred: false,
        },
        {
          id: 9,
          packId: 4,
          type: "flash",
          term: "2 - 2",
          definition: "0",
          starred: true,
        },
        {
          id: 10,
          packId: 6,
          type: "quiz",
          quizType: "mc",
          question: "what is the symbol for water?",
          answers: [
            { text: "H3O", correct: false },
            { text: "H2O", correct: true },
            { text: "B2O", correct: false },
            { text: "W2O", correct: false },
          ],
          starred: false,
        },
        {
          id: 11,
          packId: 6,
          type: "quiz",
          quizType: "tf",
          question: "water boils at 100 degrees celsius.",
          answers: [
            { text: "false", correct: false },
            { text: "true", correct: true },
          ],
          starred: true,
        },
        {
          id: 12,
          packId: 6,
          type: "quiz",
          quizType: "chk",
          question: "which of the following are states of matter.",
          answers: [
            { text: "Liquid", correct: true },
            { text: "Gas", correct: true },
            { text: "Gum", correct: false },
            { text: "Sticky", correct: false },
            { text: "Solid", correct: true },
          ],
          starred: false,
        },
        {
          id: 13,
          packId: 6,
          type: "quiz",
          quizType: "blank",
          question: "$_$ is the study of the natural $_$.",
          answers: [
            { text: "Science", correct: true },
            { text: "word", correct: true },
          ],
          starred: true,
        },
      ],
    },
  });
};
