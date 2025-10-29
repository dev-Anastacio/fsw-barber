import { BarbershopServices } from "@prisma/client";
import Image from "next/image";
import { Button } from "./Button";
import { Card, CardContent } from "./card";

interface ServiceItemProps {
  service: BarbershopServices;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="flex gap-3 p-3 md:gap-4 md:p-4">
        {/* Imagem do serviço */}
        <div className="relative h-[110px] w-[110px] flex-shrink-0 overflow-hidden rounded-xl md:h-[120px] md:w-[120px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="120px"
          />
        </div>

        {/* Informações do serviço */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold leading-tight md:text-base">
              {service.name}
            </h3>
            <p className="line-clamp-2 text-xs text-gray-400 md:text-sm">
              {service.description}
            </p>
          </div>

          {/* Preço e botão */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Preço</span>
              <p className="text-lg font-bold text-primary md:text-xl">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
            </div>

            <Button
              variant="default"
              size="sm"
              className="font-semibold shadow-sm transition-all hover:shadow-md"
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
