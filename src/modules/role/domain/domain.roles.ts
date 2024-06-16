export const DOMAIN_ROLES = {
  superadmin: "superadmin",
  admin: "admin",
  user: "user",
};

export type RolesOptions = keyof typeof DOMAIN_ROLES;
