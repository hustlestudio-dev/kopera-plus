// React Doctor configuration — KOPERA-PLUS quality gate.
// Scans the React/Inertia frontend only; telemetry disabled.
// Tune rules/scope with: npx react-doctor@latest ci config
export default {
  telemetry: false,
  include: ['resources/js/**/*.{ts,tsx}'],
};
