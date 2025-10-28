import { Button } from "@/app/_components/ui/Button";
import { CardContent } from "@/app/_components/ui/card";
import { RatingStars } from "@/app/_components/ui/rating-stars";
import { getBarbershopWithRating } from "@/app/_lib/rating";
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarbershopsPageProps {
  params: { id: string };
}

const BarbershopsPage = async ({ params }: BarbershopsPageProps) => {
  const barbershop = await getBarbershopWithRating(params.id);

  if (!barbershop) {
    return <div>Barbearia não encontrada</div>;
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl || ""}
          alt={barbershop?.name || "Barbearia"}
          fill
          className="object-cover"
        />

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>
      <div className="border-b border-solid p-5">
        <h1 className="text-xl font-bold file:mb-3">{barbershop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={16} />
          <span className="text-sm">{barbershop.address}</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <RatingStars rating={barbershop.rating.average} size={16} />
          <span className="text-xs text-gray-400">
            ({barbershop.rating.total}{" "}
            {barbershop.rating.total === 1 ? "avaliação" : "avaliações"})
          </span>
        </div>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="mb-4 text-lg font-bold uppercase text-gray-400">
          Sobre Nós
        </h2>
        <p className="text-justify text-sm text-gray-600">
          {barbershop.description}
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-300">Serviços</h2>
        <ul className="flex flex-col gap-4">
          {barbershop.services.map((service) => (
            <CardContent
              key={service.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-600">{service.name}</span>
              <span className="text-sm text-gray-400">{service.price}</span>
            </CardContent>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarbershopsPage;
