import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/vorfall")({
  component: () => <Outlet />,
});
