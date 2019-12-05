export abstract class Utilities {
  public static mapErrorsToString(errors: string[]): string {
    return `${errors.map((error: string) => {
      return `\n${error}`;
    })}`;
  }
}
