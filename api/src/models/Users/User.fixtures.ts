export const users: {
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  plainPassword: string;
  isOnline: boolean,
  role: string;
}[] = [
  {
    firstname: "Vincent",
    lastname: "Dubresson",
    birthdate: new Date("1983-07-24"),
    email: "vincent.dubresson@live.fr",
    plainPassword: "password",
    isOnline: true,
    role: "ROLE_ADMIN",
  },
  {
    firstname: "Natacha",
    lastname: "Bertin",
    birthdate: new Date("1980-10-08"),
    email: "natachabertin@sfr.fr",
    plainPassword: "password",
    isOnline: true,
    role: "ROLE_USER",
  },
];
