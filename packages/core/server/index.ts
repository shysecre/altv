import alt from "alt-server";
import spawnModule from "./modules/spawn";
/**
 * TODO:
 * 1. Add ability to select gender
 * 2. Add ability to select clothes for selected gender
 * 3. Spawn player only after all steps
 * 4. Optional: Save selected gender (model) & clothe set to local storage or db in future
 */
alt.on("playerConnect", async (player) => {
  spawnModule(player);
});
