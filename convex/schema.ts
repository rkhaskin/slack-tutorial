import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
const schema = defineSchema({
  ...authTables, // has users, sessions, and all other auth table schemas
});

export default schema;
