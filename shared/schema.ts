import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// A/B Test related schemas
export const abTestResultSchema = z.object({
  visitorsA: z.number().int().positive(),
  conversionsA: z.number().int().min(0),
  visitorsB: z.number().int().positive(),
  conversionsB: z.number().int().min(0),
  confidenceLevel: z.enum(['0.9', '0.95', '0.99']),
});

export type ABTestResult = z.infer<typeof abTestResultSchema>;

export const statisticalResultSchema = z.object({
  isSignificant: z.boolean(),
  pValue: z.number(),
  zScore: z.number(),
  relativeImprovement: z.number(),
  confidenceInterval: z.object({
    lower: z.number(),
    upper: z.number(),
  }),
  rateA: z.number(),
  rateB: z.number(),
  confidenceLevel: z.enum(['0.9', '0.95', '0.99']),
});

export type StatisticalResult = z.infer<typeof statisticalResultSchema>;
