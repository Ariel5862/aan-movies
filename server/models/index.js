// ייצוא כל המודלים

export { default as User } from "./User.js";


// אפשר גם לייצא את המודלים כאובייקט אחד
export const Models = {

  User: (await import("./User.js")).default,

};
