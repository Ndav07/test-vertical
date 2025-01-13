import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      id: randomUUID(),
      title: "Rodoviário",
      cod: "R1D45",
      description:
        "Transporte terrestre por meio de caminhões, carretas e outros veículos.",
    },
    {
      id: randomUUID(),
      title: "Aéreo",
      cod: "A3ER7",
      description:
        "Transporte de cargas por via aérea, utilizando aviões cargueiros.",
    },
    {
      id: randomUUID(),
      title: "Marítimo",
      cod: "M8SH9",
      description:
        "Transporte de cargas por via marítima, utilizando navios cargueiros e contêineres.",
    },
  ];

  await prisma.categories.createMany({
    data: categories.map((item) => ({
      id: item.id,
      cod: item.cod,
      title: item.title,
      description: item.description,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
