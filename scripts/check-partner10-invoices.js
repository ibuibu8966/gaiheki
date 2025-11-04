const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find invoices for partner 10
  const invoices = await prisma.customer_invoices.findMany({
    where: {
      order: {
        quotations: {
          partner_id: 10
        }
      }
    },
    include: {
      order: {
        include: {
          quotations: {
            include: {
              diagnosis_requests: {
                include: {
                  customers: true
                }
              }
            }
          }
        }
      }
    }
  });

  console.log(`Found ${invoices.length} invoices for Partner 10 (有限会社山田塗装工業):`);
  invoices.forEach(inv => {
    const customer = inv.order.quotations.diagnosis_requests.customers;
    console.log(`- Invoice ${inv.id}: ${inv.invoice_number} - Customer: ${customer.customer_name} - Amount: ¥${inv.grand_total}`);
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
