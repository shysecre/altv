/// <reference types="@altv/types-server" />
import alt from "alt-server";

alt.on("nametags:Config", handleConfig);

/**
 * @param  {alt.Player} player
 * @param  {Boolean} showNametags Draw nametags for all players for player?
 * @param  {Boolean} hideNamesInVehicles=false
 * @param  {Boolean} showBarsOnAim=false
 * @param  {Number} maxDrawDistance=100
 */

function handleConfig(
  player,
  showNametags = true,
  hideNamesInVehicles = false,
  showBarsOnAim = false,
  maxDrawDistance = 25
) {
  alt.emitClient(
    player,
    "nametags:Config",
    showNametags,
    hideNamesInVehicles,
    showBarsOnAim,
    maxDrawDistance
  );
}
