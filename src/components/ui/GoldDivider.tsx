export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent ${className}`} />
  );
}
