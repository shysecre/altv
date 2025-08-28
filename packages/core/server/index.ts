import alt from "alt-server";
import spawnModule from "./modules/spawn";

alt.on("playerConnect", (player) => {
  spawnModule(player);

  alt.emitClient(player, "test", "arg");
});
