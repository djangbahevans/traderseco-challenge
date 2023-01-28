import { User } from "@/features/auth";

const storagePrefix = "traders_eco_";

const storage = {
  setUser: (user: User) => {
    window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(`${storagePrefix}user`);
  },
  get: <T>(key: string): T =>
    JSON.parse(window.localStorage.getItem(`${storagePrefix}${key}`) as string),
  set: (key: string, value: any) =>
    window.localStorage.setItem(
      `${storagePrefix}${key}`,
      JSON.stringify(value)
    ),
  clear: (key: string) =>
    window.localStorage.removeItem(`${storagePrefix}${key}`),
};

export default storage;
