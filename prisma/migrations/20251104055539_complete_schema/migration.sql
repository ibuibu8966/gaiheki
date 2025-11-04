-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('UNDER_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ArticleCategory" AS ENUM ('BASIC_KNOWLEDGE', 'PAINT_TYPES', 'CASE_STUDIES', 'MAINTENANCE', 'CONTRACTOR_SELECTION', 'COST_ESTIMATE', 'TROUBLESHOOTING', 'SEASONAL_WEATHER');

-- CreateEnum
CREATE TYPE "public"."ConstructionType" AS ENUM ('EXTERIOR_PAINTING', 'ROOF_PAINTING', 'EXTERIOR_AND_ROOF', 'PARTIAL_REPAIR', 'WATERPROOFING', 'SIDING_REPLACEMENT', 'FULL_REPLACEMENT');

-- CreateEnum
CREATE TYPE "public"."CurrentSituation" AS ENUM ('MARKET_RESEARCH', 'CONSIDERING_CONSTRUCTION', 'COMPARING_CONTRACTORS', 'READY_TO_ORDER', 'CONSTRUCTION_COMPLETED');

-- CreateEnum
CREATE TYPE "public"."CustomerConstructionType" AS ENUM ('EXTERIOR_PAINTING', 'ROOF_PAINTING', 'EXTERIOR_AND_ROOF', 'PARTIAL_REPAIR', 'WATERPROOFING', 'SIDING_REPLACEMENT', 'FULL_REPLACEMENT');

-- CreateEnum
CREATE TYPE "public"."CustomerStatus" AS ENUM ('ORDERED', 'IN_PROGRESS', 'COMPLETED', 'REVIEW_COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."DiagnosisStatus" AS ENUM ('DESIGNATED', 'RECRUITING', 'COMPARING', 'DECIDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."FloorArea" AS ENUM ('UNKNOWN', 'UNDER_80', 'FROM_80_TO_100', 'FROM_101_TO_120', 'FROM_121_TO_140', 'FROM_141_TO_160', 'FROM_161_TO_180', 'FROM_181_TO_200', 'FROM_201_TO_250', 'FROM_251_TO_300', 'FROM_301_TO_500', 'OVER_501');

-- CreateEnum
CREATE TYPE "public"."InquiryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('ORDERED', 'IN_PROGRESS', 'COMPLETED', 'REVIEW_COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PartnersStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."Prefecture" AS ENUM ('Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima', 'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara', 'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa');

-- CreateEnum
CREATE TYPE "public"."InvoiceStatus" AS ENUM ('DRAFT', 'UNPAID', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."application_status_histories" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "previous_status" "public"."ApplicationStatus",
    "new_status" "public"."ApplicationStatus" NOT NULL,
    "changed_by" INTEGER NOT NULL,
    "change_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_status_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "thumbnail_image" TEXT,
    "category" "public"."ArticleCategory" NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "post_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "customer_name" VARCHAR(100) NOT NULL,
    "customer_phone" VARCHAR(20) NOT NULL,
    "customer_email" VARCHAR(150) NOT NULL,
    "construction_address" VARCHAR(500) NOT NULL,
    "customer_construction_type" "public"."CustomerConstructionType" NOT NULL,
    "construction_amount" INTEGER NOT NULL,
    "construction_completed_at" TIMESTAMP(3),
    "customer_status" "public"."CustomerStatus" NOT NULL DEFAULT 'ORDERED',
    "customer_completion_date" TIMESTAMP(3),
    "customer_rating" SMALLINT,
    "customer_review_title" VARCHAR(200),
    "customer_review" TEXT,
    "customer_review_date" TIMESTAMP(3),
    "customer_comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."diagnosis_requests" (
    "id" SERIAL NOT NULL,
    "diagnosis_number" VARCHAR(20) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "designated_partner_id" INTEGER,
    "prefecture" "public"."Prefecture" NOT NULL,
    "floor_area" "public"."FloorArea" NOT NULL,
    "current_situation" "public"."CurrentSituation" NOT NULL,
    "construction_type" "public"."ConstructionType" NOT NULL,
    "status" "public"."DiagnosisStatus" NOT NULL DEFAULT 'RECRUITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnosis_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inquiries" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "inquiry_content" TEXT NOT NULL,
    "inquiry_status" "public"."InquiryStatus" NOT NULL DEFAULT 'PENDING',
    "admin_memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" SERIAL NOT NULL,
    "quotation_id" INTEGER NOT NULL,
    "partner_memo" TEXT,
    "admin_memo" TEXT,
    "construction_amount" INTEGER,
    "construction_start_date" DATE,
    "construction_end_date" DATE,
    "order_status" "public"."OrderStatus" NOT NULL DEFAULT 'ORDERED',
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completion_date" TIMESTAMP(3),
    "evaluation_token" VARCHAR(100),
    "evaluation_token_sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_photos" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "photo_url" VARCHAR(500) NOT NULL,
    "photo_type" VARCHAR(50),
    "description" VARCHAR(200),
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partner_application_prefectures" (
    "id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "supported_prefecture" "public"."Prefecture" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_application_prefectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partner_applications" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(200) NOT NULL,
    "representative_name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "website_url" VARCHAR(500),
    "business_description" TEXT NOT NULL,
    "self_pr" TEXT NOT NULL,
    "application_status" "public"."ApplicationStatus" NOT NULL DEFAULT 'UNDER_REVIEW',
    "admin_memo" TEXT,
    "review_notes" TEXT,
    "reviewed_by" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partner_details" (
    "id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "company_name" VARCHAR(200) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "representative_name" VARCHAR(100) NOT NULL,
    "fax_number" VARCHAR(20),
    "website_url" VARCHAR(500),
    "business_description" TEXT NOT NULL,
    "appeal_text" TEXT NOT NULL,
    "business_hours" VARCHAR(200),
    "closed_days" VARCHAR(200),
    "site_reprint_prefecture" "public"."Prefecture",
    "partners_status" "public"."PartnersStatus" NOT NULL DEFAULT 'INACTIVE',
    "invoice_registration_number" VARCHAR(50),
    "bank_name" VARCHAR(255),
    "bank_branch_name" VARCHAR(255),
    "bank_account_type" VARCHAR(50),
    "bank_account_number" VARCHAR(50),
    "bank_account_holder" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partner_prefectures" (
    "id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "supported_prefecture" "public"."Prefecture" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_prefectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partners" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "login_email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "fee_plan_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quotations" (
    "id" SERIAL NOT NULL,
    "diagnosis_request_id" INTEGER NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "quotation_amount" INTEGER NOT NULL,
    "appeal_text" TEXT,
    "is_selected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer_invoices" (
    "id" SERIAL NOT NULL,
    "invoice_number" VARCHAR(50) NOT NULL,
    "order_id" INTEGER NOT NULL,
    "issue_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "tax_amount" INTEGER NOT NULL,
    "grand_total" INTEGER NOT NULL,
    "status" "public"."InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
    "payment_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer_invoice_items" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "unit_price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fee_plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "monthly_fee" INTEGER,
    "per_order_fee" INTEGER,
    "per_project_fee" INTEGER,
    "project_fee_rate" DOUBLE PRECISION,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fee_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company_invoices" (
    "id" SERIAL NOT NULL,
    "invoice_number" VARCHAR(50) NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "issue_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "billing_period_start" DATE NOT NULL,
    "billing_period_end" DATE NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "tax_amount" INTEGER NOT NULL,
    "grand_total" INTEGER NOT NULL,
    "status" "public"."InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
    "payment_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company_invoice_items" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "related_order_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."system_settings" (
    "id" SERIAL NOT NULL,
    "setting_key" VARCHAR(100) NOT NULL,
    "setting_value" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company_settings" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(10),
    "address" TEXT,
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "invoice_registration_number" VARCHAR(20),
    "bank_name" VARCHAR(100),
    "bank_branch_name" VARCHAR(100),
    "bank_account_type" VARCHAR(20),
    "bank_account_number" VARCHAR(20),
    "bank_account_holder" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "diagnosis_requests_diagnosis_number_key" ON "public"."diagnosis_requests"("diagnosis_number");

-- CreateIndex
CREATE UNIQUE INDEX "orders_quotation_id_key" ON "public"."orders"("quotation_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_evaluation_token_key" ON "public"."orders"("evaluation_token");

-- CreateIndex
CREATE INDEX "order_photos_order_id_idx" ON "public"."order_photos"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "partner_application_prefectures_partner_id_supported_prefec_key" ON "public"."partner_application_prefectures"("partner_id", "supported_prefecture");

-- CreateIndex
CREATE UNIQUE INDEX "partner_details_partner_id_key" ON "public"."partner_details"("partner_id");

-- CreateIndex
CREATE UNIQUE INDEX "partner_prefectures_partner_id_supported_prefecture_key" ON "public"."partner_prefectures"("partner_id", "supported_prefecture");

-- CreateIndex
CREATE UNIQUE INDEX "partners_username_key" ON "public"."partners"("username");

-- CreateIndex
CREATE UNIQUE INDEX "partners_login_email_key" ON "public"."partners"("login_email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_invoices_invoice_number_key" ON "public"."customer_invoices"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "customer_invoices_order_id_key" ON "public"."customer_invoices"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_invoices_invoice_number_key" ON "public"."company_invoices"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_setting_key_key" ON "public"."system_settings"("setting_key");

-- AddForeignKey
ALTER TABLE "public"."application_status_histories" ADD CONSTRAINT "application_status_histories_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."partner_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."application_status_histories" ADD CONSTRAINT "application_status_histories_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."articles" ADD CONSTRAINT "articles_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diagnosis_requests" ADD CONSTRAINT "diagnosis_requests_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diagnosis_requests" ADD CONSTRAINT "diagnosis_requests_designated_partner_id_fkey" FOREIGN KEY ("designated_partner_id") REFERENCES "public"."partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inquiries" ADD CONSTRAINT "inquiries_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "public"."quotations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_photos" ADD CONSTRAINT "order_photos_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."partner_application_prefectures" ADD CONSTRAINT "partner_application_prefectures_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partner_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."partner_applications" ADD CONSTRAINT "partner_applications_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."partner_details" ADD CONSTRAINT "partner_details_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."partner_prefectures" ADD CONSTRAINT "partner_prefectures_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."partners" ADD CONSTRAINT "partners_fee_plan_id_fkey" FOREIGN KEY ("fee_plan_id") REFERENCES "public"."fee_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_diagnosis_request_id_fkey" FOREIGN KEY ("diagnosis_request_id") REFERENCES "public"."diagnosis_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_invoices" ADD CONSTRAINT "customer_invoices_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_invoice_items" ADD CONSTRAINT "customer_invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."customer_invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company_invoices" ADD CONSTRAINT "company_invoices_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company_invoice_items" ADD CONSTRAINT "company_invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."company_invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
