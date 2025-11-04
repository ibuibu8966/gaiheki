import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    console.log('Starting Yamada orders debug...');

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
      return NextResponse.json({
        success: false,
        message: '有限会社山田塗装工業が見つかりませんでした'
      });
    }

    // このパートナーの全受注を取得（quotationsを経由）
    const allOrders = await prisma.orders.findMany({
      where: {
        quotations: {
          partner_id: partner.id
        }
      },
      include: {
        customer_invoices: true,
        quotations: {
          include: {
            diagnosis_requests: {
              include: {
                customers: true
              }
            }
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    // 施工完了済みの受注
    const completedOrders = allOrders.filter(o => o.order_status === 'COMPLETED');

    // 請求書未発行の受注（施工完了済み）
    const ordersWithoutInvoice = completedOrders.filter(o => !o.customer_invoices);

    // 請求書発行済みの受注
    const ordersWithInvoice = completedOrders.filter(o => o.customer_invoices);

    return NextResponse.json({
      success: true,
      data: {
        partner: {
          id: partner.id,
          name: partner.name,
          email: partner.email
        },
        stats: {
          totalOrders: allOrders.length,
          completedOrders: completedOrders.length,
          ordersWithoutInvoice: ordersWithoutInvoice.length,
          ordersWithInvoice: ordersWithInvoice.length
        },
        ordersWithoutInvoice: ordersWithoutInvoice.map(order => ({
          orderId: order.id,
          customerName: order.quotations.diagnosis_requests?.customers?.customer_name || 'N/A',
          constructionAmount: order.construction_amount,
          constructionStartDate: order.construction_start_date,
          constructionEndDate: order.construction_end_date,
          status: order.order_status
        })),
        ordersWithInvoice: ordersWithInvoice.map(order => ({
          orderId: order.id,
          customerName: order.quotations.diagnosis_requests?.customers?.customer_name || 'N/A',
          invoiceId: order.customer_invoices?.id,
          invoiceNumber: order.customer_invoices?.invoice_number,
          invoiceStatus: order.customer_invoices?.status,
          totalAmount: order.customer_invoices?.total_amount
        }))
      }
    });

  } catch (error) {
    console.error('エラーが発生しました:', error);
    return NextResponse.json({
      success: false,
      message: 'エラーが発生しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
