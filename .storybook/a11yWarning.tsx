type A11yWarningProps = {
  message: string;
};

export const A11yWarning = ({ message }: A11yWarningProps) => (
  <div
    role="note"
    className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"
  >
    <strong>⚠️ Accessibility guidance:</strong> {message}
  </div>
);