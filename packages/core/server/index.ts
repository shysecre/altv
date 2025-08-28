import alt, { hashServerPassword } from "alt-server";
import spawnModule from "./modules/spawn";
import { DB, UserEntity } from "db";

const bootstrap = async () => {
  await DB.initialize();

  /**
   * TODO:
   * 1. Add ability to select gender
   * 2. Add ability to select clothes for selected gender
   * 3. Spawn player only after all steps
   * 4. Optional: Save selected gender (model) & clothe set to local storage or db in future
   */
  alt.on("playerConnect", async (player) => {
    spawnModule(player);

    const userRepository = DB.getRepository(UserEntity);
    const user = userRepository.create({
      password: hashServerPassword("hello").toString(),
      username: player.name
    });

    await userRepository.save(user);
  });
};

bootstrap();
