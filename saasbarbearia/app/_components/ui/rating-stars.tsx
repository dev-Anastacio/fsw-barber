import { cn } from "@/app/_lib/utils";
import { StarIcon } from "lucide-react";

interface RatingStarsProps {
  rating: number; // 0 a 5
  size?: number;
  showNumber?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  size = 16,
  showNumber = true,
  className,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Renderizar estrelas */}
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          size={size}
          className={cn(
            star <= fullStars
              ? "fill-primary text-primary"
              : star === fullStars + 1 && hasHalfStar
                ? "fill-primary/50 text-primary"
                : "fill-muted text-muted"
          )}
        />
      ))}

      {/* Mostrar número */}
      {showNumber && (
        <span className="text-sm font-semibold">
          {rating > 0 ? rating.toFixed(1) : "0.0"}
        </span>
      )}
    </div>
  );
}
