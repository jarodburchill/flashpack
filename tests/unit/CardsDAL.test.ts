import ElectronStore = require("electron-store");
import { CardsDAL } from "../../src/data/classes/CardsDAL";
import { IPack } from "../../src/models/Pack";
import { ISchema } from "../../src/models/Schema";
import { getEmptyStore, getPopulatedStore } from "../testData";

jest.mock("electron-store");

describe("getCards", () => {
  it("gets an empty cards array", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(cardsDAL.getCards()).toEqual([]);
  });
  it("gets a given cards array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(cardsDAL.getCards()).toEqual([
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
    ]);
  });
});

describe("getPackFlashcards", () => {
  it("gets an array of flashcards that belong to an existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    expect(cardsDAL.getPackFlashcards(pack)).toEqual([
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
    ]);
  });
  it("gets an empty array for an existing pack that has no flashcards", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[1];
    expect(cardsDAL.getPackFlashcards(pack)).toEqual([]);
  });
  it("throws an error when attempting to get flashcards for a non-existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = {
      id: 2,
      groupId: 1,
      name: "Does not exist",
      type: "flash",
      timed: false,
      liveResults: false,
    };
    expect(() => {
      cardsDAL.getPackFlashcards(pack);
    }).toThrow(new Error("Could not find matching Pack to get Cards from."));
  });
  it("throws an error when attempting to get flashcards for an existing pack with modified values", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = {
      id: 4,
      groupId: 2,
      name: "Wrong name",
      type: "flash",
      timed: false,
      liveResults: false,
    };
    expect(() => {
      cardsDAL.getPackFlashcards(pack);
    }).toThrow(new Error("Could not find matching Pack to get Cards from."));
  });
  it("throws an error when attempting to get flashcards for a pack with a type of 'quiz'", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = {
      id: 4,
      groupId: 1,
      name: "Unit 1",
      type: "quiz",
      timed: false,
      liveResults: false,
    };
    expect(() => {
      cardsDAL.getPackFlashcards(pack);
    }).toThrow(
      new Error("Given Pack is a Quizcard Pack, not a Flashcard Pack.")
    );
  });
});

describe("getPackQuizcards", () => {
  it("gets an array of quizcards that belong to an existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[2];
    expect(cardsDAL.getPackQuizcards(pack)).toEqual([
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
    ]);
  });
  it("gets an empty array for an existing pack that has no quizcards", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[3];
    expect(cardsDAL.getPackQuizcards(pack)).toEqual([]);
  });
  it("throws an error when attempting to get quizcards for a non-existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = {
      id: 2,
      groupId: 1,
      name: "Does not exist",
      type: "quiz",
      timed: false,
      liveResults: true,
    };
    expect(() => {
      cardsDAL.getPackQuizcards(pack);
    }).toThrow(new Error("Could not find matching Pack to get Cards from."));
  });
  it("throws an error when attempting to get quizcards for an existing pack with modified values", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = {
      id: 6,
      groupId: 2,
      name: "Wrong name",
      type: "quiz",
      timed: false,
      liveResults: false,
    };
    expect(() => {
      cardsDAL.getPackQuizcards(pack);
    }).toThrow(new Error("Could not find matching Pack to get Cards from."));
  });
  it("throws an error when attempting to get quizcards for a pack with a type of 'flash'", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = {
      id: 6,
      groupId: 2,
      name: "Semester 1",
      type: "flash",
      timed: true,
      liveResults: false,
    };
    expect(() => {
      cardsDAL.getPackQuizcards(pack);
    }).toThrow(
      new Error("Given Pack is a Flashcard Pack, not a Quizcard Pack.")
    );
  });
});
