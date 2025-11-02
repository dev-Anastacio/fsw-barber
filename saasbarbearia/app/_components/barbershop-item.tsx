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
    <Card className="group min-w-[167px] overflow-hidden rounded-2xl transition-all hover:shadow-xl md:min-w-0">
      <CardContent className="p-0">
        {/* Imagem da barbearia */}
        <Link href={`/barbershops/${barbershop.id}`}>
          <div className="relative h-[159px] w-full overflow-hidden md:h-[180px] lg:h-[200px]">
            <Image
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              src={barbershop.imageUrl}
              alt={barbershop.name}
              sizes="(max-width: 768px) 167px, (max-width: 1024px) 250px, 300px"
            />
            {/* Overlay escuro no hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

            {/* Badge de rating */}
            <Badge className="absolute left-3 top-3 z-10 flex items-center gap-1.5 shadow-md">
              <StarIcon
                size={14}
                className={
                  rating > 0 ? "fill-primary text-primary" : "text-primary"
                }
              />
              <span className="text-xs font-bold">{displayRating}</span>
            </Badge>
          </div>
        </Link>

        {/* Informações da barbearia */}
        <div className="space-y-3 p-3 md:p-4">
          <div className="space-y-1">
            <h3 className="truncate text-base font-bold leading-tight md:text-lg">
              {barbershop.name}
            </h3>
            <p className="truncate text-xs text-gray-400 md:text-sm">
              {barbershop.address}
            </p>
          </div>

          {/* Botão de reserva */}
          <Button
            asChild
            variant="default"
            className="w-full font-semibold shadow-sm transition-all hover:shadow-md"
            size="sm"
          >
            <Link href={`/barbershops/${barbershop.id}`}>Ver Barbearia</Link>
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
