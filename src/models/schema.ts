// tslint:disable: object-literal-sort-keys
export const schema = {
  groups: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
      required: ["id", "name"],
    },
  },
  packs: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "integer" },
        groupId: { type: "integer" },
        name: { type: "string" },
        type: {
          type: "string",
          enum: ["flash", "quiz"],
        },
        timed: { type: "boolean" },
        liveResults: { type: "boolean" },
      },
      required: ["id", "groupId", "name", "type", "timed", "liveResults"],
    },
  },
  flashcards: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "integer" },
        packId: { type: "integer" },
        term: { type: "string" },
        definition: { type: "string" },
        starred: { type: "boolean" },
      },
      required: ["id", "packId", "term", "definition", "starred"],
    },
  },
  quizcards: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "integer" },
        packId: { type: "integer" },
        type: {
          type: "string",
          enum: ["mc", "tf"],
        },
        question: { type: "string" },
        answers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              text: { type: "string" },
              correct: { type: "boolean" },
            },
          },
        },
        starred: { type: "boolean" },
      },
      required: ["id", "packId", "type", "question", "answers", "starred"],
    },
  },
};
