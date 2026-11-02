/** Error details may contain private input. External reporting is disabled. */
export function reportLovableError(_error: unknown, _context: Record<string, unknown> = {}) {
  // Intentionally no forwarding to injected editor/telemetry hooks.
}
