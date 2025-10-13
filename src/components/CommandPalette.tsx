import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Wrench, Cpu, GraduationCap, Home, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAuth } from "@/contexts/AuthContext";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  requiresAuth?: boolean;
}

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands: CommandItem[] = [
    {
      id: "home",
      title: "Home",
      description: "Go to homepage",
      icon: Home,
      action: () => {
        navigate("/");
        setOpen(false);
      },
    },
    {
      id: "games",
      title: "Games Hub",
      description: "Browse unblocked games",
      icon: Gamepad2,
      action: () => {
        navigate("/games");
        setOpen(false);
      },
      requiresAuth: true,
    },
    {
      id: "utilities",
      title: "Utilities",
      description: "Password generator, QR codes, and more",
      icon: Wrench,
      action: () => {
        navigate("/utilities");
        setOpen(false);
      },
    },
    {
      id: "optimizations",
      title: "PC Optimizations",
      description: "Performance tips and Windows tweaks",
      icon: Cpu,
      action: () => {
        navigate("/optimizations");
        setOpen(false);
      },
    },
    {
      id: "education",
      title: "Education",
      description: "Learning resources and study materials",
      icon: GraduationCap,
      action: () => {
        navigate("/education");
        setOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) => !cmd.requiresAuth || isAuthenticated
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {filteredCommands.map((cmd) => (
            <CommandItem key={cmd.id} onSelect={cmd.action}>
              <cmd.icon className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{cmd.title}</span>
                {cmd.description && (
                  <span className="text-xs text-muted-foreground">
                    {cmd.description}
                  </span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
