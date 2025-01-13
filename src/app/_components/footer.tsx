import { Copyright, Location, SmsTracking, Whatsapp } from "iconsax-react";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [showLocation, setShowLocation] = useState(false);

  return (
    <footer className="flex w-full flex-col items-center justify-center gap-3 bg-white py-3 text-center backdrop-blur-3xl">
      <Image
        src={"icons/logo.svg"}
        alt="Logomarca manu"
        width={50}
        height={50}
        className="animate-pulse duration-300 ease-linear hover:scale-125"
      />

      <div className="flex w-full items-center justify-center gap-2">
        <Copyright size="24" color="#0D0D0D" variant="TwoTone" />
        <p className="text-sm text-black">2024 Níkollas David.</p>
      </div>

      <div
        className={`${
          showLocation ? "opacity-100" : "h-0 opacity-0"
        } flex w-full items-center justify-center gap-2 duration-150 ease-linear`}
      >
        <p className="text-sm text-black">Juazeiro do Norte, Ceará, Brasil</p>
      </div>

      <div className="flex flex-row items-center justify-center gap-6">
        <a
          title="+55 (88) 99245-7853"
          href="https://wa.me/5588992457853"
          target="_blank"
        >
          <Whatsapp
            size="24"
            color="#0D0D0D"
            variant="TwoTone"
            className="duration-300 ease-linear hover:scale-125"
          />
        </a>
        <a
          href="mailto:nikollasdavid7@gmail.com"
          className="cursor-pointer"
          title="nikollasdavid7@gmail.com"
        >
          <SmsTracking
            size="24"
            color="#0D0D0D"
            variant="TwoTone"
            className="duration-300 ease-linear hover:scale-125"
          />
        </a>
        <button
          title="Juazeiro no Norte - Ceará - Brasil"
          onClick={() => setShowLocation(!showLocation)}
        >
          <Location
            size="24"
            color="#0D0D0D"
            variant="TwoTone"
            className="duration-300 ease-linear hover:scale-125"
          />
        </button>
        <a href="https://github.com/Ndav07" target="_blank">
          <Image
            src={"icons/github.svg"}
            alt="Ícone github"
            width={24}
            height={24}
            className="duration-300 ease-linear hover:scale-125"
          />
        </a>
        <a href="https://www.linkedin.com/in/nikollas-david" target="_blank">
          <Image
            src={"icons/linkedin.svg"}
            alt="Ícone linkedIn"
            width={24}
            height={24}
            className="duration-300 ease-linear hover:scale-125"
          />
        </a>
      </div>
    </footer>
  );
}
