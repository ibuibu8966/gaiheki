const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const partners = await prisma.partners.findMany({
    where: { login_email: 'test@partner.com' },
    include: { partner_details: true }
  });

  console.log('Partners found:', partners.length);
  console.log(JSON.stringify(partners, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
