const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkYamadaOrders() {
  try {
    // まず、有限会社山田塗装工業のパートナーIDを取得
    const partner = await prisma.partner_companies.findFirst({
      where: {
        name: {
          contains: '山田塗装工業'
        }
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    if (!partner) {
      console.log('❌ 有限会社山田塗装工業が見つかりませんでした');
      return;
    }

    console.log('✅ パートナー情報:');
    console.log(`   ID: ${partner.id}`);
    console.log(`   名前: ${partner.name}`);
    console.log(`   Email: ${partner.email}`);
    console.log('');

    // このパートナーの全受注を取得
    const allOrders = await prisma.orders.findMany({
      where: {
        partner_id: partner.id
      },
      include: {
        customer_invoices: true,
        quotations: {
          include: {
            customers: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    console.log(`📦 全受注数: ${allOrders.length}`);
    console.log('');

    // 施工完了済みの受注
    const completedOrders = allOrders.filter(o => o.status === 'CONSTRUCTION_COMPLETED');
    console.log(`✅ 施工完了済み受注: ${completedOrders.length}件`);
    console.log('');

    // 請求書未発行の受注（施工完了済み）
    const ordersWithoutInvoice = completedOrders.filter(o => !o.customer_invoices);

    console.log(`📋 請求書未発行の受注: ${ordersWithoutInvoice.length}件`);
    console.log('');

    if (ordersWithoutInvoice.length > 0) {
      console.log('【請求書未発行の受注詳細】');
      ordersWithoutInvoice.forEach((order, index) => {
        console.log(`\n${index + 1}. 受注ID: ${order.id}`);
        console.log(`   顧客名: ${order.quotations.customers.name}`);
        console.log(`   工事金額: ¥${order.construction_amount?.toLocaleString() || '0'}`);
        console.log(`   施工開始日: ${order.construction_start_date?.toISOString().split('T')[0] || '未定'}`);
        console.log(`   施工完了日: ${order.construction_end_date?.toISOString().split('T')[0] || '未定'}`);
        console.log(`   ステータス: ${order.status}`);
      });
    } else {
      console.log('ℹ️  請求書未発行の受注はありません（全て請求書発行済みか、施工未完了です）');
    }

    // 請求書発行済みの受注
    const ordersWithInvoice = completedOrders.filter(o => o.customer_invoices);
    if (ordersWithInvoice.length > 0) {
      console.log('\n\n【請求書発行済みの受注】');
      console.log(`発行済み: ${ordersWithInvoice.length}件`);
      ordersWithInvoice.forEach((order, index) => {
        console.log(`\n${index + 1}. 受注ID: ${order.id}`);
        console.log(`   請求書ID: ${order.customer_invoices?.id}`);
        console.log(`   請求書番号: ${order.customer_invoices?.invoice_number}`);
        console.log(`   ステータス: ${order.customer_invoices?.status}`);
        console.log(`   合計金額: ¥${order.customer_invoices?.total_amount?.toLocaleString() || '0'}`);
      });
    }

  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkYamadaOrders();
