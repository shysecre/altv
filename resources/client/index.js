import alt, { KeyCode } from "alt-client";
import * as natives from "natives";

const player = alt.Player.local;

const spawnVehicleWebView = new alt.WebView("http://resource/ui.html");
let teamselectWebView = new alt.WebView("http://resource/teamselect.html");
let teamscoreWebView = null;

teamselectWebView.focus();
spawnVehicleWebView.focus();

const AsyncFunction = async function () {}.constructor;

let speedometerIntervalId = null;
let speedometerWebView = null;

spawnVehicleWebView.on("spawn-vehicle", () => {
  alt.emitServer("spawn-vehicle", player);
});

alt.setInterval(() => {
  // natives.setWeaponDamageModifier(0, -99999);
  natives.setPedSuffersCriticalHits(player, false);
}, 1000);

alt.onServer("updateTeamInfo", (info) => {
  if (!teamscoreWebView) {
    teamscoreWebView = new alt.WebView("http://resource/teaminfo.html", true);
  }

  teamscoreWebView.emit("team-info", info);
});

function handleTeamSelect(team) {
  player.setMeta("team", team);

  alt.emitServer("team-select", player, team);

  if (teamselectWebView) {
    teamselectWebView.destroy();
    teamselectWebView = null;
  }
}

teamselectWebView.on("team-select", handleTeamSelect);

alt.on("keydown", (key) => {
  switch (key) {
    case KeyCode.H:
      if (!player.vehicle || player.seat !== 1) return;

      natives.setVehicleEngineOn(
        player.vehicle,
        !player.vehicle.engineOn,
        true,
        true
      );

      natives.setVehicleUndriveable(player.vehicle, !player.vehicle.engineOn);

      break;
    case KeyCode["/"]:
      if (!player.hasMeta("team")) return;

      if (teamselectWebView) {
        teamselectWebView.destroy();
        teamselectWebView = null;

        teamscoreWebView = new alt.WebView(
          "http://resource/teaminfo.html",
          true
        );

        return;
      }

      teamscoreWebView.destroy();
      teamscoreWebView = null;

      teamselectWebView = new alt.WebView("http://resource/teamselect.html");
      teamselectWebView.on("team-select", handleTeamSelect);

      teamselectWebView.focus();

      player.deleteMeta("team");

      alt.emitServer("team-unselect");

      break;
    case KeyCode["="]:
      const ped = player.scriptID;

      for (let i = 0; i <= 11; i++) {
        const drawable = natives.getPedDrawableVariation(ped, i);
        const texture = natives.getPedTextureVariation(ped, i);
        const palette = natives.getPedPaletteVariation(ped, i);

        console.log(
          `Component ${i}: drawable=${drawable}, texture=${texture}, palette=${palette}`
        );
      }
      break;
  }
});

function onVehicleEnterAsDriver(vehicle, seat) {
  natives.setVehicleKeepEngineOnWhenAbandoned(vehicle, true);

  speedometerWebView = new alt.WebView("http://resource/index.html");
  spawnVehicleWebView.isVisible = false;
  spawnVehicleWebView.unfocus();

  if (!vehicle.engineOn) {
    natives.setVehicleUndriveable(vehicle, true);
  }

  speedometerIntervalId = alt.setInterval(() => {
    const vehicleSpeed = Math.floor(natives.getEntitySpeed(vehicle) * 3.6);

    speedometerWebView.emit("speedometer", vehicleSpeed, vehicle.engineOn);
  }, 100);
}

alt.on("enteredVehicle", (vehicle, seat) => {
  if (seat !== 1) return;

  onVehicleEnterAsDriver(vehicle, seat);
});

alt.on("changedVehicleSeat", (vehicle, oldSeat, newSeat) => {
  if (newSeat !== 1) return;

  onVehicleEnterAsDriver(vehicle, newSeat);
});

alt.on("leftVehicle", (vehicle, seat) => {
  if (seat !== 1) return;

  if (speedometerWebView) {
    speedometerWebView.destroy();
    speedometerWebView = null;
  }

  if (!spawnVehicleWebView.isVisible) {
    spawnVehicleWebView.isVisible = true;
    spawnVehicleWebView.focus();
  }

  if (speedometerIntervalId) {
    alt.clearInterval(speedometerIntervalId);
  }

  const vehicleLightState = natives.getVehicleLightsState(vehicle)[1];

  if (vehicleLightState) {
    alt.setTimeout(() => {
      natives.setVehicleLights(vehicle, 2);
    }, 100);
  }
});

alt.on("consoleCommand", async (cmd, ...args) => {
  if (cmd === "eval") {
    // alt.emitServer('system:evalLocal', args.join(' '));
    console.log(
      await new AsyncFunction(
        "alt",
        "natives",
        "native",
        "game",
        "player",
        args.join(" ")
      )(alt, natives, natives, natives, player)
    );
  } else if (cmd == "seval") {
    alt.emitServer("system:eval", args.join(" "));
    natives.requestAnimDict("missheist_agency3aig_17");
    natives.taskPlayAnim(
      player,
      "missheist_agency3aig_17",
      "startrappel_fra_rope",
      8.0,
      0,
      -1,
      0,
      0,
      false,
      false,
      false
    );
  } else if (cmd == "kill") {
    natives.setEntityHealth(player, 0, player, 0);
  }
});

new alt.Utils.Keybind(116, () => {
  alt.emitServer("system:eval", "alt.emit('freecam:Toggle', player);");
});

alt.on("playMusic", (url) => {
  const output = new alt.AudioOutputAttached(alt.Player.local);
  const audio = new alt.Audio(url);

  audio.on("inited", () => {
    alt.log(`inited`);
  });
  audio.on("streamStarted", () => {
    alt.log(`streamStarted`);
  });
  audio.on("streamEnded", () => {
    alt.log(`streamEnded`);
  });
  audio.on("streamPaused", () => {
    alt.log(`streamPaused`);
  });
  audio.on("streamReset", () => {
    alt.log(`streamReset`);
  });
  audio.on("streamSeek", (time) => {
    alt.log(`streamSeek: ${time}`);
  });
  audio.on("volumeChange", (vol) => {
    alt.log(`volumeChange: ${vol}`);
  });
  audio.on("error", (code, message) => {
    alt.log(`error: ${code} | ${message}`);
  });

  audio.addOutput(output);
  audio.play();
});
