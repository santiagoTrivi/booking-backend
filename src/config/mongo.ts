import "dotenv/config";
import { connect } from "mongoose";
import { configServer, isDevelopmet } from "./configServer";
import { InsertRolesToDatabaseService } from "../modules/role/service/insertRolesToDatabase.service";
import { DOMAIN_ROLES } from "../modules/role/domain/domain.roles";
import { CreateSuperAdminService } from "../modules/auth/services/createSuperAdmin.service";

export async function dbConnect(): Promise<void> {
  const DATABASE_URL = isDevelopmet()
    ? configServer.DEVELOPEMENT_DATABASE_URL
    : configServer.DB_URI;

  // DB_URI = <string>process.env.DB_URI;

  await connect(DATABASE_URL);
  await InsertRolesToDatabaseService(Object.values(DOMAIN_ROLES));
  await CreateSuperAdminService();
}

export default dbConnect;
