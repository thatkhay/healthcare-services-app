"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrimaryConcernsDetail } from "@/components/concerns/PrimaryConcernsDetail";

export default function ServiceDetailPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const resolvedParams = use(params) as { serviceId: string };

  return (
    <div>
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>
      <PrimaryConcernsDetail serviceId={resolvedParams.serviceId} />
    </div>
  );
}
