import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/infrastructure/database/prisma.client';
import { requirePartnerAuth } from '@/lib/utils/partnerAuth';

/**
 * パートナー向け会社請求書一覧API
 * GET /api/partner/company-invoices
 */
export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    const { error, partnerId } = await requirePartnerAuth();
    if (error) return error;

    // クエリパラメータ取得
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    // パートナーあての会社請求書を取得
    const invoices = await prisma.company_invoices.findMany({
      where: {
        partner_id: partnerId,
      },
      orderBy: {
        issue_date: 'desc',
      },
      take: limit,
      select: {
        id: true,
        invoice_number: true,
        issue_date: true,
        due_date: true,
        billing_period_start: true,
        billing_period_end: true,
        total_amount: true,
        tax_amount: true,
        grand_total: true,
        status: true,
        payment_date: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        invoices: invoices.map((invoice) => ({
          id: invoice.id,
          invoice_number: invoice.invoice_number,
          issue_date: invoice.issue_date.toISOString().split('T')[0],
          due_date: invoice.due_date.toISOString().split('T')[0],
          billing_period_start: invoice.billing_period_start.toISOString().split('T')[0],
          billing_period_end: invoice.billing_period_end.toISOString().split('T')[0],
          total_amount: invoice.total_amount,
          tax_amount: invoice.tax_amount,
          grand_total: invoice.grand_total,
          status: invoice.status,
          payment_date: invoice.payment_date
            ? invoice.payment_date.toISOString().split('T')[0]
            : null,
        })),
        total: invoices.length,
      },
    });
  } catch (error) {
    console.error('Company invoices API error:', error);
    return NextResponse.json(
      { success: false, error: '会社請求書の取得に失敗しました' },
      { status: 500 }
    );
  }
}
