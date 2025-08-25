/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from "alt-client";
import * as native from "natives";

let hideNametagsInVehicle = false;
let showBarsOnAim = true;
let drawDistance = 100;
let showNametags = false;
let tickHandle;

alt.onServer("nametags:Config", handleConfig);

/**
 * @param  {boolean} _showNametags
 * @param  {boolean} _hideNamesInVehicles
 * @param  {boolean} _showBarsOnAim
 * @param  {number}  _maxDrawDistance
 */
function handleConfig(
  _showNametags,
  _hideNamesInVehicles,
  _showBarsOnAim,
  _maxDrawDistance
) {
  showNametags = _showNametags;
  hideNametagsInVehicle = _hideNamesInVehicles;
  showBarsOnAim = _showBarsOnAim;
  drawDistance = Math.max(5, _maxDrawDistance || 100);

  if (!showNametags) {
    if (tickHandle !== undefined) {
      alt.clearEveryTick(tickHandle);
      tickHandle = undefined;
    }
    return;
  }

  // ensure single registration
  if (tickHandle !== undefined) alt.clearEveryTick(tickHandle);
  tickHandle = alt.everyTick(drawNametags);
}

/**
 * Draw loop (every frame).
 */
function drawNametags() {
  console.log("DRAW NAMETAGSE START");
  // Optional guard to allow other systems to disable draws.
  if (alt.Player.local.getSyncedMeta("STOP_DRAWS")) return;

  const me = alt.Player.local;
  const myVeh = me.vehicle ? me.vehicle.scriptID : 0;

  for (let i = 0, n = alt.Player.all.length; i < n; i++) {
    const player = alt.Player.all[i];
    console.log(player.name);

    if (!player || !player.valid) continue;

    if (player.scriptID === me.scriptID) continue;

    if (
      hideNametagsInVehicle &&
      player.vehicle &&
      myVeh !== player.vehicle.scriptID
    )
      continue;

    const name = player.getSyncedMeta("NAME");

    console.log(`synced name for ${player.id} name: ${name}`);

    if (!name) continue;

    // Need clear line of sight to show name (17 = see-through flags used by R*)
    if (!native.hasEntityClearLosToEntity(me.scriptID, player.scriptID, 17))
      continue;

    const dist = distance2d(player.pos, me.pos);
    if (dist > drawDistance) continue;

    // world position above head
    const head = native.getPedBoneCoords(player.scriptID, 12844, 0, 0, 0); // SKEL_Head
    const pos = { x: head.x, y: head.y, z: head.z + 0.75 };

    // distance-based scaling
    const scale = 1 - (0.8 * dist) / drawDistance; // clamp naturally via dist
    const font = 4; // Chalet London, matches your original
    const fontSize = 0.6 * scale;

    // Safe line height (native if available, otherwise fallback)
    const lineHeight = getLineHeight(fontSize, font);

    // Apply velocity compensation so tags don’t jitter on moving entities
    const entityForVel = player.vehicle
      ? player.vehicle.scriptID
      : player.scriptID;
    const vel = native.getEntityVelocity(entityForVel);
    const frameTime = native.getFrameTime();

    // ===== Name =====
    native.setDrawOrigin(
      pos.x + vel.x * frameTime,
      pos.y + vel.y * frameTime,
      pos.z + vel.z * frameTime,
      0
    );

    native.beginTextCommandDisplayText("STRING");
    native.setTextFont(font);
    native.setTextScale(fontSize, fontSize);
    native.setTextProportional(true);
    native.setTextCentre(true);
    native.setTextColour(255, 255, 255, 255);
    native.setTextOutline();
    const chatting = !!player.getSyncedMeta("CHATTING");
    native.addTextComponentSubstringPlayerName(chatting ? `${name}~r~*` : name);
    native.endTextCommandDisplayText(0, 0, 0);

    // Health bar
    drawBarBackground(100, lineHeight, scale, -1, 139, 0, 0, 255);
    drawBar(
      native.getEntityHealth(player.scriptID) - 100,
      lineHeight,
      scale,
      -1,
      255,
      0,
      0,
      255
    );

    // Armour bar (if any)
    const armour = native.getPedArmour(player.scriptID);
    if (armour > 0) {
      drawBarBackground(100, lineHeight, scale, -1.5, 140, 140, 140, 255);
      drawBar(armour, lineHeight, scale, -1.5, 255, 255, 255, 255);
    }
  }

  native.clearDrawOrigin();
}

/**
 * Distance on X/Y plane only (nice for on-screen sizing).
 */
function distance2d(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Robust line-height helper.
 * Tries `GET_TEXT_SCALE_HEIGHT`; otherwise rescales by screen height so our rectangles
 * don’t collapse when types/natives aren’t ready.
 */
function getLineHeight(scale, font) {
  try {
    // @ts-ignore – not always in older type bundles
    if (typeof native.getTextScaleHeight === "function") {
      // GET_TEXT_SCALE_HEIGHT(scale, font)
      return native.getTextScaleHeight(scale, font);
    }
  } catch {
    /* fall through to fallback */
  }

  // Fallback: normalize to screen height (roughly matches default R* layout)
  const res = alt.getScreenResolution
    ? alt.getScreenResolution()
    : { x: 1920, y: 1080 }; // extremely old SDK fallback
  const screenH = res.y || 1080;
  // Base 1080p heuristic: vanilla ~0.035 line height at scale=1
  const base = 0.035;
  return base * scale * (1080 / screenH);
}

function drawBar(value, lineHeight, scale, position, r, g, b, a) {
  const width = Math.max(0, Math.min(100, value)) * 0.0005 * scale; // clamp 0..100
  native.drawRect(
    (width - 100 * 0.0005 * scale) / 2,
    lineHeight + position * lineHeight,
    width,
    lineHeight / 4,
    r,
    g,
    b,
    a,
    false
  );
}

function drawBarBackground(value, lineHeight, scale, position, r, g, b, a) {
  const width = value * 0.0005 * scale;
  const y = lineHeight + position * lineHeight;
  native.drawRect(
    0,
    y,
    width + 0.002,
    lineHeight / 3 + 0.002,
    0,
    0,
    0,
    255,
    false
  );
  native.drawRect(0, y, width, lineHeight / 3, r, g, b, a, false);
}
