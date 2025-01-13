"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";



export default function Home() {
  const { toast } = useToast();
  

  return (
    <main className="flex h-screen items-center justify-center">
      
    </main>
  );
}
