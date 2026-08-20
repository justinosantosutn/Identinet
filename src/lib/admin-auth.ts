const UNLOCKED_KEY = "identinet-admin-unlocked";
const PASSCODE_KEY = "identinet-admin-passcode";

// Also requires a stored passcode, not just the unlocked flag — a session
// unlocked before the passcode started being saved (or with it cleared)
// would otherwise pass the gate but fail every write with a silent
// "unauthorized", since the server checks this same value.
export const isAdminUnlocked = () =>
  sessionStorage.getItem(UNLOCKED_KEY) === "1" && !!sessionStorage.getItem(PASSCODE_KEY);

export const unlockAdmin = (passcode: string) => {
  sessionStorage.setItem(UNLOCKED_KEY, "1");
  sessionStorage.setItem(PASSCODE_KEY, passcode);
};

export const getAdminPasscode = () => sessionStorage.getItem(PASSCODE_KEY) ?? "";
