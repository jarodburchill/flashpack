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
      nextId: 12,
      groups: [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
      ],
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
      cards: [
        {
          id: 6,
          packId: 3,
          type: "flash",
          term: "2 + 2",
          definition: "4",
          starred: false,
        },
        {
          id: 7,
          packId: 3,
          type: "flash",
          term: "2 - 2",
          definition: "0",
          starred: true,
        },
        {
          id: 8,
          packId: 5,
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
          id: 9,
          packId: 5,
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
          id: 10,
          packId: 5,
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
          id: 11,
          packId: 5,
          type: "quiz",
          quizType: "blanks",
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
