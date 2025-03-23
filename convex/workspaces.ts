import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// api end points to convex

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

// this is like a DAO. Will be called from another class
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // see if we are logged in
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const joinCode = "123456";

    const workspaceId = ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});
