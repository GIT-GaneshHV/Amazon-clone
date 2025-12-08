import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        title: "iPhone 15",
        description: "Apple's latest smartphone with A16 chip.",
        price: 79999,
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg",
        stock: 10,
        category: "Mobiles",
      },
      {
        title: "Samsung Galaxy S24",
        description: "Samsung flagship phone with amazing camera.",
        price: 69999,
        image: "https://m.media-amazon.com/images/I/71Cv0hKKHPL._AC_SL1500_.jpg",
        stock: 15,
        category: "Mobiles",
      },
      {
        title: "Sony WH-1000XM5",
        description: "Noise cancelling headphones.",
        price: 29999,
        image: "https://m.media-amazon.com/images/I/61ZOwY-1GmL._AC_SL1500_.jpg",
        stock: 20,
        category: "Audio",
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
