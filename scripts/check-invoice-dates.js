const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Checking Invoice Issue Dates ===\n');

  // Check customer_invoices in the period
  const startDate = new Date('2025-09-01');
  const endDate = new Date('2025-11-30T23:59:59');

  const invoices = await prisma.customer_invoices.findMany({
    where: {
      issue_date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      order: {
        include: {
          quotations: {
            include: {
              partners: {
                select: {
                  id: true,
                  company_name: true,
                  partner_details: {
                    select: {
                      company_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      issue_date: 'desc',
    },
  });

  console.log(`Total invoices issued between ${startDate.toISOString().split('T')[0]} and ${endDate.toISOString().split('T')[0]}: ${invoices.length}\n`);

  if (invoices.length > 0) {
    console.log('=== Invoice Details ===');
    invoices.forEach(invoice => {
      const partnerName = invoice.order.quotations.partners.partner_details?.company_name ||
                         invoice.order.quotations.partners.company_name ||
                         'Unknown';
      console.log(`Invoice #${invoice.invoice_number}`);
      console.log(`  Partner: ${partnerName} (ID: ${invoice.order.quotations.partners.id})`);
      console.log(`  Issue Date: ${invoice.issue_date.toISOString().split('T')[0]}`);
      console.log(`  Amount: ¥${invoice.grand_total.toLocaleString()}`);
      console.log(`  Status: ${invoice.status}`);
      console.log('---');
    });

    console.log('\n=== Summary by Partner ===');
    const byPartner = {};
    invoices.forEach(invoice => {
      const partnerId = invoice.order.quotations.partners.id;
      const partnerName = invoice.order.quotations.partners.partner_details?.company_name ||
                         invoice.order.quotations.partners.company_name ||
                         'Unknown';
      if (!byPartner[partnerId]) {
        byPartner[partnerId] = {
          name: partnerName,
          count: 0,
          total: 0,
        };
      }
      byPartner[partnerId].count++;
      byPartner[partnerId].total += invoice.grand_total;
    });

    Object.entries(byPartner).forEach(([partnerId, data]) => {
      console.log(`${data.name} (ID: ${partnerId})`);
      console.log(`  Invoices: ${data.count}`);
      console.log(`  Total: ¥${data.total.toLocaleString()}`);
    });
  } else {
    console.log('No invoices found in the specified period!');

    console.log('\n=== Checking all invoices ===');
    const allInvoices = await prisma.customer_invoices.findMany({
      select: {
        id: true,
        invoice_number: true,
        issue_date: true,
        grand_total: true,
      },
      orderBy: {
        issue_date: 'desc',
      },
      take: 10,
    });

    console.log(`Total invoices in database: ${await prisma.customer_invoices.count()}`);
    console.log('\nMost recent 10 invoices:');
    allInvoices.forEach(inv => {
      console.log(`  ${inv.invoice_number}: ${inv.issue_date.toISOString().split('T')[0]} - ¥${inv.grand_total.toLocaleString()}`);
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
