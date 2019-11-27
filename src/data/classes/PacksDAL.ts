import { IGroup } from "src/models/Group";
import { INewPack, IPack } from "../../models/Pack";
import { BaseDAL } from "./BaseDAL";
import { CardsDAL } from "./CardsDAL";

export class PacksDAL extends BaseDAL {
  private getPacks(): IPack[] {
    return this.electronStore.get("packs");
  }
  private setPacks(packs: IPack[]): void {
    this.electronStore.set("packs", packs);
  }
  public getGroupPacks(group: IGroup): IPack[] {
    // TODO: handle group not found
    const packs: IPack[] = this.getPacks();
    const groupPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId === group.id;
    });
    return groupPacks;
  }
  public removeGroupPacks(group: IGroup): void {
    // TODO: handle group not found
    // TODO: move to GroupsDAL remove function
    const packs: IPack[] = this.getPacks();
    const remainingPacks: IPack[] = packs.filter((pack: IPack) => {
      if (pack.groupId !== group.id) {
        return pack;
      } else {
        new CardsDAL(this.electronStore).removePackCards(pack);
      }
    });
    this.setPacks(remainingPacks);
  }
  public addPack(group: IGroup, newPack: INewPack): void {
    const packs: IPack[] = this.getPacks();
    const pack: IPack = {
      ...{ id: this.assignId(), groupId: group.id },
      ...newPack,
    };
    packs.push(pack);
    this.setPacks(packs);
  }
  public getPack(id: number): IPack {
    const packs: IPack[] = this.getPacks();
    const requestedPack: IPack = packs.find((pack: IPack) => {
      return pack.id === id;
    });
    if (requestedPack !== undefined) {
      return requestedPack;
    } else {
      throw new Error("Could not find matching Pack ID.");
    }
  }
  public updatePack(updatedPack: IPack): void {
    const packs: IPack[] = this.getPacks();
    const updateIndex: number = packs.findIndex((pack: IPack) => {
      return pack.id === updatedPack.id;
    });
    if (updateIndex !== -1) {
      packs[updateIndex] = updatedPack;
      this.setPacks(packs);
    } else {
      throw new Error("Could not find matching Pack to update.");
    }
  }
  public removePack(removalPack: IPack): void {
    const packs: IPack[] = this.getPacks();
    const removeIndex: number = packs.findIndex((pack: IPack) => {
      return pack.id === removalPack.id;
    });
    if (removeIndex !== -1) {
      packs.splice(removeIndex, 1);
      new CardsDAL(this.electronStore).removePackCards(removalPack);
      this.setPacks(packs);
    } else {
      throw new Error("Could not find matching Pack to remove.");
    }
  }
}
