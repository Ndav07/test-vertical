import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import SpinLoader from "~/components/ui/spin-loader";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string({ required_error: "Campo obrigatório" }),
  cod: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
  description: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  id: string;
  title: string;
  cod: string;
  description?: string;
}

export function UpdateCategorieDialog(props: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const apiUtils = api.useUtils();
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props,
    },
  });

  const updateCategorie = api.categories.update.useMutation();

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    updateCategorie.mutate(
      {
        id: props.id,
        ...data,
      },
      {
        onSuccess: () => {
          void apiUtils.categories.findAll.invalidate();
          toast({
            title: "Edição concluído",
            description: "Edição realizada com sucesso.",
            variant: "success",
          });
          reset();
          setOpenModal(!openModal);
        },
        onError: (err) => {
          console.log(err);
          toast({
            title: "Erro!",
            description: err.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          setOpenModal(!openModal);
        }
      }}
    >
      <DialogTrigger asChild>
        <p
          onClick={() => setOpenModal(true)}
          className="text-700 cursor-pointer rounded-md px-2 py-2 text-sm hover:bg-accent"
        >
          Editar
        </p>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edição de categoria</DialogTitle>
          <DialogDescription>
            Insira as informações abaixo para concluir o edição.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(onSubmit, console.log)}
        >
          <div className="flex flex-col gap-1">
            <Label>
              Código <span className="text-red-500">*</span>
            </Label>
            <Input {...register("cod")} placeholder="Digite a resposta" />
            {formState.errors.cod && (
              <span className="text-xs text-red-500">
                {formState.errors.cod.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label>
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input {...register("title")} placeholder="Digite a resposta" />
            {formState.errors.title && (
              <span className="text-xs text-red-500">
                {formState.errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label>Descrição</Label>
            <Textarea
              {...register("description")}
              placeholder="Digite a resposta"
            />
          </div>

          <Button className="mt-2 w-fit bg-main px-4">
            {updateCategorie.isPending ? <SpinLoader /> : "Editar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
