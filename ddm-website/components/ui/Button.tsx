import Link from "next/link";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-primary text-on-primary hover:brightness-110 active:scale-[0.98]",
  secondary:
    "border border-outline-variant/30 text-on-surface hover:bg-surface-container",
  tertiary: "text-primary hover:underline",
} as const;

const sizeStyles = {
  sm: "px-6 py-2",
  md: "px-8 py-4",
  lg: "px-12 py-5",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonBaseProps
>;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "uppercase text-[10px] tracking-widest font-bold transition-all inline-block text-center",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
