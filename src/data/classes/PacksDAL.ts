import _ = require("lodash");
import { Card } from "../../models/Card";
import { IGroup } from "../../models/Group";
import { INewPack, IPack } from "../../models/Pack";
import { Utilities } from "../../util/Utilities";
import { Validation } from "../../validation/Validation";
import { BaseDAL } from "./BaseDAL";
import { CardsDAL } from "./CardsDAL";
import { GroupsDAL } from "./GroupsDAL";

export class PacksDAL extends BaseDAL {
  public getPacks(): IPack[] {
    return this.electronStore.get("packs");
  }
  private setPacks(packs: IPack[]): void {
    this.electronStore.set("packs", packs);
  }
  public getGroupPacks(group: IGroup): IPack[] {
    const packs: IPack[] = this.getPacks();
    const groupPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId === group.id;
    });
    if (!new GroupsDAL(this.electronStore).findGroup(group)) {
      throw new Error("Could not find matching Group to get Packs from.");
    }
    return groupPacks;
  }
  public findPack(searchPack: IPack): boolean {
    const packs: IPack[] = this.getPacks();
    const requestedPack: IPack = packs.find((pack: IPack) => {
      return _.isEqual(pack, searchPack);
    });
    return requestedPack !== undefined;
  }
  public getPack(id: number): IPack {
    const packs: IPack[] = this.getPacks();
    const requestedPack: IPack = packs.find((pack: IPack) => {
      return pack.id === id;
    });
    if (requestedPack === undefined) {
      throw new Error("Could not find matching Pack ID.");
    }
    return requestedPack;
  }
  public addPack(group: IGroup, newPack: INewPack): void {
    const errors: string[] = [];
    const pack: IPack = _.merge(
      { id: this.assignId(), groupId: group.id },
      newPack
    );
    const packs: IPack[] = this.getPacks();
    if (!new GroupsDAL(this.electronStore).findGroup(group)) {
      throw new Error("Could not find matching Group to add Pack to.");
    }
    if (!Validation.isValidPack(pack, errors)) {
      throw new Error(`Invalid Pack:${Utilities.mapErrorsToString(errors)}.`);
    }
    packs.push(pack);
    this.setPacks(packs);
  }
  public updatePack(updatedPack: IPack): void {
    const errors: string[] = [];
    const packs: IPack[] = this.getPacks();
    const readonlyProps: string[] = ["id", "groupId", "type"];
    const updateIndex: number = packs.findIndex((pack: IPack) => {
      return _.isEqual(
        _.pick(pack, readonlyProps),
        _.pick(updatedPack, readonlyProps)
      );
    });
    if (updateIndex === -1) {
      throw new Error("Could not find matching Pack to update.");
    }
    if (!Validation.isValidPack(updatedPack, errors)) {
      throw new Error(`Invalid Pack:${Utilities.mapErrorsToString(errors)}.`);
    }
    packs[updateIndex] = updatedPack;
    this.setPacks(packs);
  }
  public removePack(removalPack: IPack): void {
    const packs: IPack[] = this.getPacks();
    const removeIndex: number = packs.findIndex((pack: IPack) => {
      return _.isEqual(pack, removalPack);
    });
    if (removeIndex === -1) {
      throw new Error("Could not find matching Pack to remove.");
    }
    this.removePackCards(removalPack);
    packs.splice(removeIndex, 1);
    this.setPacks(packs);
  }
  private removePackCards(pack: IPack): void {
    const cardsDAL: CardsDAL = new CardsDAL(this.electronStore);
    const cards: Card[] = cardsDAL.getCards();
    const removalCards: Card[] = cards.filter((card: Card) => {
      return card.packId === pack.id;
    });
    removalCards.forEach((card: Card) => {
      cardsDAL.removeCard(card);
    });
  }
}
