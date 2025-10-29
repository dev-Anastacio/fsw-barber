import { SearchIcon } from "lucide-react";
import Image from "next/image";
import BarbershopItem from "./_components/barbershop-item";
import Header from "./_components/Header";
import BookingItem from "./_components/ui/booking-item";
import { Button } from "./_components/ui/Button";
import { Input } from "./_components/ui/Input";
import { quickSearchOptions } from "./_constants/search";
import { getBarbershopsWithRating } from "./_lib/rating";

const Home = async () => {
  const barbershops = await getBarbershopsWithRating();
  const popularBarbershops = [...barbershops].sort(
    (a, b) => b.rating.average - a.rating.average
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6 md:px-8 lg:px-10">
        {/* Saudação */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Olá, Anastácio
          </h2>
          <p className="text-sm capitalize text-gray-400 md:text-base">
            Quarta-Feira, 15 de outubro
          </p>
        </div>

        {/* Busca */}
        <div className="flex items-center gap-2 md:gap-3">
          <Input
            type="text"
            placeholder="Buscar barbearia..."
            className="flex-1 md:text-base"
          />
          <Button size="icon" className="shrink-0 md:h-12 md:w-12">
            <SearchIcon size={18} className="md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Filtros de Serviços */}
        <div className="mt-6 flex gap-3 overflow-x-auto md:flex-wrap md:overflow-x-visible [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="shrink-0 gap-2 md:shrink"
              variant="secondary"
              size="sm"
            >
              <Image
                src={option.imageUrl}
                alt={`Ícone ${option.title}`}
                width={16}
                height={16}
                className="md:h-5 md:w-5"
              />
              <span className="text-xs md:text-sm">{option.title}</span>
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full overflow-hidden rounded-xl md:h-[200px] lg:h-[280px]">
          <Image
            src="/images/banners/banner01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            quality={100}
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Agendamentos */}
        <BookingItem />

        {/* Recomendados */}
        <section className="mt-6 md:mt-8">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 md:mb-4 md:text-sm">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        {/* Populares */}
        <section className="mt-6 md:mt-8 lg:mt-10">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 md:mb-4 md:text-sm">
            Populares
          </h2>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full bg-secondary px-5 py-6 md:py-8">
        <p className="text-center text-sm text-gray-400 md:text-base">
          © 2025 Copyright <span className="font-bold">FSW Barber</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;
