import type { Player } from "alt-server";
import { PedModel } from "altv-data";
import { SPAWN_CORDS } from "../../common";

export default function spawnModule(player: Player) {
  player.model = PedModel.mp_m_freemode_01;
  player.spawn(SPAWN_CORDS.DEFAULT_SPAWN);

  console.log(`${player.name} connected & spawned!`);
}
