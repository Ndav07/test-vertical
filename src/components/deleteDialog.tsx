import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogHeader } from "~/components/ui/dialog";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import SpinLoader from "~/components/ui/spin-loader";

interface Props {
  id: string;
}

export function DeleteDialog({ id }: Props) {
  const apiUtils = api.useUtils();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { toast } = useToast();
  const deleteCategorie = api.categories.delete.useMutation();
  function handleSubmit() {
    deleteCategorie.mutate(
      { id },
      {
        onSuccess: () => {
          void apiUtils.categories.findAll.invalidate();
          toast({
            title: "Deletado com sucesso",
            description: "Deleção de categoria realizada.",
            variant: "success",
          });
          setOpenModal(!openModal);
        },
        onError: (err) => {
          console.log(err);
          toast({
            title: "Erro!",
            description: "Erro na deleção, tente novamente.",
            variant: "destructive",
          });
        },
      },
    );
  }
  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) {
          setOpenModal(!openModal);
        }
      }}
    >
      <DialogTrigger
        className="w-full items-start text-start"
        onClick={() => setOpenModal(true)}
      >
        <p className="text-700 w-full cursor-pointer rounded-md px-2 py-2 text-sm text-red-700 hover:bg-gray-100">
          Deletar
        </p>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Atenção!</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja deletar está categoria?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row gap-2">
          <Button variant={"outline"} onClick={() => setOpenModal(false)}>
            Não, cancelar
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleSubmit()}
            disabled={deleteCategorie.isPending}
          >
            {deleteCategorie.isPending ? <SpinLoader /> : `Sim, deletar`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
