import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/infrastructure/database/prisma.client';
import { requireAdminAuth } from '@/lib/utils/adminAuth';

// GET: 請求書詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAdminAuth();
    if (error) return error;

    const { id } = await params;
    const invoiceId = parseInt(id);

    const invoice = await prisma.company_invoices.findUnique({
      where: { id: invoiceId },
      include: {
        invoice_items: true,
        partner: {
          include: {
            partner_details: true,
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: '請求書が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        partner_id: invoice.partner_id,
        billing_period_start: invoice.billing_period_start.toISOString().split('T')[0],
        billing_period_end: invoice.billing_period_end.toISOString().split('T')[0],
        issue_date: invoice.issue_date.toISOString().split('T')[0],
        due_date: invoice.due_date.toISOString().split('T')[0],
        total_amount: Number(invoice.total_amount),
        tax_amount: Number(invoice.tax_amount),
        grand_total: Number(invoice.grand_total),
        status: invoice.status,
        payment_date: invoice.payment_date?.toISOString().split('T')[0] || null,
        items: invoice.invoice_items,
        partner: {
          id: invoice.partner.id,
          company_name: invoice.partner.partner_details?.company_name || '',
          email: invoice.partner.email,
          phone: invoice.partner.partner_details?.phone || '',
          address: invoice.partner.partner_details?.address || '',
        },
      },
    });
  } catch (error) {
    console.error('Get invoice error:', error);
    return NextResponse.json(
      { success: false, error: '請求書の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT: 請求書更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAdminAuth();
    if (error) return error;

    const { id } = await params;
    const invoiceId = parseInt(id);
    const body = await request.json();
    const { issue_date, due_date, items } = body;

    const existingInvoice = await prisma.company_invoices.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      return NextResponse.json(
        { success: false, error: '請求書が見つかりません' },
        { status: 404 }
      );
    }

    if (existingInvoice.status !== 'DRAFT') {
      return NextResponse.json(
        { success: false, error: '下書き状態の請求書のみ編集できます' },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + item.amount, 0);
    const taxAmount = Math.floor(totalAmount * 0.1);
    const grandTotal = totalAmount + taxAmount;

    await prisma.$transaction(async (tx) => {
      await tx.company_invoice_items.deleteMany({
        where: { company_invoice_id: invoiceId },
      });

      await tx.company_invoices.update({
        where: { id: invoiceId },
        data: {
          issue_date: new Date(issue_date),
          due_date: new Date(due_date),
          total_amount: totalAmount,
          tax_amount: taxAmount,
          grand_total: grandTotal,
          invoice_items: {
            create: items.map((item: any) => ({
              description: item.description,
              amount: item.amount,
              related_order_id: item.related_order_id || null,
            })),
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: '請求書を更新しました',
    });
  } catch (error) {
    console.error('Update invoice error:', error);
    return NextResponse.json(
      { success: false, error: '請求書の更新に失敗しました' },
      { status: 500 }
    );
  }
}
