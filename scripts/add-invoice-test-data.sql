-- 有限会社山田塗装工業（partner_id = 10）のテストデータを追加
-- 施工完了済み受注と顧客請求書を大量に作成

-- まず、partner 10の情報を確認
DO $$
DECLARE
  v_partner_id INTEGER := 10;
  v_customer_id INTEGER;
  v_diagnosis_id INTEGER;
  v_quotation_id INTEGER;
  v_order_id INTEGER;
  v_invoice_number TEXT;
  v_base_date DATE := '2024-01-01';
BEGIN
  -- 20件のテストデータを作成
  FOR i IN 1..20 LOOP
    -- 顧客を作成
    INSERT INTO customers (
      customer_name,
      customer_phone,
      customer_email,
      construction_address,
      customer_construction_type,
      construction_amount,
      customer_status,
      partner_id,
      created_at,
      updated_at
    ) VALUES (
      CASE (i % 10)
        WHEN 0 THEN '山田太郎'
        WHEN 1 THEN '佐藤花子'
        WHEN 2 THEN '鈴木一郎'
        WHEN 3 THEN '田中美咲'
        WHEN 4 THEN '高橋健太'
        WHEN 5 THEN '伊藤愛子'
        WHEN 6 THEN '渡辺大輔'
        WHEN 7 THEN '中村由美'
        WHEN 8 THEN '小林隆'
        ELSE '加藤さくら'
      END || ' (' || i || ')',
      '090-' || LPAD((1000 + i)::TEXT, 4, '0') || '-' || LPAD(i::TEXT, 4, '0'),
      'customer' || i || '@example.com',
      '大阪府大阪市中区テスト' || i || '-' || i || '-' || i,
      CASE (i % 3)
        WHEN 0 THEN 'EXTERIOR_WALL_PAINTING'
        WHEN 1 THEN 'ROOF_PAINTING'
        ELSE 'FULL_REPLACEMENT'
      END,
      1000000 + (i * 50000),
      'CONSTRUCTION_COMPLETED',
      v_partner_id,
      v_base_date + (i || ' days')::INTERVAL,
      v_base_date + (i || ' days')::INTERVAL
    )
    RETURNING id INTO v_customer_id;

    -- 診断依頼を作成
    INSERT INTO diagnosis_requests (
      customer_id,
      diagnosis_number,
      building_type,
      building_age,
      building_area,
      current_exterior_material,
      current_exterior_condition,
      desired_construction_timing,
      request_details,
      inspection_photos,
      status,
      created_at,
      updated_at
    ) VALUES (
      v_customer_id,
      'DIAG-' || TO_CHAR(v_base_date + (i || ' days')::INTERVAL, 'YYYYMM') || '-' || LPAD(i::TEXT, 4, '0'),
      CASE (i % 3)
        WHEN 0 THEN 'DETACHED_HOUSE'
        WHEN 1 THEN 'APARTMENT'
        ELSE 'COMMERCIAL'
      END,
      CASE (i % 4)
        WHEN 0 THEN 'UNDER_10_YEARS'
        WHEN 1 THEN 'FROM_11_TO_20'
        WHEN 2 THEN 'FROM_21_TO_30'
        ELSE 'OVER_31'
      END,
      CASE (i % 4)
        WHEN 0 THEN 'UNDER_100'
        WHEN 1 THEN 'FROM_101_TO_200'
        WHEN 2 THEN 'FROM_201_TO_300'
        ELSE 'FROM_301_TO_500'
      END,
      CASE (i % 3)
        WHEN 0 THEN 'MORTAR'
        WHEN 1 THEN 'SIDING'
        ELSE 'TILE'
      END,
      CASE (i % 5)
        WHEN 0 THEN 'GOOD'
        WHEN 1 THEN 'SLIGHTLY_DEGRADED'
        WHEN 2 THEN 'MODERATELY_DEGRADED'
        WHEN 3 THEN 'SIGNIFICANTLY_DEGRADED'
        ELSE 'REQUIRES_REPAIR'
      END,
      CASE (i % 4)
        WHEN 0 THEN 'WITHIN_3_MONTHS'
        WHEN 1 THEN 'WITHIN_6_MONTHS'
        WHEN 2 THEN 'WITHIN_1_YEAR'
        ELSE 'UNDECIDED'
      END,
      '外壁の劣化が気になるため、診断をお願いします。テストデータ ' || i,
      '[]',
      'COMPLETED',
      v_base_date + (i || ' days')::INTERVAL,
      v_base_date + (i + 1 || ' days')::INTERVAL
    )
    RETURNING id INTO v_diagnosis_id;

    -- 見積もりを作成（partner 10から）
    INSERT INTO quotations (
      diagnosis_request_id,
      partner_id,
      quotation_amount,
      quotation_details,
      construction_period_estimate,
      notes,
      is_selected,
      status,
      created_at,
      updated_at
    ) VALUES (
      v_diagnosis_id,
      v_partner_id,
      1000000 + (i * 50000), -- 100万円〜200万円の範囲
      '{"items": [{"name": "外壁塗装", "amount": ' || (800000 + i * 40000) || '}, {"name": "屋根塗装", "amount": ' || (200000 + i * 10000) || '}]}',
      CASE (i % 3)
        WHEN 0 THEN '2週間'
        WHEN 1 THEN '3週間'
        ELSE '1ヶ月'
      END,
      '高品質な塗料を使用し、丁寧に施工いたします。',
      true,
      'ACCEPTED',
      v_base_date + (i + 2 || ' days')::INTERVAL,
      v_base_date + (i + 3 || ' days')::INTERVAL
    )
    RETURNING id INTO v_quotation_id;

    -- 受注を作成（施工完了済み）
    INSERT INTO orders (
      quotation_id,
      construction_amount,
      construction_start_date,
      construction_end_date,
      completion_date,
      order_status,
      order_date,
      partner_memo,
      created_at,
      updated_at
    ) VALUES (
      v_quotation_id,
      1000000 + (i * 50000),
      v_base_date + (i + 10 || ' days')::INTERVAL,
      v_base_date + (i + 25 || ' days')::INTERVAL,
      v_base_date + (i + 25 || ' days')::INTERVAL,
      'COMPLETED',
      v_base_date + (i + 5 || ' days')::INTERVAL,
      '施工完了。お客様も満足されています。',
      v_base_date + (i + 5 || ' days')::INTERVAL,
      v_base_date + (i + 25 || ' days')::INTERVAL
    )
    RETURNING id INTO v_order_id;

    -- 顧客請求書を作成（一部のみ、10件中7件に請求書を発行）
    IF i % 10 < 7 THEN
      v_invoice_number := 'CINV-' || TO_CHAR(v_base_date + (i + 30 || ' days')::INTERVAL, 'YYYYMM') || '-' || LPAD(i::TEXT, 4, '0');

      INSERT INTO customer_invoices (
        order_id,
        invoice_number,
        issue_date,
        due_date,
        total_amount,
        tax_amount,
        grand_total,
        status,
        payment_date,
        notes,
        created_at,
        updated_at
      ) VALUES (
        v_order_id,
        v_invoice_number,
        v_base_date + (i + 30 || ' days')::INTERVAL,
        v_base_date + (i + 60 || ' days')::INTERVAL,
        1000000 + (i * 50000),
        (1000000 + (i * 50000)) * 0.1,
        (1000000 + (i * 50000)) * 1.1,
        CASE
          WHEN i % 3 = 0 THEN 'PAID'
          WHEN i % 3 = 1 THEN 'UNPAID'
          ELSE 'OVERDUE'
        END,
        CASE
          WHEN i % 3 = 0 THEN v_base_date + (i + 55 || ' days')::INTERVAL
          ELSE NULL
        END,
        '外壁塗装工事の請求書です。',
        v_base_date + (i + 30 || ' days')::INTERVAL,
        v_base_date + (i + 30 || ' days')::INTERVAL
      );

      -- 請求書明細を作成
      INSERT INTO customer_invoice_items (
        customer_invoice_id,
        description,
        quantity,
        unit,
        unit_price,
        amount,
        created_at,
        updated_at
      )
      SELECT
        currval('customer_invoices_id_seq'),
        item_desc,
        1,
        '式',
        item_amount,
        item_amount,
        v_base_date + (i + 30 || ' days')::INTERVAL,
        v_base_date + (i + 30 || ' days')::INTERVAL
      FROM (
        VALUES
          ('外壁塗装工事一式', 800000 + (i * 40000)),
          ('屋根塗装工事一式', 200000 + (i * 10000))
      ) AS items(item_desc, item_amount);
    END IF;

    RAISE NOTICE '作成完了: 顧客 %, 受注 %, 請求書 %', v_customer_id, v_order_id,
      CASE WHEN i % 10 < 7 THEN v_invoice_number ELSE 'なし（未発行）' END;

  END LOOP;

  RAISE NOTICE '✅ 20件のテストデータ作成が完了しました';
END $$;

-- 作成されたデータを確認
SELECT
  'Partner 10の施工完了済み受注数' AS info,
  COUNT(*) AS count
FROM orders o
JOIN quotations q ON o.quotation_id = q.id
WHERE q.partner_id = 10 AND o.order_status = 'COMPLETED'

UNION ALL

SELECT
  'Partner 10の顧客請求書数' AS info,
  COUNT(*) AS count
FROM customer_invoices ci
JOIN orders o ON ci.order_id = o.id
JOIN quotations q ON o.quotation_id = q.id
WHERE q.partner_id = 10

UNION ALL

SELECT
  'Partner 10の請求書未発行の完了受注数' AS info,
  COUNT(*) AS count
FROM orders o
JOIN quotations q ON o.quotation_id = q.id
LEFT JOIN customer_invoices ci ON ci.order_id = o.id
WHERE q.partner_id = 10
  AND o.order_status = 'COMPLETED'
  AND ci.id IS NULL;
