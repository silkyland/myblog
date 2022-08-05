import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
const client = new PrismaClient();

async function main() {
  try {
    const user = await client.user.create({
      data: {
        email: 'admin@gmail.com',
        password: hashSync('1234', 10),
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/300?img=1',
        role: 'admin',
      },
    });
    console.log(`Created user ${user.id}`);
    client.$disconnect();
  } catch (error) {
    console.error(error);
    client.$disconnect();
    process.exit(1);
  }
}

main();
