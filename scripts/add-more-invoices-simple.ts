import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Partner 10の請求書を各ステータス10件ずつ追加中...');

  const partnerId = 10;

  // Partner 10の既存の完了済み受注を取得
  const existingOrders = await prisma.orders.findMany({
    where: {
      order_status: 'COMPLETED',
      quotations: {
        partner_id: partnerId
      },
      customer_invoices: null // 請求書未発行のもの
    },
    include: {
      quotations: true
    },
    take: 50 // 最大50件
  });

  console.log(`✓ 請求書未発行の受注: ${existingOrders.length}件`);

  if (existingOrders.length === 0) {
    console.log('❌ 請求書未発行の受注がありません。先に受注データを作成してください。');
    return;
  }

  // 各ステータスごとに10件ずつ作成
  const statuses = ['DRAFT', 'UNPAID', 'PAID', 'OVERDUE'];
  const targetPerStatus = 10;
  const baseDate = new Date('2024-03-01');

  let invoiceCount = 0;

  for (const status of statuses) {
    console.log(`\n📋 ${status}ステータスの請求書を作成中...`);

    for (let i = 0; i < targetPerStatus; i++) {
      if (invoiceCount >= existingOrders.length) {
        console.log(`⚠️  利用可能な受注がなくなりました`);
        break;
      }

      const order = existingOrders[invoiceCount];
      const orderAmount = order.construction_amount || 1000000;

      // 日付の計算
      const issueDate = new Date(baseDate);
      issueDate.setDate(baseDate.getDate() + invoiceCount);

      const dueDate = new Date(issueDate);
      dueDate.setDate(issueDate.getDate() + 30);

      const paymentDate = new Date(issueDate);
      paymentDate.setDate(issueDate.getDate() + 20);

      // 請求書番号
      const invoiceNumber = `CINV-${issueDate.getFullYear()}${String(issueDate.getMonth() + 1).padStart(2, '0')}-${String(invoiceCount + 100).padStart(4, '0')}`;

      // 金額計算
      const totalAmount = orderAmount;
      const taxAmount = Math.floor(totalAmount * 0.1);
      const grandTotal = totalAmount + taxAmount;

      try {
        const invoice = await prisma.customer_invoices.create({
          data: {
            order_id: order.id,
            invoice_number: invoiceNumber,
            issue_date: issueDate,
            due_date: dueDate,
            total_amount: totalAmount,
            tax_amount: taxAmount,
            grand_total: grandTotal,
            status: status as any,
            payment_date: status === 'PAID' ? paymentDate : null,
            notes: `${status}ステータスのテスト請求書`,
            created_at: issueDate,
            updated_at: issueDate,
          }
        });

        // 請求書明細を作成
        await prisma.customer_invoice_items.createMany({
          data: [
            {
              customer_invoice_id: invoice.id,
              description: '外壁塗装工事費',
              quantity: 1,
              unit: '式',
              unit_price: Math.floor(totalAmount * 0.6),
              amount: Math.floor(totalAmount * 0.6),
              created_at: issueDate,
              updated_at: issueDate,
            },
            {
              customer_invoice_id: invoice.id,
              description: '下地処理費',
              quantity: 1,
              unit: '式',
              unit_price: Math.floor(totalAmount * 0.25),
              amount: Math.floor(totalAmount * 0.25),
              created_at: issueDate,
              updated_at: issueDate,
            },
            {
              customer_invoice_id: invoice.id,
              description: '足場組立・解体費',
              quantity: 1,
              unit: '式',
              unit_price: Math.floor(totalAmount * 0.15),
              amount: Math.floor(totalAmount * 0.15),
              created_at: issueDate,
              updated_at: issueDate,
            }
          ]
        });

        console.log(`  ✓ [${i + 1}/${targetPerStatus}] ${invoiceNumber} - ¥${grandTotal.toLocaleString()} (${status})`);
        invoiceCount++;

      } catch (error) {
        console.error(`  ❌ エラー:`, error);
      }
    }
  }

  // 結果確認
  console.log('\n\n📊 作成結果:');

  for (const status of statuses) {
    const count = await prisma.customer_invoices.count({
      where: {
        status: status as any,
        order: {
          quotations: {
            partner_id: partnerId
          }
        }
      }
    });
    console.log(`  ${status}: ${count}件`);
  }

  const totalCount = await prisma.customer_invoices.count({
    where: {
      order: {
        quotations: {
          partner_id: partnerId
        }
      }
    }
  });

  console.log(`\n✅ Partner 10の請求書合計: ${totalCount}件`);
  console.log('🎉 完了しました！');
}

main()
  .catch((e) => {
    console.error('エラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
