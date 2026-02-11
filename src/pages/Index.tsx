import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { GamerHome } from "@/components/GamerHome";
import { AcademicHome } from "@/components/home/AcademicHome";

const Index = () => {
  const { user } = useAuth();

  return user ? <GamerHome /> : <AcademicHome />;
};

export default Index;
