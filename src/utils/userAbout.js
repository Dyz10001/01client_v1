import { v4 as uuidv4 } from "uuid";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export function getUserTempId() {
  let userTempId = localStorage.getItem("UESRTEMPID_KEY");
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem("UESRTEMPID_KEY", userTempId);
  }
  return userTempId;
}
