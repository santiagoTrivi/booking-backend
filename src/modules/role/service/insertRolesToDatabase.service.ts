import { logger } from "../../../config";
import { RoleModel } from "../model/role.model";

export const InsertRolesToDatabaseService = async (roles: string[]) => {
  const existingRoles = await RoleModel.aggregate([
    { $match: { value: { $in: roles } } },
    { $project: { _id: 0, value: 1 } },
  ]);

  const rolesToInsert = roles.filter(
    (role) => !existingRoles.some((existing) => existing.value === role)
  );

  if (rolesToInsert.length > 0) {
    const insertedRoles = await RoleModel.insertMany(
      rolesToInsert.map((role) => ({ value: role }))
    );
    return insertedRoles;
  } else {
    logger.info("No roles to insert");
    return []; // Return empty array to indicate no insertions
  }
};
