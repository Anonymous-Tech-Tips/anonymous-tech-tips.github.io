import React, { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AcademicHome } from "@/components/home/AcademicHome";

const GamerHome = lazy(() =>
  import("@/components/GamerHome").then(m => ({ default: m.GamerHome }))
);

const Index = () => {
  const { user } = useAuth();

  return user ? (
    <Suspense fallback={<div className="min-h-screen bg-[#08080f]" />}>
      <GamerHome />
    </Suspense>
  ) : (
    <AcademicHome />
  );
};

export default Index;
