"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UpdateCategorieDialog } from "~/components/updateDialog";

import { type RouterOutputs } from "~/trpc/react";

export const columns: ColumnDef<
  RouterOutputs["categories"]["findAll"]["categories"][number]
>[] = [
  {
    accessorKey: "cod",
    id: "Código",
    header: "Código",
    cell: ({ row }) => {
      return (
        <div className="truncate" title={row.original.cod}>
          <span>{row.original.cod}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    id: "Nome",
    header: "Nome",
    cell: ({ row }) => {
      return (
        <div className="truncate" title={row.original.title}>
          <span>{row.original.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    id: "Descrição",
    header: "Descrição",
    cell: ({ row }) => {
      return (
        <div
          className="max-w-[40rem] truncate"
          title={row.original.description ?? ""}
        >
          <span>{row.original.description}</span>
        </div>
      );
    },
  },

  {
    id: "Opções",
    header: "Opções",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu de opções</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <UpdateCategorieDialog
              {...row.original}
              description={row.original.description ?? undefined}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
