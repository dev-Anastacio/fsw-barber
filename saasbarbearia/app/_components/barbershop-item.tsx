import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/card";

interface BarbershopItemProps {
  barbershop: Barbershop & {
    rating?: {
      average: number;
      total: number;
    };
  };
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const rating = barbershop.rating?.average || 0;
  const displayRating = rating > 0 ? rating.toFixed(1) : "Novo";

  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <Badge
            className="absolute left-2 top-2 z-10 flex items-center gap-1"
            variant="secondary"
          >
            <StarIcon
              size={12}
              className={
                rating > 0 ? "fill-primary text-primary" : "text-primary"
              }
            />
            <span className="text-xs font-semibold">{displayRating}</span>
          </Badge>
        </div>
        <div className="px-2 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button asChild variant="secondary" className="mt-3 w-full" size="sm">
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
