"use client";

import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "./SidebarContext";
import { SnackbarProvider } from "./SnackbarContext";
import SnackbarStack from "./SnackbarStack";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <SnackbarProvider>
          {children}
          <SnackbarStack />
        </SnackbarProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
