export const ROLE_MAPPING = [
  {
    role: "Super-Admin",
    menu: ["upload", "entity"],
    permissions: [
      // commented permissions derived by default based on the menu
      // "upload",
      // "view entity list",
      // "view enity",
      // "view member list",
      // "view member",
      "activate/deactivate",
      "update entity",
      "update member",
      // "view profile",
    ],
  },
  {
    role: "Package-Owner-Entity",
    menu: ["members"],
    permissions: [
      // commented permissions derived by default based on the menu
      // "view member list",
      // "view member",
      // "view profile",
      "update profile",
      "optout",
    ],
  },
  {
    role: "Package-Executor-Entity",
    menu: ["members"],
    permissions: [
      // commented permissions derived by default based on the menu
      // "view member list",
      // "view member",
      // "view profile",
      "update profile",
      "optout",
    ],
  },
  {
    role: "Package-Owner-Manager",
    menu: [],
    permissions: [
      // commented permissions derived by default based on the menu
      // "view profile",
      "update profile",
      "optout",
    ],
  },
  {
    role: "Package-Executor-Manager",
    menu: [],
    permissions: [
      // commented permissions derived by default based on the menu
      // "view profile",
      "update profile",
      "optout",
    ],
  },
  {
    role: "Package-Executor-Team-Member",
    menu: [],
    permissions: [
      // commented permissions derived by default based on the menu
      // "view profile",
      "update profile",
      "optout",
    ],
  },
];
