import type { Player } from "alt-server";
import { PedModel } from "altv-data";
import { SPAWN_CORDS } from "../../common";

export default function spawnModule(player: Player) {
  player.model = PedModel.mp_f_freemode_01;

  player.setClothes(2, 52, 0);
  player.setHeadBlendData(0, 27, 0, 0, 27, 0, 1, 1, 0);

  player.spawn(SPAWN_CORDS.DEFAULT_SPAWN);

  console.log(`${player.name} connected & spawned!`);
}
