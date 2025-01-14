"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex w-full flex-col items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center gap-1">
        <Image
          alt="Logomarca"
          src={"/img/logo-negativo-1.png"}
          width={150}
          height={150}
          className="rounded-lg"
        />
        <p className="text-sm opacity-70">Crie e gerencie por aqui!</p>
      </div>
    </header>
  );
}
