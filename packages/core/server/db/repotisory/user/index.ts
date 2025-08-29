import { db } from "../..";

class UserRepository {
  public findUserByUsername(username: string) {
    return db
      .selectFrom("users")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();
  }

  public findUserByUsernameAndPassword(username: string, password: string) {
    return db
      .selectFrom("users")
      .selectAll()
      .where(({ and, eb }) =>
        and([eb("username", "=", username), eb("password", "=", password)])
      )
      .executeTakeFirst();
  }

  public createUserByUsernameAndPassword(username: string, password: string) {
    return db
      .insertInto("users")
      .values({ username, password })
      .returningAll()
      .executeTakeFirst();
  }
}

export const userRepository = new UserRepository();
