import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    // 診断ID 151の情報を取得
    const diagnosis = await prisma.diagnosis_requests.findUnique({
      where: { id: 151 },
      include: {
        customers: true,
        quotations: {
          include: {
            partners: true,
            orders: {
              include: {
                customer_invoices: true
              }
            }
          }
        }
      }
    });

    if (!diagnosis) {
      return NextResponse.json({
        success: false,
        message: '診断ID 151が見つかりませんでした'
      });
    }

    // データを整理
    const result = {
      diagnosis: {
        id: diagnosis.id,
        diagnosisNumber: diagnosis.diagnosis_number,
        customerName: diagnosis.customers?.customer_name,
        prefecture: diagnosis.prefecture,
        status: diagnosis.status
      },
      quotations: diagnosis.quotations.map(q => ({
        id: q.id,
        partnerId: q.partner_id,
        partnerName: q.partners?.name,
        quotationAmount: q.quotation_amount,
        isSelected: q.is_selected,
        hasOrder: q.orders ? true : false,
        order: q.orders ? {
          id: q.orders.id,
          orderStatus: q.orders.order_status,
          orderDate: q.orders.order_date,
          hasInvoice: q.orders.customer_invoices ? true : false
        } : null
      }))
    };

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('診断151の取得エラー:', error);
    return NextResponse.json({
      success: false,
      message: 'エラーが発生しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
