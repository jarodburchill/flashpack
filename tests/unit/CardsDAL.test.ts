import ElectronStore = require("electron-store");
import { CardsDAL } from "../../src/data/classes/CardsDAL";
import { IFlashcard } from "../../src/models/Flashcard";
import { IPack } from "../../src/models/Pack";
import { IQuizcard } from "../../src/models/Quizcard";
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

describe("findCard", () => {
  it("finds the given flashcard in an existing cards array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const card: IFlashcard = {
      id: 8,
      packId: 4,
      type: "flash",
      term: "2 + 2",
      definition: "4",
      starred: false,
    };
    expect(cardsDAL.findCard(card)).toBe(true);
  });
  it("finds the given quizcard in an existing cards array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const card: IQuizcard = {
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
    };
    expect(cardsDAL.findCard(card)).toBe(true);
  });
  it("does not find a given card in an existing cards array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const card: IFlashcard = {
      id: 20,
      packId: 1,
      type: "flash",
      term: "Does not exist",
      definition: "def",
      starred: false,
    };
    expect(cardsDAL.findCard(card)).toBe(false);
  });
  it("given card id exists but is not exactly equal to the card in storage", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const card: IQuizcard = {
      id: 10,
      packId: 6,
      type: "quiz",
      quizType: "tf",
      question: "what is the symbol for water?",
      answers: [
        { text: "H3O", correct: false },
        { text: "H2O", correct: true },
        { text: "B2O", correct: false },
      ],
      starred: true,
    };
    expect(cardsDAL.findCard(card)).toBe(false);
  });
});

describe("getFlashcard", () => {
  it("gets a specified flashcard from an existing cards array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(cardsDAL.getFlashcard(8)).toEqual({
      id: 8,
      packId: 4,
      type: "flash",
      term: "2 + 2",
      definition: "4",
      starred: false,
    });
  });
  it("throws an error when a specified flashcard cannot be found", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(() => {
      cardsDAL.getFlashcard(8);
    }).toThrow(new Error("Could not find matching Card ID."));
  });
  it("throws an error when card found has a type of 'quiz'", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(() => {
      cardsDAL.getFlashcard(10);
    }).toThrow(
      new Error("Card was found, but it is a Quizcard, not a Flashcard.")
    );
  });
});

describe("getQuizcard", () => {
  it("gets a specified quizcard from an existing cards array", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(cardsDAL.getQuizcard(10)).toEqual({
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
    });
  });
  it("throws an error when a specified quizcard cannot be found", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(() => {
      cardsDAL.getQuizcard(10);
    }).toThrow(new Error("Could not find matching Card ID."));
  });
  it("throws an error when card found has a type of 'flash'", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    expect(() => {
      cardsDAL.getQuizcard(8);
    }).toThrow(
      new Error("Card was found, but it is a Flashcard, not a Quizcard.")
    );
  });
});

describe("addCard", () => {
  it("adds a new flashcard to an existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    cardsDAL.addCard(pack, {
      type: "flash",
      term: "Term",
      definition: "Def",
      starred: false,
    });
    expect(electronStore.store.cards).toEqual([
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
      {
        id: 14,
        packId: 4,
        type: "flash",
        term: "Term",
        definition: "Def",
        starred: false,
      },
    ]);
  });
  it("adds a new quizcard to an existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[3];
    cardsDAL.addCard(pack, {
      type: "quiz",
      quizType: "tf",
      question: "Q",
      answers: [
        { text: "false", correct: false },
        { text: "true", correct: true },
      ],
      starred: false,
    });
    expect(electronStore.store.cards).toEqual([
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
      {
        id: 14,
        packId: 7,
        type: "quiz",
        quizType: "tf",
        question: "Q",
        answers: [
          { text: "false", correct: false },
          { text: "true", correct: true },
        ],
        starred: false,
      },
    ]);
  });
  it("auto increments next id upon adding a card", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    cardsDAL.addCard(pack, {
      type: "flash",
      term: "Flash 1",
      definition: "Def",
      starred: false,
    });
    cardsDAL.addCard(pack, {
      type: "flash",
      term: "Flash 2",
      definition: "Def",
      starred: false,
    });
    expect(electronStore.store.cards).toEqual([
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
      {
        id: 14,
        packId: 4,
        type: "flash",
        term: "Flash 1",
        definition: "Def",
        starred: false,
      },
      {
        id: 15,
        packId: 4,
        type: "flash",
        term: "Flash 2",
        definition: "Def",
        starred: false,
      },
    ]);
  });
  it("throws an error when flashcard is invalid", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    expect(() => {
      cardsDAL.addCard(pack, {
        type: "flash",
        term: "",
        definition: "",
        starred: false,
      });
    }).toThrow(
      new Error(
        "Invalid Card:" +
          "\nTerm cannot be empty," +
          "\nDefinition cannot be empty."
      )
    );
  });
  it("throws an error when quizcard is invalid", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[3];
    expect(() => {
      cardsDAL.addCard(pack, {
        type: "quiz",
        quizType: "mc",
        question: "",
        answers: [],
        starred: false,
      });
    }).toThrow(
      new Error(
        "Invalid Card:" +
          "\nQuestion cannot be empty," +
          "\nMultiple Choice Quizcards must contain between 3-24 answer objects," +
          "\nMultiple Choice Quizcards must have exactly 1 correct answer."
      )
    );
  });
  it("throws an error when card type does not equal pack type", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    expect(() => {
      cardsDAL.addCard(pack, {
        type: "quiz",
        quizType: "tf",
        question: "Q",
        answers: [
          { text: "false", correct: false },
          { text: "true", correct: true },
        ],
        starred: false,
      });
    }).toThrow(new Error("Card type and Pack type must match."));
  });
  it("throws an error when attempting to add a card to a non existing pack", () => {
    const electronStore: ElectronStore<ISchema> = getPopulatedStore();
    const cardsDAL: CardsDAL = new CardsDAL(electronStore);
    const pack: IPack = electronStore.store.packs[0];
    expect(() => {
      cardsDAL.addCard(pack, {
        type: "quiz",
        quizType: "tf",
        question: "Q",
        answers: [
          { text: "false", correct: false },
          { text: "true", correct: true },
        ],
        starred: false,
      });
    }).toThrow(new Error("Card type and Pack type must match."));
  });
});

describe("updateCard", () => {
  it("updates the name of a flashcard in an existing cards array", () => {});
  it("updates the name of a quizcard in an existing cards array", () => {});
  it("updates the name of the multiple cards in an existing cards array", () => {});
  it("throws an error when attempting to update a non-existing card", () => {});
  it("throws an error when attempting to update an existing card with modified readonly values", () => {});
  it("throws an error when flashcard is invalid", () => {});
  it("throws an error when quizcard is invalid", () => {});
});

describe("removeCard", () => {
  it("removes existing flashcard", () => {});
  it("removes existing quizcard", () => {});
  it("throws an error when attempting to remove an existing card with modified values", () => {});
  it("throws an error when attempting to remove a non-existing card", () => {});
});
