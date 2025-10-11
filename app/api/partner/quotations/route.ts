import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../src/infrastructure/database/prisma.client';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '../../../../src/lib/session';
import { cookies } from 'next/headers';

// POST: 見積もりを提出
export async function POST(request: NextRequest) {
  try {
    // セッションからpartnerIdを取得
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn || !session.partnerId) {
      return NextResponse.json({
        success: false,
        error: 'ログインが必要です'
      }, { status: 401 });
    }

    const partnerId = session.partnerId;
    const body = await request.json();
    const { diagnosisRequestId, quotationAmount, appealText } = body;

    if (!diagnosisRequestId || !quotationAmount) {
      return NextResponse.json({
        success: false,
        error: '診断依頼IDと見積もり金額は必須です'
      }, { status: 400 });
    }

    // 診断依頼の存在確認
    const diagnosisRequest = await prisma.diagnosis_requests.findUnique({
      where: { id: diagnosisRequestId }
    });

    if (!diagnosisRequest) {
      return NextResponse.json({
        success: false,
        error: '診断依頼が見つかりません'
      }, { status: 404 });
    }

    // 既に見積もりを提出しているか確認
    const existingQuotation = await prisma.quotations.findFirst({
      where: {
        diagnosis_request_id: diagnosisRequestId,
        partner_id: partnerId
      }
    });

    if (existingQuotation) {
      return NextResponse.json({
        success: false,
        error: '既に見積もりを提出しています'
      }, { status: 400 });
    }

    // 見積もりを作成
    const quotation = await prisma.quotations.create({
      data: {
        diagnosis_request_id: diagnosisRequestId,
        partner_id: partnerId,
        quotation_amount: parseInt(quotationAmount),
        appeal_text: appealText || null,
        updated_at: new Date()
      }
    });

    // 診断依頼のステータスを更新（RECRUITING → COMPARING）
    if (diagnosisRequest.status === 'RECRUITING') {
      await prisma.diagnosis_requests.update({
        where: { id: diagnosisRequestId },
        data: {
          status: 'COMPARING',
          updated_at: new Date()
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: '見積もりを提出しました',
      data: quotation
    });

  } catch (error) {
    console.error('Quotation submission error:', error);
    return NextResponse.json({
      success: false,
      error: '見積もりの提出に失敗しました'
    }, { status: 500 });
  }
}

// PATCH: 見積もりを更新
export async function PATCH(request: NextRequest) {
  try {
    // セッションからpartnerIdを取得
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn || !session.partnerId) {
      return NextResponse.json({
        success: false,
        error: 'ログインが必要です'
      }, { status: 401 });
    }

    const partnerId = session.partnerId;
    const body = await request.json();
    const { quotationId, quotationAmount, appealText } = body;

    if (!quotationId || !quotationAmount) {
      return NextResponse.json({
        success: false,
        error: '見積もりIDと金額は必須です'
      }, { status: 400 });
    }

    // 見積もりの存在確認と権限チェック
    const existingQuotation = await prisma.quotations.findFirst({
      where: {
        id: quotationId,
        partner_id: partnerId
      },
      include: {
        diagnosis_requests: true
      }
    });

    if (!existingQuotation) {
      return NextResponse.json({
        success: false,
        error: '見積もりが見つかりません'
      }, { status: 404 });
    }

    // 業者決定済みの場合は更新不可
    if (existingQuotation.diagnosis_requests.status === 'DECIDED') {
      return NextResponse.json({
        success: false,
        error: '業者決定済みのため、見積もりを更新できません'
      }, { status: 400 });
    }

    // 見積もりを更新
    const updatedQuotation = await prisma.quotations.update({
      where: { id: quotationId },
      data: {
        quotation_amount: parseInt(quotationAmount),
        appeal_text: appealText || null,
        updated_at: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: '見積もりを更新しました',
      data: updatedQuotation
    });

  } catch (error) {
    console.error('Quotation update error:', error);
    return NextResponse.json({
      success: false,
      error: '見積もりの更新に失敗しました'
    }, { status: 500 });
  }
}
