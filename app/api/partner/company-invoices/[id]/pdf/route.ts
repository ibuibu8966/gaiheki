import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateInvoicePDF } from '@/lib/generateInvoicePDF';
import { requirePartnerAuth } from '@/lib/utils/partnerAuth';

/**
 * パートナー向け会社請求書PDF生成API
 * GET /api/partner/company-invoices/[id]/pdf
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoiceId = parseInt(id);

    // 認証チェック
    const { error, partnerId } = await requirePartnerAuth();
    if (error) return error;

    // 請求書データを取得（権限チェック込み）
    const invoice = await prisma.company_invoices.findFirst({
      where: {
        id: invoiceId,
        partner_id: partnerId, // 自分の会社の請求書のみ閲覧可能
      },
      include: {
        partner: {
          include: {
            partner_details: {
              select: {
                company_name: true,
                address: true,
                phone_number: true,
              },
            },
          },
        },
        invoice_items: {
          orderBy: {
            id: 'asc',
          },
          select: {
            description: true,
            amount: true,
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

    // 会社設定情報を取得
    const companySettings = await prisma.company_settings.findFirst();

    // PDFに渡すデータを整形
    const pdfData = {
      invoice_number: invoice.invoice_number,
      company_name: invoice.partner.partner_details?.company_name || '会社名未設定',
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      billing_period_start: invoice.billing_period_start,
      billing_period_end: invoice.billing_period_end,
      total_amount: Number(invoice.total_amount),
      tax_amount: Number(invoice.tax_amount),
      grand_total: Number(invoice.grand_total),
      items: invoice.invoice_items.map((item) => ({
        description: item.description,
        amount: Number(item.amount),
      })),
      sender_company_name: companySettings?.company_name || '株式会社外壁ソリューションズ',
      sender_address: companySettings?.address || '',
      sender_phone: companySettings?.phone || '',
      sender_bank_name: companySettings?.bank_name || undefined,
      sender_bank_branch: companySettings?.bank_branch_name || undefined,
      sender_bank_account_type: companySettings?.bank_account_type || undefined,
      sender_bank_account_number: companySettings?.bank_account_number || undefined,
      sender_bank_account_holder: companySettings?.bank_account_holder || undefined,
    };

    // jsPDFでPDFを生成
    const pdfBuffer = generateInvoicePDF(pdfData);

    // ファイル名を生成（加盟店名_請求期間_請求書番号.pdf）
    const companyName = invoice.partner.partner_details?.company_name || '加盟店';
    const startDate = invoice.billing_period_start.toISOString().split('T')[0];
    const endDate = invoice.billing_period_end.toISOString().split('T')[0];
    const filename = `${companyName}_${startDate}_${endDate}_${invoice.invoice_number}.pdf`;

    // PDFをレスポンスとして返す
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  } catch (error) {
    console.error('Company invoice PDF generation error:', error);
    return NextResponse.json(
      { success: false, error: 'PDF生成に失敗しました' },
      { status: 500 }
    );
  }
}
