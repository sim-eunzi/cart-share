import type { ButtonHTMLAttributes } from "react";

export type PixelButtonVariant = "primary" | "secondary" | "accent";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PixelButtonVariant;
}

const VARIANT_CLASS: Record<PixelButtonVariant, string> = {
  primary: "bg-rose text-white",
  secondary: "bg-white text-ink",
  accent: "bg-butter text-ink",
};

export function PixelButton({
  variant = "primary",
  disabled = false,
  className = "",
  children,
  ...rest
}: PixelButtonProps) {
  const base =
    "pixel-press inline-flex items-center justify-center gap-1 font-pixel text-[10px] leading-none border-[3px] px-4 py-3 select-none";
  const look = disabled
    ? "bg-pinklight text-ink/40 border-ink/40 cursor-not-allowed"
    : `${VARIANT_CLASS[variant]} border-ink shadow-pixel`;

  return (
    <button
      type="button"
      data-variant={variant}
      disabled={disabled}
      className={`${base} ${look} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
