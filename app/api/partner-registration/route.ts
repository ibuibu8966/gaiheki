import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: 加盟店登録申請
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      companyName,
      representativeName,
      address,
      phone,
      email,
      website,
      businessContent,
      appealPoints
    } = body;

    // バリデーション
    if (!companyName || !representativeName || !address || !phone || !email) {
      return NextResponse.json(
        { success: false, error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      );
    }

    // 電話番号の形式チェック（ハイフンあり・なし両方対応）
    const phoneRegex = /^[0-9\-]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: '電話番号の形式が正しくありません' },
        { status: 400 }
      );
    }

    // データベースに保存
    const application = await prisma.partner_applications.create({
      data: {
        company_name: companyName,
        representative_name: representativeName,
        address: address,
        phone_number: phone,
        email: email,
        website_url: website || null,
        business_description: businessContent || '',
        self_pr: appealPoints || '',
        application_status: 'UNDER_REVIEW', // 審査中
        updated_at: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: '加盟店登録申請を受け付けました。担当者より3営業日以内にご連絡いたします。',
      data: {
        id: application.id,
        applicationNumber: `APP-${application.id.toString().padStart(6, '0')}`
      }
    });

  } catch (error) {
    console.error('Partner registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '登録処理中にエラーが発生しました',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
