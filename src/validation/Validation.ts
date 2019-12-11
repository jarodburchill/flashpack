import _ = require("lodash");
import { IFlashcard } from "../models/Flashcard";
import { IGroup } from "../models/Group";
import { IPack } from "../models/Pack";
import { IQuizAnswer } from "../models/QuizAnswer";
import { IQuizcard } from "../models/Quizcard";
// import { Utilities } from "../util/Utilities";

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
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    // if (!_.isInteger(group.id)) {
    //   errorsRef.push("ID must be an integer");
    // }
    // if (!_.isString(group.name)) {
    //   errorsRef.push("Name must be a string");
    // }
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
    // if (!_.isInteger(pack.id)) {
    //   errorsRef.push("ID must be an integer");
    // }
    // if (!_.isInteger(pack.groupId)) {
    //   errorsRef.push("GroupID must be an integer");
    // }
    // if (!(pack.type in Types)) {
    //   errorsRef.push(
    //     `Type must be one of the following:${Utilities.mapToString(
    //       _.values(Types)
    //     )}`
    //   );
    // }
    if (pack.type === Types.flash && (pack.timed || pack.liveResults)) {
      errorsRef.push(
        "If type is 'flash' then timed and liveResults must be false"
      );
    }
    if (pack.name.length < this.minNameLength) {
      errorsRef.push(`Name must be at least ${this.minNameLength} characters`);
    }
    // if (!_.isBoolean(pack.timed)) {
    //   errorsRef.push("Timed must be a boolean");
    // }
    // if (!_.isBoolean(pack.liveResults)) {
    //   errorsRef.push("LiveResults must be a boolean");
    // }
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
    // if (!_.isInteger(flashcard.id)) {
    //   errorsRef.push("ID must be an integer");
    // }
    // if (!_.isInteger(flashcard.packId)) {
    //   errorsRef.push("PackID must be an integer");
    // }
    if (flashcard.type !== Types.flash) {
      errorsRef.push("Type must be 'flash'");
    }
    // if (!_.isString(flashcard.term)) {
    //   errorsRef.push("Term must be a string");
    // }
    if (_.isEmpty(flashcard.term)) {
      errorsRef.push("Term cannot be empty");
    }
    // if (!_.isString(flashcard.definition)) {
    //   errorsRef.push("Definition must be a string");
    // }
    if (_.isEmpty(flashcard.definition)) {
      errorsRef.push("Definition cannot be empty");
    }
    // if (!_.isBoolean(flashcard.starred)) {
    //   errorsRef.push("Starred must be a boolean");
    // }
    return _.isEmpty(errorsRef);
  }
  public static isValidQuizcard(
    quizcard: IQuizcard,
    errorsRef: string[]
  ): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array"
      );
    }
    // if (!_.isInteger(quizcard.id)) {
    //   errorsRef.push("ID must be an integer");
    // }
    // if (!_.isInteger(quizcard.packId)) {
    //   errorsRef.push("PackID must be an integer");
    // }
    if (quizcard.type !== Types.quiz) {
      errorsRef.push("Type must be 'quiz'");
    }
    // if (!_.isString(quizcard.question)) {
    //   errorsRef.push("Question must be a string");
    // }
    if (_.isEmpty(quizcard.question)) {
      errorsRef.push("Question cannot be empty");
    }
    quizcard.answers.forEach((answer: IQuizAnswer) => {
      // if (!_.isString(answer.text)) {
      //   errorsRef.push("Answer text must be a string");
      // }
      if (_.isEmpty(answer.text)) {
        errorsRef.push("Answer text cannot be empty");
      }
      // if (!_.isBoolean(answer.correct)) {
      //   errorsRef.push("Answer 'correct' property must be a boolean");
      // }
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
        // errorsRef.push(
        //   `QuizType must be one of the following:${Utilities.mapToString(
        //     _.values(QuizTypes)
        //   )}`
        // );
        break;
    }
    // if (!_.isBoolean(quizcard.starred)) {
    //   errorsRef.push("Starred must be a boolean");
    // }
    return _.isEmpty(errorsRef);
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
    const blanks: number = question.match(this.blanksRegExp).length;
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
