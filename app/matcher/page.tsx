"use client";
import JobMatcherPage from "@/pages/JobMatcherPage";
import { useRouter } from "next/navigation";

export default function Matcher() {
  const router = useRouter();

  return (
    <JobMatcherPage
      onBack={() => router.push("/")}
      onViewJob={(id) => router.push(`/jobs/${id}`)}
    />
  );
}
