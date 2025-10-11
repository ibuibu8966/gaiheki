"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PartnerDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/partner-dashboard/diagnoses");
  }, [router]);

  return null;
}