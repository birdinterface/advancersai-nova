import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, json, uuid, decimal } from "drizzle-orm/pg-core";


export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 64 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
  membership: varchar("membership", { length: 64 }).notNull().default('free'),
  stripecustomerid: varchar("stripecustomerid", { length: 256 }),
  stripesubscriptionid: varchar("stripesubscriptionid", { length: 256 }),
  previoussubscriptionid: varchar("previoussubscriptionid", { length: 256 }),
  usage: decimal("usage", { precision: 10, scale: 4 }).notNull().default('0.0000'),
  provider: varchar("provider", { length: 20 }).notNull().default('credentials'),
});


export type User = InferSelectModel<typeof user>;


export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  messages: json("messages").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});


export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};
