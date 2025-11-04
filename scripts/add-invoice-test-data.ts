import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 有限会社山田塗装工業（partner_id = 10）のテストデータを追加中...');

  const partnerId = 10;
  const baseDate = new Date('2024-01-01');

  const customerNames = [
    '山田太郎', '佐藤花子', '鈴木一郎', '田中美咲', '高橋健太',
    '伊藤愛子', '渡辺大輔', '中村由美', '小林隆', '加藤さくら'
  ];

  for (let i = 1; i <= 20; i++) {
    try {
      console.log(`\n[${i}/20] データ作成中...`);

      // 日付の計算
      const customerDate = new Date(baseDate);
      customerDate.setDate(baseDate.getDate() + i);

      const diagnosisDate = new Date(baseDate);
      diagnosisDate.setDate(baseDate.getDate() + i + 1);

      const quotationDate = new Date(baseDate);
      quotationDate.setDate(baseDate.getDate() + i + 3);

      const orderDate = new Date(baseDate);
      orderDate.setDate(baseDate.getDate() + i + 5);

      const startDate = new Date(baseDate);
      startDate.setDate(baseDate.getDate() + i + 10);

      const endDate = new Date(baseDate);
      endDate.setDate(baseDate.getDate() + i + 25);

      const invoiceDate = new Date(baseDate);
      invoiceDate.setDate(baseDate.getDate() + i + 30);

      const dueDate = new Date(baseDate);
      dueDate.setDate(baseDate.getDate() + i + 60);

      const paymentDate = new Date(baseDate);
      paymentDate.setDate(baseDate.getDate() + i + 55);

      // 顧客を作成
      const customer = await prisma.customers.create({
        data: {
          customer_name: `${customerNames[i % 10]} (${i})`,
          customer_phone: `090-${String(1000 + i).padStart(4, '0')}-${String(i).padStart(4, '0')}`,
          customer_email: `customer${i}@example.com`,
          construction_address: `大阪府大阪市中区テスト${i}-${i}-${i}`,
          customer_construction_type: ['EXTERIOR_PAINTING', 'ROOF_PAINTING', 'FULL_REPLACEMENT'][i % 3] as any,
          construction_amount: 1000000 + (i * 50000),
          customer_status: 'COMPLETED',
          partner_id: partnerId,
          created_at: customerDate,
          updated_at: customerDate,
        }
      });

      console.log(`  ✓ 顧客作成: ${customer.customer_name} (ID: ${customer.id})`);

      // 診断依頼を作成
      const diagnosis = await prisma.diagnosis_requests.create({
        data: {
          customer_id: customer.id,
          diagnosis_number: `DIAG-${diagnosisDate.getFullYear()}${String(diagnosisDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(4, '0')}`,
          prefecture: 'Osaka',
          building_type: ['DETACHED_HOUSE', 'APARTMENT', 'COMMERCIAL'][i % 3] as any,
          building_age: ['UNDER_10_YEARS', 'FROM_11_TO_20', 'FROM_21_TO_30', 'OVER_31'][i % 4] as any,
          building_area: ['UNDER_100', 'FROM_101_TO_200', 'FROM_201_TO_300', 'FROM_301_TO_500'][i % 4] as any,
          current_exterior_material: ['MORTAR', 'SIDING', 'TILE'][i % 3] as any,
          current_exterior_condition: ['GOOD', 'SLIGHTLY_DEGRADED', 'MODERATELY_DEGRADED', 'SIGNIFICANTLY_DEGRADED', 'REQUIRES_REPAIR'][i % 5] as any,
          desired_construction_timing: ['WITHIN_3_MONTHS', 'WITHIN_6_MONTHS', 'WITHIN_1_YEAR', 'UNDECIDED'][i % 4] as any,
          request_details: `外壁の劣化が気になるため、診断をお願いします。テストデータ ${i}`,
          inspection_photos: [],
          status: 'COMPLETED',
          created_at: customerDate,
          updated_at: diagnosisDate,
        }
      });

      console.log(`  ✓ 診断依頼作成: ${diagnosis.diagnosis_number} (ID: ${diagnosis.id})`);

      // 見積もりを作成
      const quotation = await prisma.quotations.create({
        data: {
          diagnosis_request_id: diagnosis.id,
          partner_id: partnerId,
          quotation_amount: 1000000 + (i * 50000),
          quotation_details: JSON.stringify({
            items: [
              { name: '外壁塗装', amount: 800000 + (i * 40000) },
              { name: '屋根塗装', amount: 200000 + (i * 10000) }
            ]
          }),
          construction_period_estimate: ['2週間', '3週間', '1ヶ月'][i % 3],
          notes: '高品質な塗料を使用し、丁寧に施工いたします。',
          is_selected: true,
          status: 'ACCEPTED',
          created_at: quotationDate,
          updated_at: quotationDate,
        }
      });

      console.log(`  ✓ 見積もり作成: ¥${quotation.quotation_amount.toLocaleString()} (ID: ${quotation.id})`);

      // 受注を作成
      const order = await prisma.orders.create({
        data: {
          quotation_id: quotation.id,
          construction_amount: 1000000 + (i * 50000),
          construction_start_date: startDate,
          construction_end_date: endDate,
          completion_date: endDate,
          order_status: 'COMPLETED',
          order_date: orderDate,
          partner_memo: '施工完了。お客様も満足されています。',
          created_at: orderDate,
          updated_at: endDate,
        }
      });

      console.log(`  ✓ 受注作成: ID ${order.id} (施工完了)`);

      // 顧客請求書を作成（10件中7件に請求書を発行）
      if (i % 10 < 7) {
        const invoiceNumber = `CINV-${invoiceDate.getFullYear()}${String(invoiceDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(4, '0')}`;
        const totalAmount = 1000000 + (i * 50000);
        const taxAmount = Math.floor(totalAmount * 0.1);
        const grandTotal = totalAmount + taxAmount;

        const invoice = await prisma.customer_invoices.create({
          data: {
            order_id: order.id,
            invoice_number: invoiceNumber,
            issue_date: invoiceDate,
            due_date: dueDate,
            total_amount: totalAmount,
            tax_amount: taxAmount,
            grand_total: grandTotal,
            status: ['PAID', 'UNPAID', 'OVERDUE'][i % 3] as any,
            payment_date: i % 3 === 0 ? paymentDate : null,
            notes: '外壁塗装工事の請求書です。',
            created_at: invoiceDate,
            updated_at: invoiceDate,
          }
        });

        console.log(`  ✓ 請求書作成: ${invoice.invoice_number} - ¥${grandTotal.toLocaleString()}`);

        // 請求書明細を作成
        await prisma.customer_invoice_items.createMany({
          data: [
            {
              customer_invoice_id: invoice.id,
              description: '外壁塗装工事一式',
              quantity: 1,
              unit: '式',
              unit_price: 800000 + (i * 40000),
              amount: 800000 + (i * 40000),
              created_at: invoiceDate,
              updated_at: invoiceDate,
            },
            {
              customer_invoice_id: invoice.id,
              description: '屋根塗装工事一式',
              quantity: 1,
              unit: '式',
              unit_price: 200000 + (i * 10000),
              amount: 200000 + (i * 10000),
              created_at: invoiceDate,
              updated_at: invoiceDate,
            }
          ]
        });

        console.log(`  ✓ 請求書明細作成: 2件`);
      } else {
        console.log(`  ✓ 請求書: なし（未発行）`);
      }

      console.log(`✅ [${i}/20] 完了`);

    } catch (error) {
      console.error(`❌ [${i}/20] エラー:`, error);
    }
  }

  // 作成されたデータを確認
  console.log('\n\n📊 データ確認:');

  const completedOrders = await prisma.orders.count({
    where: {
      order_status: 'COMPLETED',
      quotations: {
        partner_id: partnerId
      }
    }
  });

  const invoiceCount = await prisma.customer_invoices.count({
    where: {
      order: {
        quotations: {
          partner_id: partnerId
        }
      }
    }
  });

  const uninvoicedOrders = await prisma.orders.count({
    where: {
      order_status: 'COMPLETED',
      quotations: {
        partner_id: partnerId
      },
      customer_invoices: null
    }
  });

  console.log(`✅ Partner 10の施工完了済み受注数: ${completedOrders}件`);
  console.log(`✅ Partner 10の顧客請求書数: ${invoiceCount}件`);
  console.log(`✅ Partner 10の請求書未発行の完了受注数: ${uninvoicedOrders}件`);

  console.log('\n🎉 テストデータの追加が完了しました！');
}

main()
  .catch((e) => {
    console.error('エラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
