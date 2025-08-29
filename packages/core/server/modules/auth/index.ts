import alt, { type Player } from "alt-server";
import {
  LocalEvents,
  type AuthLoginData,
  type AuthRegisterData,
  type NotificationData
} from "shared";
import { userRepository } from "../../db/repotisory";

alt.onClient(LocalEvents.AUTH_COMPLETE_LOGIN, onAuthCompleteLogin);
alt.onClient(LocalEvents.AUTH_COMPLETE_REGISTER, onAuthCompleteRegister);

export function onAuthStart(player: Player) {
  console.log(`Emiting client event ${LocalEvents.AUTH_START}`);
  alt.emitClient(player, LocalEvents.AUTH_START, player);
}

export async function onAuthCompleteLogin(
  player: Player,
  { username, password }: AuthLoginData
) {
  const foundUser = await userRepository.findUserByUsernameAndPassword(
    username,
    password
  );

  if (!foundUser) {
    const notification: NotificationData = {
      message: "User with provided information was not found",
      type: "error"
    };

    return alt.emitClient(player, LocalEvents.SHOW_NOTIFICATION, notification);
  }

  player.setMeta("staticID", foundUser.id);
}

export async function onAuthCompleteRegister(
  player: Player,
  { username, password }: AuthRegisterData
) {
  const foundUserWithSameName = await userRepository.findUserByUsername(
    username
  );

  // TODO: Handle this case and report back to client -> webview
  if (!foundUserWithSameName) {
    return;
  }

  const registeredUser = await userRepository.createUserByUsernameAndPassword(
    username,
    password
  );

  // TODO: Handle case when user cannot be created by something???
  if (!registeredUser) {
    return;
  }

  player.setMeta("staticID", registeredUser.id);
}
