import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/vorfall")({
  validateSearch: (search: Record<string, unknown>): { modus?: "gemeinsam" } =>
    search["modus"] === "gemeinsam" ? { modus: "gemeinsam" } : {},
  component: () => <Outlet />,
});
