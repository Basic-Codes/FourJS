// store/users.ts
import { atom } from "nanostores";

export const $user = atom("rifat");

export function setUser(user) {
  $user.set(user);
}
