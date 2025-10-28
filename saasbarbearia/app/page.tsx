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
      <main className="flex-1 px-5 py-6">
        {/* Saudação */}
        <div className="mb-6">
          <h2 className="text-xl font-bold md:text-2xl">Olá, Anastácio</h2>
          <p className="text-sm capitalize text-gray-400">
            Quarta-Feira, 15 de outubro
          </p>
        </div>

        {/* Busca */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Buscar barbearia..."
            className="flex-1"
          />
          <Button size="icon" className="shrink-0">
            <SearchIcon size={18} />
          </Button>
        </div>

        {/* Filtros de Serviços */}
        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="shrink-0 gap-2"
              variant="secondary"
              size="sm"
            >
              <Image
                src={option.imageUrl}
                alt={`Ícone ${option.title}`}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full overflow-hidden rounded-xl md:h-[200px]">
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
        <section className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        {/* Populares */}
        <section className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full bg-secondary px-5 py-6">
        <p className="text-center text-sm text-gray-400">
          © 2025 Copyright <span className="font-bold">FSW Barber</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;
