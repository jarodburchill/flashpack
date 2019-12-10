import _ = require("lodash");
import { IFlashcard } from "src/models/Flashcard";
import { IQuizcard } from "src/models/Quizcard";
import { IGroup } from "../models/Group";
import { IPack } from "../models/Pack";
import { IQuizAnswer } from "../models/QuizAnswer";

enum Type {
  flash = "flash",
  quiz = "quiz",
}

enum QuizType {
  multipleChoice = "mc",
  trueFalse = "tf",
  checkbox = "chk",
  blank = "blank",
}

export abstract class Validation {
  private static minNameLength: number = 2;
  private static correctAnswers: number = 1;
  private static trueFalseAnswers: number = 2;
  private static minAnswers: number = 3;
  private static maxAnswers: number = 24;
  private static minBlanks: number = 1;
  private static maxBlanks: number = 24;
  private static blanksRegExp: RegExp = /\$_\$/g;
  public static isValidGroup(group: IGroup, errorsRef: string[]): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    if (!_.isInteger(group.id)) {
      errorsRef.push("ID must be an integer");
    }
    if (!_.isString(group.name)) {
      errorsRef.push("Name must be a string");
    }
    if (_.isEmpty(group.name)) {
      errorsRef.push("Name cannot be empty");
    }
    if (group.name.length < this.minNameLength) {
      errorsRef.push(`Name must be at least ${this.minNameLength} characters`);
    }
    return _.isEmpty(errorsRef);
  }
  public static isValidPack(pack: IPack, errorsRef: string[]): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    if (!_.isInteger(pack.id)) {
      errorsRef.push("ID must be an integer");
    }
    if (!_.isInteger(pack.groupId)) {
      errorsRef.push("GroupID must be an integer");
    }
    if (!(pack.type in Type)) {
      errorsRef.push("Type must be either 'flash' or 'quiz'");
    }
    if (pack.type === Type.flash && (pack.timed || pack.liveResults)) {
      errorsRef.push(
        "If type is 'flash' then timed and liveResults must be false"
      );
    }
    if (_.isEmpty(pack.name)) {
      errorsRef.push("Name cannot be empty");
    }
    if (pack.name.length < this.minNameLength) {
      errorsRef.push(`Name must be at least ${this.minNameLength} characters`);
    }
    if (!_.isBoolean(pack.timed)) {
      errorsRef.push("Timed must be a boolean");
    }
    if (!_.isBoolean(pack.liveResults)) {
      errorsRef.push("LiveResults must be a boolean");
    }
    return _.isEmpty(errorsRef);
  }
  public static isValidFlashcard(
    flashcard: IFlashcard,
    errorsRef: string[]
  ): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    if (!_.isInteger(flashcard.id)) {
      errorsRef.push("ID must be an integer");
    }
    if (!_.isInteger(flashcard.packId)) {
      errorsRef.push("PackID must be an integer");
    }
    if (flashcard.type !== Type.flash) {
      errorsRef.push("Type must be 'flash'");
    }
    if (!_.isString(flashcard.term)) {
      errorsRef.push("Term must be a string");
    }
    if (_.isEmpty(flashcard.term)) {
      errorsRef.push("Term cannot be empty");
    }
    if (!_.isString(flashcard.definition)) {
      errorsRef.push("Definition must be a string");
    }
    if (_.isEmpty(flashcard.definition)) {
      errorsRef.push("Definition cannot be empty");
    }
    if (!_.isBoolean(flashcard.starred)) {
      errorsRef.push("Starred must be a boolean");
    }
    return _.isEmpty(errorsRef);
  }
}
