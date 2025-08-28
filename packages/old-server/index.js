const alt = require("alt-server");

console.log("Server is running...");

alt.on("playerDisconnect", (player) => {
  console.log(player.name + " disconnected");

  player.deleteMeta("team");

  for (const p of alt.Player.all.filter((p) => p.hasMeta("team"))) {
    const playerTeam = p.getMeta("team");

    alt.emitClient(p, "updateTeamInfo", { team: playerTeam, ...getTeamData() });
  }
});

alt.on("consoleCommand", (command, ...args) => {
  console.log(
    `You entered the command: ${command} | ${typeof args} ${args[0]}`
  );
});

function getTeamData() {
  const redPlayers = alt.Player.all
    .filter((p) => p.hasMeta("team") && p.getMeta("team") === "red")
    .map((p) => p.name);

  const bluePlayers = alt.Player.all
    .filter((p) => p.hasMeta("team") && p.getMeta("team") === "blue")
    .map((p) => p.name);

  return {
    redPlayers,
    redScore: teams.red.score,
    bluePlayers,
    blueScore: teams.blue.score
  };
}

alt.onClient("team-unselect", (serverPlayer) => {
  const previouslySelectedTeam = serverPlayer.getMeta("team");
  serverPlayer.deleteMeta("team");
  serverPlayer.spawn(...spawnCords);
  serverPlayer.removeAllWeapons(true);

  const teamData = teams[previouslySelectedTeam];
  const newSetOfClothes = teamData.clothes.map((cloth) => {
    const newCloth = { ...cloth, drawable: 0, texture: 0 };

    return newCloth;
  });

  setClothes(serverPlayer, newSetOfClothes);

  for (p of alt.Player.all.filter((p) => p.hasMeta("team"))) {
    alt.emitClient(p, "updateTeamInfo", {
      team: p.getMeta("team"),
      ...getTeamData()
    });
  }
});

alt.onClient("team-select", async (serverPlayer, player, team) => {
  serverPlayer.setMeta("team", team);
  serverPlayer.spawn(...teams[team].spawnCords);
  serverPlayer.giveWeapon(alt.hash("weapon_pistol"), 500, true);

  setClothes(serverPlayer, teams[team].clothes);

  await new Promise((resolve) => setTimeout(resolve, 500));

  for (const p of alt.Player.all.filter((p) => p.hasMeta("team"))) {
    alt.emitClient(p, "updateTeamInfo", {
      team: p.getMeta("team"),
      ...getTeamData()
    });
  }
});

function setClothes(player, inputClothes) {
  for (const clothes of inputClothes) {
    switch (clothes.type) {
      case "prop":
        player.setProp(clothes.componentId, clothes.drawable, clothes.texture);
        break;
      case "cloth":
        player.setClothes(
          clothes.componentId,
          clothes.drawable,
          clothes.texture
        );
        break;
    }
  }
}

alt.onClient("spawn-vehicle", (player) => {
  const vehicle = new alt.Vehicle("bullet", player.pos, player.rot);
  vehicle.dimension = player.dimension;
  vehicle.numberPlateText = "YUME";
  vehicle.locked = false;
  vehicle.engineOn = false;

  player.setIntoVehicle(vehicle, 1);
});

alt.on("playerDeath", (player, killer, weapon) => {
  const playerTeamMeta = player.getMeta("team");
  const playerTeamData = teams[playerTeamMeta];
  const spawnIn = !playerTeamMeta ? spawnCords : playerTeamData.spawnCords;

  const metaTeam = "getMeta" in killer ? killer.getMeta("team") : null;

  if (metaTeam && playerTeamMeta !== metaTeam) {
    teams[metaTeam].score += 1;

    for (const p of alt.Player.all.filter((p) => p.hasMeta("team"))) {
      alt.emitClient(p, "updateTeamInfo", {
        team: p.getMeta("team"),
        ...getTeamData()
      });
    }
  }

  console.log(`Player ${player.name} died`);
  player.spawn(...spawnIn);
});

alt.on("weaponDamage", (source, target, weaponHash, damage) => {
  const sourceTeam = source?.getMeta("team");
  const targetTeam = target?.getMeta("team");

  if (sourceTeam === targetTeam) {
    return 0;
  } else {
    return damage;
  }
});

const AsyncFunction = async function () {}.constructor;
alt.onClient("system:eval", (player, code) => {
  console.log(`Player ${player.name} executed code: ${code}`);
  new AsyncFunction("alt", "player", code)(alt, player);
});
