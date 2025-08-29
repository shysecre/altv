import alt from "alt-server";
import spawnModule from "./modules/spawn";
import { db } from "db";

/**
 * TODO:
 * 1. Add ability to select gender
 * 2. Add ability to select clothes for selected gender
 * 3. Spawn player only after all steps
 * 4. Optional: Save selected gender (model) & clothe set to local storage or db in future
 */
alt.on("playerConnect", async (player) => {
  spawnModule(player);

  const foundPlayer = await db
    .selectFrom("User")
    .where("name", "=", player.name)
    .selectAll()
    .executeTakeFirst();

  if (!foundPlayer) {
    const userStatic = await db
      .insertInto("User")
      .values({ name: player.name })
      .returningAll()
      .executeTakeFirst();

    console.log(
      `${player.name} was not found in db and were created therefor granted ${userStatic?.id} static id`
    );
  }
});
