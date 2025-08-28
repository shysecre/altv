import type { ClotheType, SpawnCordType } from "../../../common";

interface ClotheOptions {
  componentId: number;
  type: ClotheType;
  drawable: number;
  textureId: number;
}

interface TeamOptions {
  score?: number;
  clothes: Clothe[];
  spawn_cords: SpawnCordType;
  name: string;
}

export class Clothe {
  protected componentId: number;
  protected type: ClotheType;
  protected drawable: number;
  protected textureId: number;

  constructor({ componentId, drawable, textureId, type }: ClotheOptions) {
    this.componentId = componentId;
    this.drawable = drawable;
    this.textureId = textureId;
    this.type = type;
  }
}

export class Team {
  protected score: number;
  protected clothes: Clothe[];
  protected spawn_cords: SpawnCordType;
  protected name: string;

  constructor({ name, clothes, spawn_cords, ...args }: TeamOptions) {
    this.score = args.score ?? 0;
    this.clothes = clothes;
    this.spawn_cords = spawn_cords;
    this.name = name;
  }
}
