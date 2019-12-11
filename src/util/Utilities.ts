export abstract class Utilities {
  public static mapToString(array: string[]): string {
    return `${array.map((item: string) => {
      return `\n${item}`;
    })}`;
  }
}
