const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const partners = await prisma.partners.findMany({
    include: { partner_details: true }
  });

  console.log('Total partners found:', partners.length);
  partners.forEach(p => {
    console.log(`- ID: ${p.id}, Email: ${p.login_email}, Username: ${p.username}, Company: ${p.partner_details?.company_name || 'N/A'}`);
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
