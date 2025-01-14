import { type Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  findAll: publicProcedure
    .input(
      z.object({
        title: z.string().optional(),
        cod: z.string().optional(),
        cursor: z.string().optional(),
        page: z.number().optional().default(0),
      }),
    )
    .query(async ({ ctx: { db }, input }) => {
      const limit = 10;
      const skip = limit * input.page;
      const where: Prisma.CategoriesWhereInput = {
        cod: { contains: input.cod },
        title: { contains: input.title },
      };
      const categories = await db.categories.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      });

      const categoriesCount = await db.categories.count({ where });
      const qtPages = Math.ceil(categoriesCount / limit);

      return {
        categories: categories.map((categorie) => ({
          id: categorie.id,
          cod: categorie.cod,
          title: categorie.title,
          description: categorie.description,
        })),
        qtPages,
        currentPage: input.page,
        nextPage: qtPages === input.page ? null : input.page + 1,
        prevPage: input.page === 1 ? null : input.page - 1,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        cod: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      await db.categories.create({
        data: {
          id: randomUUID(),
          cod: input.cod.toLocaleUpperCase(),
          title: input.title,
          description: input.description,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        cod: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      await db.categories.update({
        where: { id: input.id },
        data: {
          cod: input.cod.toLocaleUpperCase(),
          title: input.title,
          description: input.description,
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      await db.categories.delete({
        where: { id: input.id },
      });
    }),
});
