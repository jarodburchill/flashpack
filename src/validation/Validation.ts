import _ = require("lodash");
import { IGroup } from "src/models/Group";
import { IPack } from "src/models/Pack";

export abstract class Validation {
  private static minNameLength: number = 5;
  public static isValidGroup(group: IGroup, errorsRef: string[]): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array."
      );
    }
    if (!_.isInteger(group.id)) {
      errorsRef.push("ID must be an integer.");
    }
    if (!_.isString(group.name)) {
      errorsRef.push("Name must be a string.");
    }
    if (_.isEmpty(group.name)) {
      errorsRef.push("Name cannot be empty.");
    }
    if (group.name.length < this.minNameLength) {
      errorsRef.push("Name must be at least 5 characters.");
    }
    return _.isEmpty(errorsRef);
  }
  public static isValidPack(pack: IPack, errorsRef: string[]): boolean {
    if (!_.isEmpty(errorsRef)) {
      throw new Error(
        "errorsRef parameter must be passed in as an empty string array."
      );
    }
    if (!_.isInteger(pack.id)) {
      errorsRef.push("ID must be an integer.");
    }
    if (!_.isInteger(pack.groupId)) {
      errorsRef.push("GroupID must be an integer.");
    }
    if (_.isEmpty(pack.name)) {
      errorsRef.push("Name cannot be empty");
    }
    if (pack.name.length < this.minNameLength) {
      errorsRef.push("Name must be at least 5 characters");
    }
    return _.isEmpty(errorsRef);
  }
}
