import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const CharecterSex = {
    FEMALE: "FEMALE",
    MALE: "MALE"
} as const;
export type CharecterSex = (typeof CharecterSex)[keyof typeof CharecterSex];
export type Character = {
    id: Generated<number>;
    name: string;
    lastname: string;
    sex: CharecterSex;
    user_id: number;
};
export type User = {
    id: Generated<number>;
    username: string;
    password: string;
};
export type DB = {
    characters: Character;
    users: User;
};
