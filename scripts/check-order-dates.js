const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Checking Order Dates and Revenue ===\n');

  // Check completed orders with construction_amount
  const completedOrders = await prisma.orders.findMany({
    where: {
      order_status: {
        in: ['COMPLETED', 'REVIEW_COMPLETED']
      }
    },
    include: {
      quotations: {
        include: {
          partners: {
            select: {
              id: true,
              company_name: true
            }
          }
        }
      }
    },
    orderBy: {
      completion_date: 'desc'
    }
  });

  console.log(`Total completed orders: ${completedOrders.length}\n`);

  if (completedOrders.length > 0) {
    console.log('=== Recent Completed Orders ===');
    completedOrders.slice(0, 10).forEach(order => {
      console.log(`Order ID: ${order.id}`);
      console.log(`Partner: ${order.quotations.partners.company_name} (ID: ${order.quotations.partners.id})`);
      console.log(`Completion Date: ${order.completion_date?.toISOString().split('T')[0] || 'N/A'}`);
      console.log(`Construction Amount: ¥${(order.construction_amount || 0).toLocaleString()}`);
      console.log(`Order Status: ${order.order_status}`);
      console.log('---');
    });

    console.log('\n=== Date Range Summary ===');
    const dates = completedOrders
      .filter(o => o.completion_date)
      .map(o => o.completion_date);

    if (dates.length > 0) {
      const oldest = new Date(Math.min(...dates.map(d => d.getTime())));
      const newest = new Date(Math.max(...dates.map(d => d.getTime())));
      console.log(`Oldest completion: ${oldest.toISOString().split('T')[0]}`);
      console.log(`Newest completion: ${newest.toISOString().split('T')[0]}`);
    }

    console.log('\n=== Revenue by Partner (All Time) ===');
    const revenueByPartner = {};
    completedOrders.forEach(order => {
      const partnerId = order.quotations.partners.id;
      const partnerName = order.quotations.partners.company_name;
      if (!revenueByPartner[partnerId]) {
        revenueByPartner[partnerId] = {
          name: partnerName,
          revenue: 0,
          count: 0
        };
      }
      revenueByPartner[partnerId].revenue += order.construction_amount || 0;
      revenueByPartner[partnerId].count += 1;
    });

    Object.entries(revenueByPartner)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .forEach(([partnerId, data]) => {
        console.log(`${data.name} (ID: ${partnerId})`);
        console.log(`  Revenue: ¥${data.revenue.toLocaleString()}`);
        console.log(`  Completed: ${data.count} orders`);
      });

    console.log('\n=== November 2025 Check ===');
    const nov2025Orders = completedOrders.filter(o => {
      if (!o.completion_date) return false;
      const date = new Date(o.completion_date);
      return date.getFullYear() === 2025 && date.getMonth() === 10; // November is month 10
    });
    console.log(`Orders completed in November 2025: ${nov2025Orders.length}`);
  } else {
    console.log('No completed orders found!');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
