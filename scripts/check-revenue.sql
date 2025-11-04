-- Check partner revenue data
SELECT
  p.id as partner_id,
  p.company_name,
  COUNT(o.id) as total_orders,
  COUNT(CASE WHEN o.order_status IN ('COMPLETED', 'REVIEW_COMPLETED') THEN 1 END) as completed_orders,
  SUM(CASE WHEN o.order_status IN ('COMPLETED', 'REVIEW_COMPLETED') THEN o.construction_amount ELSE 0 END) as total_revenue,
  MIN(o.construction_amount) as min_amount,
  MAX(o.construction_amount) as max_amount
FROM partners p
LEFT JOIN quotations q ON q.partner_id = p.id AND q.is_selected = true
LEFT JOIN orders o ON o.quotation_id = q.id
GROUP BY p.id, p.company_name
ORDER BY total_revenue DESC
LIMIT 10;
