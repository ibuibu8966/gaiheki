import { PrismaClient, AdminRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // デフォルト管理者のパスワードをハッシュ化
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  // デフォルト管理者アカウントを作成（既存の場合はスキップ）
  const defaultAdmin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {}, // 既存の場合は更新しない
    create: {
      username: 'admin',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@gaiheki.com',
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log('✅ デフォルト管理者アカウントが作成されました:', {
    id: defaultAdmin.id,
    username: defaultAdmin.username,
    email: defaultAdmin.email,
    role: defaultAdmin.role,
  });

  // 追加の管理者アカウント（開発用）
  const devAdminPassword = await bcrypt.hash('dev123', 12);
  const devAdmin = await prisma.admin.upsert({
    where: { username: 'dev_admin' },
    update: {},
    create: {
      username: 'dev_admin',
      email: 'dev@gaiheki.com',
      passwordHash: devAdminPassword,
      role: AdminRole.ADMIN,
      isActive: true,
    },
  });

  console.log('✅ 開発用管理者アカウントが作成されました:', {
    id: devAdmin.id,
    username: devAdmin.username,
    email: devAdmin.email,
    role: devAdmin.role,
  });

  // オペレーター用アカウント（開発用）
  const operatorPassword = await bcrypt.hash('operator123', 12);
  const operator = await prisma.admin.upsert({
    where: { username: 'operator' },
    update: {},
    create: {
      username: 'operator',
      email: 'operator@gaiheki.com',
      passwordHash: operatorPassword,
      role: AdminRole.OPERATOR,
      isActive: true,
    },
  });

  console.log('✅ オペレーターアカウントが作成されました:', {
    id: operator.id,
    username: operator.username,
    email: operator.email,
    role: operator.role,
  });

  // 期限切れセッションのクリーンアップ
  const deletedSessions = await prisma.adminSession.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  console.log(`🧹 期限切れセッション ${deletedSessions.count} 件を削除しました`);

  // デフォルトの料金プラン
  const defaultFeePlan = await prisma.fee_plans.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'スタンダードプラン',
      monthly_fee: 30000,      // 月額30,000円
      per_order_fee: 5000,     // 受注1件につき5,000円
      per_project_fee: null,
      project_fee_rate: 0.05,  // 施工完了金額の5%
      is_default: true,
    },
  });

  console.log('✅ デフォルトの料金プランが作成されました:', {
    id: defaultFeePlan.id,
    name: defaultFeePlan.name,
    monthly_fee: defaultFeePlan.monthly_fee,
    per_order_fee: defaultFeePlan.per_order_fee,
    project_fee_rate: defaultFeePlan.project_fee_rate,
  });

  // システム設定
  const systemSettings = [
    {
      setting_key: 'billing_cycle_closing_day',
      setting_value: '31',
      description: '請求締め日（月末）',
    },
    {
      setting_key: 'billing_cycle_payment_day',
      setting_value: '20',
      description: '支払期日（翌月20日）',
    },
    {
      setting_key: 'tax_rate',
      setting_value: '0.10',
      description: '消費税率（10%）',
    },
  ];

  for (const setting of systemSettings) {
    await prisma.system_settings.upsert({
      where: { setting_key: setting.setting_key },
      update: {},
      create: setting,
    });
  }

  console.log('✅ システム設定が作成されました（3件）');

  // 大量のダミーデータを作成
  console.log('\n🚀 大量のダミーデータを作成中...');

  // パートナー企業 50社
  const partnerPassword = await bcrypt.hash('partner123', 12);
  const partners = [];
  const prefectures = ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Saitama', 'Chiba', 'Hyogo', 'Fukuoka'];
  const companyTypes = ['株式会社', '有限会社', '合同会社'];

  for (let i = 1; i <= 50; i++) {
    const partner = await prisma.partners.create({
      data: {
        username: `partner${i}`,
        login_email: `partner${i}@example.com`,
        password_hash: partnerPassword,
        is_active: true,
        fee_plan_id: 1,
        updated_at: new Date(),
        partner_details: {
          create: {
            company_name: `${companyTypes[i % 3]}${['山田', '佐藤', '鈴木', '田中', '高橋', '伊藤', '渡辺', '中村', '小林', '加藤'][i % 10]}塗装工業`,
            phone_number: `03-${String(1000 + i).padStart(4, '0')}-${String(i).padStart(4, '0')}`,
            address: `${prefectures[i % prefectures.length]} 市区町村 ${i}-${i}-${i}`,
            representative_name: `${['山田', '佐藤', '鈴木', '田中', '高橋'][i % 5]} ${['太郎', '次郎', '三郎', '四郎', '五郎'][i % 5]}`,
            business_description: `外壁塗装・屋根塗装を中心に、${10 + i}年の実績があります。お客様満足度を第一に、丁寧な施工を心がけています。`,
            appeal_text: `地域密着型で${100 + i * 10}件以上の施工実績。自社施工でコストパフォーマンスに優れています。`,
            business_hours: '9:00-18:00',
            closed_days: '日曜日、祝日',
            partners_status: i % 10 === 0 ? 'INACTIVE' : 'ACTIVE',
            updated_at: new Date(),
          }
        },
        partner_prefectures: {
          create: [
            { supported_prefecture: prefectures[i % prefectures.length] as any, updated_at: new Date() },
            { supported_prefecture: prefectures[(i + 1) % prefectures.length] as any, updated_at: new Date() },
          ]
        }
      }
    });
    partners.push(partner);
  }
  console.log(`✅ パートナー企業 ${partners.length} 社を作成しました`);

  // 顧客 200件
  const customers = [];
  const customerNames = ['山田太郎', '佐藤花子', '鈴木一郎', '田中美咲', '高橋健太', '伊藤愛子', '渡辺大輔', '中村由美', '小林隆', '加藤さくら'];
  const prefectureMap: { [key: string]: string } = {
    Tokyo: '東京都',
    Osaka: '大阪府',
    Kanagawa: '神奈川県',
    Aichi: '愛知県',
    Saitama: '埼玉県',
    Chiba: '千葉県',
    Hyogo: '兵庫県',
    Fukuoka: '福岡県',
  };
  const cities = ['横浜市', '川崎市', '大阪市', '名古屋市', 'さいたま市', '千葉市', '神戸市', '福岡市'];
  const wards = ['中区', '西区', '北区', '南区', '東区'];

  for (let i = 1; i <= 200; i++) {
    const prefectureEn = prefectures[i % prefectures.length];
    const prefectureJp = prefectureMap[prefectureEn] || prefectureEn;
    const city = cities[i % cities.length];
    const ward = wards[i % wards.length];

    const customer = await prisma.customers.create({
      data: {
        partner_id: partners[i % partners.length].id,
        customer_name: customerNames[i % customerNames.length],
        customer_phone: `090-${String(1000 + i).padStart(4, '0')}-${String(i).padStart(4, '0')}`,
        customer_email: `customer${i}@example.com`,
        construction_address: `${prefectureJp}${city}${ward}${i % 5 + 1}-${i % 20 + 1}-${i % 30 + 1}`,
        customer_construction_type: ['EXTERIOR_PAINTING', 'ROOF_PAINTING', 'EXTERIOR_AND_ROOF', 'FULL_REPLACEMENT'][i % 4] as any,
        construction_amount: Math.floor(800000 + Math.random() * 2200000),
        construction_completed_at: i % 3 === 0 ? new Date(2024, i % 12, (i % 28) + 1) : null,
        customer_status: ['ORDERED', 'IN_PROGRESS', 'COMPLETED', 'REVIEW_COMPLETED'][i % 4] as any,
        customer_rating: i % 2 === 0 ? (3 + (i % 3)) : null,
        customer_review_title: i % 2 === 0 ? `${['とても満足', '丁寧な施工', '安心できました', 'コスパ良好'][i % 4]}` : null,
        customer_review: i % 2 === 0 ? `担当者の対応が丁寧で、施工も期待以上の仕上がりでした。アフターフォローもしっかりしており安心です。` : null,
        customer_review_date: i % 2 === 0 ? new Date(2024, i % 12, (i % 28) + 1) : null,
        updated_at: new Date(),
      }
    });
    customers.push(customer);
  }
  console.log(`✅ 顧客 ${customers.length} 件を作成しました`);

  // 診断依頼 150件
  const diagnosisRequests = [];
  for (let i = 1; i <= 150; i++) {
    const diagnosisRequest = await prisma.diagnosis_requests.create({
      data: {
        diagnosis_number: `DG${new Date().getFullYear()}${String(i).padStart(6, '0')}`,
        customer_id: customers[i % customers.length].id,
        designated_partner_id: i % 3 === 0 ? partners[i % partners.length].id : null,
        prefecture: prefectures[i % prefectures.length] as any,
        floor_area: ['FROM_80_TO_100', 'FROM_101_TO_120', 'FROM_121_TO_140', 'FROM_141_TO_160', 'FROM_161_TO_180'][i % 5] as any,
        current_situation: ['MARKET_RESEARCH', 'CONSIDERING_CONSTRUCTION', 'COMPARING_CONTRACTORS', 'READY_TO_ORDER'][i % 4] as any,
        construction_type: ['EXTERIOR_PAINTING', 'ROOF_PAINTING', 'EXTERIOR_AND_ROOF', 'WATERPROOFING'][i % 4] as any,
        status: ['RECRUITING', 'COMPARING', 'DECIDED', 'CANCELLED'][i % 4] as any,
        updated_at: new Date(),
      }
    });
    diagnosisRequests.push(diagnosisRequest);
  }
  console.log(`✅ 診断依頼 ${diagnosisRequests.length} 件を作成しました`);

  // 見積もり 300件
  const quotations = [];
  for (let i = 1; i <= 300; i++) {
    const quotation = await prisma.quotations.create({
      data: {
        diagnosis_request_id: diagnosisRequests[i % diagnosisRequests.length].id,
        partner_id: partners[i % partners.length].id,
        quotation_amount: Math.floor(600000 + Math.random() * 2400000),
        appeal_text: `当社にお任せください！${['高品質な塗料を使用', '自社施工でコスト削減', '豊富な実績', 'アフターサポート充実'][i % 4]}しています。`,
        is_selected: i % 3 === 0,
        updated_at: new Date(),
      }
    });
    quotations.push(quotation);
  }
  console.log(`✅ 見積もり ${quotations.length} 件を作成しました`);

  // 受注 100件（選択された見積もりから）
  const orders = [];
  const selectedQuotations = quotations.filter(q => q.is_selected).slice(0, 100);

  for (let i = 0; i < selectedQuotations.length; i++) {
    const order = await prisma.orders.create({
      data: {
        quotation_id: selectedQuotations[i].id,
        partner_memo: i % 2 === 0 ? '順調に進行中' : null,
        admin_memo: i % 3 === 0 ? '優良案件' : null,
        construction_amount: selectedQuotations[i].quotation_amount,
        construction_start_date: new Date(2024, (i % 12), 1),
        construction_end_date: i % 2 === 0 ? new Date(2024, (i % 12), 20) : null,
        order_status: ['ORDERED', 'IN_PROGRESS', 'COMPLETED'][i % 3] as any,
        completion_date: i % 2 === 0 ? new Date(2024, (i % 12), 25) : null,
        updated_at: new Date(),
      }
    });
    orders.push(order);
  }
  console.log(`✅ 受注 ${orders.length} 件を作成しました`);

  // 顧客請求書 80件（受注から作成）
  const customerInvoices = [];
  for (let i = 0; i < Math.min(80, orders.length); i++) {
    const order = orders[i];
    const issueDate = new Date(2024, (i % 12), 5);
    const dueDate = new Date(2024, (i % 12), 25);

    // 明細金額を計算（切り捨てによる誤差を避けるため、個別に計算）
    const item1Amount = Math.floor(order.construction_amount * 0.6);
    const item2Amount = Math.floor(order.construction_amount * 0.2);
    const item3Amount = Math.floor(order.construction_amount * 0.2);

    // 明細の合計を計算（実際の明細金額の合計）
    const actualTotalAmount = item1Amount + item2Amount + item3Amount;
    const actualTaxAmount = Math.floor(actualTotalAmount * 0.1);
    const actualGrandTotal = actualTotalAmount + actualTaxAmount;

    const customerInvoice = await prisma.customer_invoices.create({
      data: {
        invoice_number: `CINV-${2024}${String((i % 12) + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`,
        order_id: order.id,
        issue_date: issueDate,
        due_date: dueDate,
        total_amount: actualTotalAmount,      // 明細の合計額（税抜）
        tax_amount: actualTaxAmount,          // 消費税（10%）
        grand_total: actualGrandTotal,        // 合計（税込）
        status: ['DRAFT', 'UNPAID', 'PAID', 'OVERDUE'][i % 4] as any,
        payment_date: i % 4 === 2 ? new Date(2024, (i % 12), 20) : null,
        updated_at: new Date(),
        invoice_items: {
          create: [
            {
              description: '外壁塗装工事費',
              quantity: 1,
              unit: '式',
              unit_price: item1Amount,
              amount: item1Amount,
            },
            {
              description: '下地処理費',
              quantity: 1,
              unit: '式',
              unit_price: item2Amount,
              amount: item2Amount,
            },
            {
              description: '足場組立・解体費',
              quantity: 1,
              unit: '式',
              unit_price: item3Amount,
              amount: item3Amount,
            },
          ]
        }
      }
    });
    customerInvoices.push(customerInvoice);
  }
  console.log(`✅ 顧客請求書 ${customerInvoices.length} 件を作成しました`);

  // 記事 30件
  const articles = [];
  const articleTitles = [
    '外壁塗装の最適な時期とは？季節ごとのメリット・デメリット',
    '外壁塗装の費用相場を徹底解説！坪数別の目安価格',
    '優良な塗装業者の選び方｜5つのチェックポイント',
    '外壁塗装で使われる塗料の種類と特徴を比較',
    '外壁塗装の工程を詳しく解説｜施工期間はどれくらい？',
    '屋根塗装と外壁塗装を同時に行うメリット',
    'シリコン塗料とフッ素塗料の違いとは',
    '外壁塗装の色選びで失敗しないコツ',
    '外壁のひび割れを放置すると危険？補修方法を解説',
    '遮熱塗料・断熱塗料で光熱費を削減する方法',
  ];

  for (let i = 0; i < 30; i++) {
    const article = await prisma.articles.create({
      data: {
        admin_id: [defaultAdmin.id, devAdmin.id][i % 2],
        title: articleTitles[i % articleTitles.length],
        category: ['BASIC_KNOWLEDGE', 'PAINT_TYPES', 'CASE_STUDIES', 'COST_ESTIMATE', 'CONTRACTOR_SELECTION'][i % 5] as any,
        content: `## はじめに\n\n外壁塗装に関する重要な情報をお届けします。\n\n## ポイント1\n\n詳しい内容がここに入ります。\n\n## ポイント2\n\nさらに詳しい説明が続きます。\n\n## まとめ\n\n外壁塗装は${10 + i}年に一度のメンテナンスが推奨されています。`,
        is_published: i % 4 !== 0,
        sort_order: i,
        post_name: `article-${i + 1}`,
        updated_at: new Date(),
      }
    });
    articles.push(article);
  }
  console.log(`✅ 記事 ${articles.length} 件を作成しました`);

  // お問い合わせ 80件
  const inquiries = [];
  const subjects = ['見積もりについて', '施工期間について', '塗料の種類について', 'アフターサービスについて', '追加工事について'];

  for (let i = 0; i < 80; i++) {
    const inquiry = await prisma.inquiries.create({
      data: {
        customer_id: customers[i % customers.length].id,
        subject: subjects[i % subjects.length],
        inquiry_content: `${subjects[i % subjects.length]}の詳細を教えてください。具体的には、${['費用', '期間', '品質', '保証'][i % 4]}について知りたいです。`,
        inquiry_status: ['PENDING', 'IN_PROGRESS', 'COMPLETED'][i % 3] as any,
        admin_memo: i % 2 === 0 ? '対応済み' : null,
        updated_at: new Date(),
      }
    });
    inquiries.push(inquiry);
  }
  console.log(`✅ お問い合わせ ${inquiries.length} 件を作成しました`);

  // パートナー企業への請求書 60件
  const companyInvoices = [];
  for (let i = 0; i < 60; i++) {
    const year = 2024;
    const month = (i % 12) + 1;
    const billingPeriodStart = new Date(year, month - 1, 1);
    const billingPeriodEnd = new Date(year, month, 0); // 月末
    const issueDate = new Date(year, month, 1); // 翌月1日
    const dueDate = new Date(year, month, 20); // 翌月20日

    const companyInvoice = await prisma.company_invoices.create({
      data: {
        invoice_number: `INV-${year}${String(month).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`,
        partner_id: partners[i % partners.length].id,
        issue_date: issueDate,
        due_date: dueDate,
        billing_period_start: billingPeriodStart,
        billing_period_end: billingPeriodEnd,
        total_amount: 50000 + Math.floor(Math.random() * 200000),
        tax_amount: Math.floor((50000 + Math.random() * 200000) * 0.1),
        grand_total: Math.floor((50000 + Math.random() * 200000) * 1.1),
        status: ['UNPAID', 'PAID', 'OVERDUE'][i % 3] as any,
        payment_date: i % 3 === 1 ? new Date(year, month, 15) : null,
        updated_at: new Date(),
        invoice_items: {
          create: [
            {
              description: '月額利用料',
              amount: 30000,
            },
            {
              description: `受注手数料（${Math.floor(1 + Math.random() * 5)}件）`,
              amount: Math.floor(5000 * (1 + Math.random() * 5)),
            },
            {
              description: `成約手数料（施工完了金額の5%）`,
              amount: Math.floor(10000 + Math.random() * 100000),
            }
          ]
        }
      }
    });
    companyInvoices.push(companyInvoice);
  }
  console.log(`✅ パートナー企業請求書 ${companyInvoices.length} 件を作成しました`);

  // パートナー企業申請 40件
  const partnerApplications = [];
  const applicationPrefectures = ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Fukuoka'];

  for (let i = 0; i < 40; i++) {
    const application = await prisma.partner_applications.create({
      data: {
        company_name: `${companyTypes[i % 3]}${['山本', '吉田', '松本', '井上', '木村', '林', '清水', '山口', '池田', '斎藤'][i % 10]}建設`,
        representative_name: `${['山本', '吉田', '松本', '井上', '木村'][i % 5]} ${['太郎', '次郎', '三郎', '四郎', '五郎'][i % 5]}`,
        address: `${applicationPrefectures[i % applicationPrefectures.length]} 市区町村 申請-${i}-${i}`,
        phone_number: `03-${String(2000 + i).padStart(4, '0')}-${String(i).padStart(4, '0')}`,
        email: `application${i}@example.com`,
        website_url: i % 2 === 0 ? `https://www.application${i}.example.com` : null,
        business_description: `外壁塗装業を${5 + i}年営んでおります。地域密着型で品質重視の施工を行っています。`,
        self_pr: `当社は${['高い技術力', '豊富な実績', '誠実な対応', '迅速な施工'][i % 4]}を強みとしています。お客様満足度向上のため、日々研鑽を積んでおります。`,
        application_status: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'][i % 3] as any,
        admin_memo: i % 2 === 0 ? '実績豊富、承認推奨' : null,
        review_notes: i % 3 === 1 ? '承認済み、優良企業' : (i % 3 === 2 ? '実績不足のため要検討' : null),
        reviewed_by: i % 3 !== 0 ? defaultAdmin.id : null,
        reviewed_at: i % 3 !== 0 ? new Date(2024, (i % 12), (i % 28) + 1) : null,
        updated_at: new Date(),
        partner_application_prefectures: {
          create: [
            { supported_prefecture: applicationPrefectures[i % applicationPrefectures.length] as any },
            { supported_prefecture: applicationPrefectures[(i + 1) % applicationPrefectures.length] as any },
          ]
        }
      }
    });
    partnerApplications.push(application);

    // 申請ステータス履歴を作成
    if (i % 3 !== 0) {
      await prisma.application_status_histories.create({
        data: {
          application_id: application.id,
          previous_status: 'UNDER_REVIEW',
          new_status: ['APPROVED', 'REJECTED'][i % 2] as any,
          changed_by: defaultAdmin.id,
          change_reason: i % 3 === 1 ? '基準を満たしているため承認' : '実績不足のため保留',
        }
      });
    }
  }
  console.log(`✅ パートナー企業申請 ${partnerApplications.length} 件を作成しました`);

  // 追加の料金プラン
  const additionalPlans = [
    {
      name: 'ベーシックプラン',
      monthly_fee: 20000,
      per_order_fee: 7000,
      per_project_fee: null,
      project_fee_rate: 0.07,
      is_default: false,
    },
    {
      name: 'プレミアムプラン',
      monthly_fee: 50000,
      per_order_fee: 3000,
      per_project_fee: null,
      project_fee_rate: 0.03,
      is_default: false,
    },
    {
      name: 'エンタープライズプラン',
      monthly_fee: 100000,
      per_order_fee: 0,
      per_project_fee: null,
      project_fee_rate: 0.02,
      is_default: false,
    }
  ];

  for (const plan of additionalPlans) {
    await prisma.fee_plans.create({
      data: {
        ...plan,
        updated_at: new Date(),
      }
    });
  }
  console.log(`✅ 追加料金プラン ${additionalPlans.length} 件を作成しました`);

  // 会社設定
  await prisma.company_settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      company_name: '株式会社外壁ソリューションズ',
      postal_code: '100-0001',
      address: '東京都千代田区千代田1-1-1 外壁ビル10F',
      phone: '03-1234-5678',
      email: 'info@gaiheki.com',
      invoice_registration_number: 'T1234567890123',
      bank_name: '三菱UFJ銀行',
      bank_branch_name: '東京営業部',
      bank_account_type: '普通',
      bank_account_number: '1234567',
      bank_account_holder: 'カ）ガイヘキソリューションズ',
      updated_at: new Date(),
    }
  });
  console.log('✅ 会社設定を作成しました');

  console.log('\n🎉 大量ダミーデータの作成完了!');
  console.log('📊 作成されたデータ:');
  console.log(`   - パートナー企業: ${partners.length} 社`);
  console.log(`   - 顧客: ${customers.length} 件`);
  console.log(`   - 診断依頼: ${diagnosisRequests.length} 件`);
  console.log(`   - 見積もり: ${quotations.length} 件`);
  console.log(`   - 受注: ${orders.length} 件`);
  console.log(`   - 顧客請求書: ${customerInvoices.length} 件`);
  console.log(`   - 記事: ${articles.length} 件`);
  console.log(`   - お問い合わせ: ${inquiries.length} 件`);
  console.log(`   - パートナー企業請求書: ${companyInvoices.length} 件`);
  console.log(`   - パートナー企業申請: ${partnerApplications.length} 件`);
  console.log(`   - 料金プラン: ${additionalPlans.length + 1} 種類`);

  console.log('\n📋 作成されたアカウント:');
  console.log('┌────────────┬─────────────────────┬─────────────┬─────────────┐');
  console.log('│ ユーザー名 │ メールアドレス      │ パスワード  │ ロール      │');
  console.log('├────────────┼─────────────────────┼─────────────┼─────────────┤');
  console.log('│ admin      │ admin@gaiheki.com   │ admin123    │ SUPER_ADMIN │');
  console.log('│ dev_admin  │ dev@gaiheki.com     │ dev123      │ ADMIN       │');
  console.log('│ operator   │ operator@gaiheki.com│ operator123 │ OPERATOR    │');
  console.log('│ partner1   │ partner1@example.com│ partner123  │ パートナー  │');
  console.log('└────────────┴─────────────────────┴─────────────┴─────────────┘');
}

main()
  .catch((e) => {
    console.error('❌ Seedエラー:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });