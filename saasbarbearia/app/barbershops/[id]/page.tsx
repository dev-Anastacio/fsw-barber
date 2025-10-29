import { Button } from "@/app/_components/ui/Button";
import { RatingStars } from "@/app/_components/ui/rating-stars";
import ServiceItem from "@/app/_components/ui/service-item";
import { prisma } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopsPageProps {
  params: { id: string };
}

const BarbershopsPage = async ({ params }: BarbershopsPageProps) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true },
  });

  if (!barbershop) {
    return notFound();
  }

  // Rating temporário até ter avaliações no banco
  const rating = { average: 0, total: 0 };

  return (
    <div className="pb-10">
      {/* Header com imagem */}
      <div className="relative h-[250px] w-full md:h-[400px] lg:h-[500px]">
        <Image
          src={barbershop?.imageUrl || ""}
          alt={barbershop?.name || "Barbearia"}
          fill
          className="object-cover"
          priority
        />

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 md:left-6 md:top-6"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 md:right-6 md:top-6"
        >
          <MenuIcon />
        </Button>
      </div>

      {/* Container principal centralizado */}
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
        {/* Informações da barbearia */}
        <div className="border-b border-solid py-5 md:py-6 lg:py-8">
          <h1 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl">
            {barbershop.name}
          </h1>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <span className="text-sm md:text-base">{barbershop.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={rating.average} size={16} />
              <span className="text-xs text-gray-400 md:text-sm">
                ({rating.total}{" "}
                {rating.total === 1 ? "avaliação" : "avaliações"})
              </span>
            </div>
          </div>
        </div>

        {/* Sobre nós */}
        <div className="border-b border-solid py-5 md:py-6 lg:py-8">
          <h2 className="mb-4 text-lg font-bold uppercase text-gray-400 md:text-xl">
            Sobre Nós
          </h2>
          <p className="text-justify text-sm leading-relaxed text-gray-600 md:text-base lg:max-w-4xl">
            {barbershop.description}
          </p>
        </div>

        {/* Serviços */}
        <div className="py-5 md:py-6 lg:py-8">
          <h2 className="mb-6 text-lg font-bold uppercase text-gray-400 md:text-xl">
            Serviços
          </h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
