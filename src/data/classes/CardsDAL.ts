import _ = require("lodash");
import { Card } from "../../models/Card";
import { IFlashcard, INewFlashcard } from "../../models/Flashcard";
import { IPack } from "../../models/Pack";
import { INewQuizcard, IQuizcard } from "../../models/Quizcard";
import { Utilities } from "../../util/Utilities";
import { Validation } from "../../validation/Validation";
import { BaseDAL } from "./BaseDAL";
import { PacksDAL } from "./PacksDAL";

export class CardsDAL extends BaseDAL {
  public getCards(): Card[] {
    return this.electronStore.get("cards");
  }
  private setCards(cards: Card[]): void {
    this.electronStore.set("cards", cards);
  }
  private getPackCards<T extends Card>(pack: IPack): T[] {
    const cards: Card[] = this.getCards();
    const packCards: Card[] = cards.filter((card: Card) => {
      return card.packId === pack.id;
    });
    if (!new PacksDAL(this.electronStore).findPack(pack)) {
      throw new Error("Could not find matching Pack to get Cards from.");
    }
    return packCards as T[];
  }
  public getPackFlashcards(pack: IPack): IFlashcard[] {
    if (pack.type !== "flash") {
      throw new Error(
        "Pack was found, but it is a Quizcard Pack, not a Flashcard Pack."
      );
    }
    return this.getPackCards<IFlashcard>(pack);
  }
  public getPackQuizcards(pack: IPack): IQuizcard[] {
    if (pack.type !== "quiz") {
      throw new Error(
        "Pack was found, but it is a Falshcard Pack, not a Quizcard Pack."
      );
    }
    return this.getPackCards<IQuizcard>(pack);
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
      throw new Error("Could not find matching Card ID.");
    }
    return requestedCard as T;
  }
  public getFlashcard(id: number): IFlashcard {
    const card: IFlashcard = this.getCard<IFlashcard>(id);
    if (card.type !== "flash") {
      throw new Error("Card was found, but it is a Quizcard, not a Flashcard.");
    }
    return card;
  }
  public getQuizcard(id: number): IQuizcard {
    const card: IQuizcard = this.getCard<IQuizcard>(id);
    if (card.type !== "quiz") {
      throw new Error("Card was found, but it is a Falshcard, not a Quizcard.");
    }
    return card;
  }
  public addCard(pack: IPack, newCard: INewFlashcard | INewQuizcard): void {
    const errors: string[] = [];
    const card: Card = _.merge(
      { id: this.assignId(), packId: pack.id },
      newCard
    );
    const cards: Card[] = this.getCards();
    if (!new PacksDAL(this.electronStore).findPack(pack)) {
      throw new Error("Could not find matching Pack to add Cards to.");
    }
    if (pack.type !== card.type) {
      throw new Error(`Card type and Pack type must match.`);
    }
    if (!Validation.isValidCard(card, errors)) {
      throw new Error(`Invalid Card:${Utilities.mapToString(errors)}.`);
    }
    cards.push(card);
    this.setCards(cards);
  }
  public updateCard(updatedCard: Card): void {
    const errors: string[] = [];
    const cards: Card[] = this.getCards();
    const readonlyProps: string[] = ["id", "packId", "type", "quizType"];
    const updateIndex: number = cards.findIndex((card: Card) => {
      return _.isEqual(
        _.pick(card, readonlyProps),
        _.pick(updatedCard, readonlyProps)
      );
    });
    if (updateIndex === -1) {
      throw new Error("Could not find matching Card to update.");
    }
    if (!Validation.isValidCard(updatedCard, errors)) {
      throw new Error(`Invalid Card:${Utilities.mapToString(errors)}.`);
    }
    cards[updateIndex] = updatedCard;
    this.setCards(cards);
  }
  public removeCard(removalCard: Card): void {
    const cards: Card[] = this.getCards();
    const removeIndex: number = cards.findIndex((card: Card) => {
      return _.isEqual(card, removalCard);
    });
    if (removeIndex === -1) {
      throw new Error("Could not find matching Card to remove.");
    }
    cards.splice(removeIndex, 1);
    this.setCards(cards);
  }
}
