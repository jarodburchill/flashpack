import _ = require("lodash");
import { IFlashcard, INewFlashcard } from "src/models/Flashcard";
import { IPack } from "src/models/Pack";
import { INewQuizcard, IQuizcard } from "src/models/Quizcard";
import { BaseDAL } from "./BaseDAL";
import { PacksDAL } from "./PacksDAL";

type Card = IFlashcard | IQuizcard;
type NewCard = INewFlashcard | INewQuizcard;

export class CardsDAL extends BaseDAL {
  private getCards(): Card[] {
    return this.electronStore.get("cards");
  }
  private setCards(cards: Card[]): void {
    this.electronStore.set("cards", cards);
  }
  private getPackCards<T extends Card>(pack: IPack): T[] {
    if (new PacksDAL(this.electronStore).findPack(pack)) {
      const cards: Card[] = this.getCards();
      const packCards: Card[] = cards.filter((card: Card) => {
        return card.packId === pack.id;
      });
      return packCards as T[];
    } else {
      throw new Error("Could not find matching Pack to get Cards from.");
    }
  }
  public getPackFlashcards(pack: IPack): IFlashcard[] {
    if (pack.type === "flash") {
      return this.getPackCards<IFlashcard>(pack);
    } else {
      throw new Error(
        "Pack was found, but it is a Quizcard Pack, not a Flashcard Pack."
      );
    }
  }
  public getPackQuizcards(pack: IPack): IQuizcard[] {
    if (pack.type === "quiz") {
      return this.getPackCards<IQuizcard>(pack);
    } else {
      throw new Error(
        "Pack was found, but it is a Falshcard Pack, not a Quizcard Pack."
      );
    }
  }
  public removePackCards(pack: IPack): void {
    if (new PacksDAL(this.electronStore).findPack(pack)) {
      const cards: Card[] = this.getCards();
      const remainingCards: Card[] = cards.filter((card: Card) => {
        return card.packId !== pack.id;
      });
      this.setCards(remainingCards);
    } else {
      throw new Error("Could not find matching Pack to remove Cards from.");
    }
  }
  public findCard(searchCard: Card): boolean {
    const cards: Card[] = this.getCards();
    const requestedCard: Card = cards.find((card: Card) => {
      return card.id === searchCard.id;
    });
    return requestedCard !== undefined;
  }
  private getCard<T extends Card>(id: number): T {
    const cards: Card[] = this.getCards();
    const requestedCard: Card = cards.find((card: Card) => {
      return card.id === id;
    });
    if (requestedCard !== undefined) {
      return requestedCard as T;
    } else {
      throw new Error("Could not find matching Card ID.");
    }
  }
  public getFlashcard(id: number): IFlashcard {
    const card: IFlashcard = this.getCard<IFlashcard>(id);
    if (card.type === "flash") {
      return card;
    } else {
      throw new Error("Card was found, but it is a Quizcard, not a Flashcard.");
    }
  }
  public getQuizcard(id: number): IQuizcard {
    const card: IQuizcard = this.getCard<IQuizcard>(id);
    if (card.type === "quiz") {
      return card;
    } else {
      throw new Error("Card was found, but it is a Falshcard, not a Quizcard.");
    }
  }
  public addCard(pack: IPack, newCard: NewCard): void {
    // TODO: Do I have to validate Quizcard answers prop?
    if (new PacksDAL(this.electronStore).findPack(pack)) {
      const cards: Card[] = this.getCards();
      const card: Card = {
        ...{
          id: this.assignId(),
          packId: pack.id,
        },
        ...newCard,
      };
      if (pack.type === card.type) {
        cards.push(card);
        this.setCards(cards);
      } else {
        throw new Error(
          `A Pack with type '${pack.type}' can only contain ${
            pack.type === "flash" ? "Flashcards" : "Quizcards"
          }.`
        );
      }
    } else {
      throw new Error("Could not find matching Pack to add Cards to.");
    }
  }
  public updateCard(updatedCard: Card): void {
    // TODO: Do I have to validate Quizcard answers prop?
    const cards: Card[] = this.getCards();
    const readonlyProps: string[] = ["id", "packId", "type", "quizType"];
    const updateIndex: number = cards.findIndex((card: Card) => {
      return _.pick(card, readonlyProps) === _.pick(updatedCard, readonlyProps);
    });
    if (updateIndex !== -1) {
      // TODO: is this the right way to do it (all 3 DALs)?
      cards[updateIndex] = updatedCard;
      this.setCards(cards);
    } else {
      throw new Error("Could not find matching Card to update.");
    }
  }
  public removeCard(removalCard: Card): void {
    const cards: Card[] = this.getCards();
    const removeIndex: number = cards.findIndex((card: Card) => {
      return _.isEqual(card, removalCard);
    });
    if (removeIndex !== -1) {
      cards.splice(removeIndex, 1);
      this.setCards(cards);
    } else {
      throw new Error("Could not find matching Card to remove.");
    }
  }
}
