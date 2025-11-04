const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check invoice 53
  const invoice = await prisma.customer_invoices.findUnique({
    where: { id: 53 },
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

  if (!invoice) {
    console.log('Invoice 53 not found');
    return;
  }

  const customer = invoice.order.quotations.diagnosis_requests.customers;
  console.log('Invoice 53 details:');
  console.log('- Invoice ID:', invoice.id);
  console.log('- Invoice Number:', invoice.invoice_number);
  console.log('- Customer ID:', customer.id);
  console.log('- Customer Name:', customer.customer_name);
  console.log('- Partner ID:', customer.partner_id);

  // Get partner details
  const partner = await prisma.partners.findUnique({
    where: { id: customer.partner_id },
    include: { partner_details: true }
  });

  console.log('- Partner:', partner?.partner_details?.company_name);
  console.log('- Partner Email:', partner?.login_email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
