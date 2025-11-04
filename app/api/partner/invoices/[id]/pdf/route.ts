import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateCustomerInvoicePDF } from '@/lib/generateCustomerInvoicePDF';
import { requirePartnerAuth } from '@/lib/utils/partnerAuth';

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

    // 請求書データを取得
    const invoice = await prisma.customer_invoices.findUnique({
      where: { id: invoiceId },
      include: {
        order: {
          include: {
            quotations: {
              include: {
                diagnosis_requests: {
                  include: {
                    customers: {
                      include: {
                        partners: {
                          include: {
                            partner_details: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        invoice_items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Partner権限チェック
    // quotationsは1対1の関係なので直接アクセス
    const quotation = invoice.order.quotations;
    const diagnosisRequest = quotation.diagnosis_requests;
    const customer = diagnosisRequest.customers;

    // 見積もりのpartner_idでチェック（顧客のpartner_idではなく）
    if (quotation.partner_id !== partnerId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Partner情報を取得（見積もりのパートナー情報を使用）
    const partner = await prisma.partners.findUnique({
      where: { id: quotation.partner_id },
      include: { partner_details: true }
    });

    const partnerDetails = partner?.partner_details;
    if (!partnerDetails) {
      return NextResponse.json(
        { error: 'Partner details not found' },
        { status: 404 }
      );
    }

    // PDF生成用のデータを準備
    const pdfData = {
      invoice_number: invoice.invoice_number,
      customer_name: customer.customer_name,
      customer_address: customer.construction_address,
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      total_amount: invoice.total_amount,
      tax_amount: invoice.tax_amount,
      grand_total: invoice.grand_total,
      items: invoice.invoice_items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        amount: item.amount,
      })),
      // Partner情報（発行元）
      partner_company_name: partnerDetails.company_name,
      partner_address: partnerDetails.address,
      partner_phone: partnerDetails.phone_number,
      partner_invoice_registration_number: partnerDetails.invoice_registration_number || undefined,
      partner_bank_name: partnerDetails.bank_name || undefined,
      partner_bank_branch: partnerDetails.bank_branch_name || undefined,
      partner_bank_account_type: partnerDetails.bank_account_type || undefined,
      partner_bank_account_number: partnerDetails.bank_account_number || undefined,
      partner_bank_account_holder: partnerDetails.bank_account_holder || undefined,
    };

    // PDFを生成
    const pdfBuffer = generateCustomerInvoicePDF(pdfData);

    // ファイル名を生成（顧客名_請求書番号.pdf）
    const filename = `${customer.customer_name}_${invoice.invoice_number}.pdf`;

    // PDFをレスポンスとして返す
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  } catch (error) {
    console.error('Error generating customer invoice PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
