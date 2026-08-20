const UNLOCKED_KEY = "identinet-admin-unlocked";
const PASSCODE_KEY = "identinet-admin-passcode";

export const isAdminUnlocked = () => sessionStorage.getItem(UNLOCKED_KEY) === "1";

export const unlockAdmin = (passcode: string) => {
  sessionStorage.setItem(UNLOCKED_KEY, "1");
  sessionStorage.setItem(PASSCODE_KEY, passcode);
};

export const getAdminPasscode = () => sessionStorage.getItem(PASSCODE_KEY) ?? "";
