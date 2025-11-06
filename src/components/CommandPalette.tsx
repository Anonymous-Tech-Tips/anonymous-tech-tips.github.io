import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Wrench, Cpu, GraduationCap, Home, Search, Command } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAuth } from "@/contexts/AuthContext";
import { FastSearch } from "./FastSearch";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  requiresAuth?: boolean;
}

export const CommandPalette: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <FastSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
  );
};
