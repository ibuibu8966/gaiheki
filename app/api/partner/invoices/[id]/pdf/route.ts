import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateCustomerInvoicePDF } from '@/lib/generateCustomerInvoicePDF';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const invoiceId = parseInt(params.id);

    // TODO: 実際の認証実装後、セッションからpartner_idを取得して権限チェック
    const partnerId = 1; // 仮のID

    // 請求書データを取得
    const invoice = await prisma.customer_invoices.findUnique({
      where: { id: invoiceId },
      include: {
        order: {
          include: {
            quotation: {
              include: {
                diagnosis_request: {
                  include: {
                    customer: {
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
    const customer = invoice.order.quotation.diagnosis_request.customer;
    if (customer.partner_id !== partnerId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Partner情報を取得
    const partnerDetails = customer.partners.partner_details;
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

    // PDFをレスポンスとして返す
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice_${invoiceId}.pdf"`,
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

