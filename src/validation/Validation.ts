import _ = require("lodash");
import { Card } from "../models/Card";
import { IFlashcard } from "../models/Flashcard";
import { IGroup } from "../models/Group";
import { IPack } from "../models/Pack";
import { IQuizAnswer } from "../models/QuizAnswer";
import { IQuizcard } from "../models/Quizcard";

enum Types {
  flash = "flash",
  quiz = "quiz",
}

enum QuizTypes {
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
    // TODO: schema validation
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    if (group.name.length < this.minNameLength) {
      errorsRef.push(`Name must be at least ${this.minNameLength} characters`);
    }
    return _.isEmpty(errorsRef);
  }
  public static isValidPack(pack: IPack, errorsRef: string[]): boolean {
    // TODO: schema validation
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    if (pack.type === Types.flash && (pack.timed || pack.liveResults)) {
      errorsRef.push(
        "If type is 'flash' then timed and liveResults must be false"
      );
    }
    if (pack.name.length < this.minNameLength) {
      errorsRef.push(`Name must be at least ${this.minNameLength} characters`);
    }
    return _.isEmpty(errorsRef);
  }
  public static isValidCard(card: Card, errorsRef: string[]): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    switch (card.type) {
      case Types.flash:
        this.isValidFlashcard(card, errorsRef);
        break;
      case Types.quiz:
        this.isValidQuizcard(card, errorsRef);
        break;
      default:
        errorsRef.push(`Type must be '${Types.flash}' or '${Types.quiz}'`);
        break;
    }
    return _.isEmpty(errorsRef);
  }
  private static isValidFlashcard(
    flashcard: IFlashcard,
    errorsRef: string[]
  ): void {
    // TODO: schema validation
    if (_.isEmpty(flashcard.term)) {
      errorsRef.push("Term cannot be empty");
    }
    if (_.isEmpty(flashcard.definition)) {
      errorsRef.push("Definition cannot be empty");
    }
  }
  private static isValidQuizcard(
    quizcard: IQuizcard,
    errorsRef: string[]
  ): void {
    // TODO: schema validation
    if (_.isEmpty(quizcard.question)) {
      errorsRef.push("Question cannot be empty");
    }
    quizcard.answers.forEach((answer: IQuizAnswer) => {
      if (_.isEmpty(answer.text)) {
        errorsRef.push("Answer text cannot be empty");
      }
    });
    switch (quizcard.quizType) {
      case QuizTypes.multipleChoice:
        this.validateMultipleChoice(quizcard.answers, errorsRef);
        break;
      case QuizTypes.trueFalse:
        this.validateTrueFalse(quizcard.answers, errorsRef);
        break;
      case QuizTypes.checkbox:
        this.validateCheckboxes(quizcard.answers, errorsRef);
        break;
      case QuizTypes.blank:
        this.validateBlanks(quizcard.question, quizcard.answers, errorsRef);
        break;
      default:
        break;
    }
  }
  private static validateMultipleChoice(
    answers: IQuizAnswer[],
    errorsRef: string[]
  ): void {
    if (answers.length < this.minAnswers || answers.length > this.maxAnswers) {
      errorsRef.push(
        `Multiple Choice Quizcards must contain between ${this.minAnswers}-${this.maxAnswers} answer objects`
      );
    }
    if (
      answers.filter((answer: IQuizAnswer) => {
        return answer.correct === true;
      }).length !== this.correctAnswers
    ) {
      errorsRef.push(
        `Multiple Choice Quizcards must have exactly ${this.correctAnswers} correct answer`
      );
    }
  }
  private static validateTrueFalse(
    answers: IQuizAnswer[],
    errorsRef: string[]
  ): void {
    if (answers.length !== this.trueFalseAnswers) {
      errorsRef.push(
        `True/False Quizcards must contain only ${this.trueFalseAnswers} answer objects`
      );
    }
    if (
      answers.filter((answer: IQuizAnswer) => {
        return answer.correct === true;
      }).length !== this.correctAnswers
    ) {
      errorsRef.push(
        `True/False Quizcards must have exactly ${this.correctAnswers} correct answer`
      );
    }
  }
  private static validateCheckboxes(
    answers: IQuizAnswer[],
    errorsRef: string[]
  ): void {
    if (answers.length < this.minAnswers || answers.length > this.maxAnswers) {
      errorsRef.push(
        `Checkbox Quizcards must contain between ${this.minAnswers}-${this.maxAnswers} answer objects`
      );
    }
    if (
      answers.filter((answer: IQuizAnswer) => {
        return answer.correct === true;
      }).length < this.correctAnswers
    ) {
      errorsRef.push(
        `Checkbox Quizcards must have at least ${this.correctAnswers} correct answer`
      );
    }
  }
  private static validateBlanks(
    question: string,
    answers: IQuizAnswer[],
    errorsRef: string[]
  ): void {
    const blanks: number = (question.match(this.blanksRegExp) || []).length;
    if (blanks !== answers.length) {
      errorsRef.push(
        "Fill in the Blank Quizcards must have the same number of answer objects as blanks in the question string"
      );
    }
    if (answers.length < this.minBlanks || answers.length > this.maxBlanks) {
      errorsRef.push(
        `Fill in the Blank Quizcards must contain between ${this.minBlanks}-${this.maxBlanks} answer objects`
      );
    }
    answers.forEach((answer: IQuizAnswer) => {
      if (!answer.correct) {
        errorsRef.push(
          "All answers in Fill in the Blank Quizcards must be set to correct"
        );
      }
    });
  }
}
