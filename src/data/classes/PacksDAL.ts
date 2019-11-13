import { INewPack, IPack } from "../../models/Pack";
import { BaseDAL } from "./BaseDAL";

export class PacksDAL extends BaseDAL {
  public getPacks(): IPack[] {
    return this.store.get("packs");
  }
  public setPacks(packs: IPack[]): void {
    this.store.set("packs", packs);
  }
  public getGroupPacks(groupId: number): IPack[] {
    const packs: IPack[] = this.store.get("packs");
    const groupPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId === groupId;
    });
    return groupPacks;
  }
  public addPack(groupId: number, newPack: INewPack): void {
    const packs: IPack[] = this.getPacks();
    const pack: IPack = Object.assign(
      { id: this.assignId(), groupId },
      newPack
    );
    packs.push(pack);
    this.setPacks(packs);
  }
}
