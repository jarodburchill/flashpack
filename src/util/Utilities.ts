export abstract class Utilities {
  public static mapErrors(errors: string[]): string {
    return `${errors.map((error: string) => {
      return `\n${error}`;
    })}`;
  }
}
