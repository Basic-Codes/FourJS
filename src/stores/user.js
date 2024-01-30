// store/users.ts
import { atom } from "nanostores";

export const $user = atom(null);

export function setUser(user) {
    $user.set(user);
}
