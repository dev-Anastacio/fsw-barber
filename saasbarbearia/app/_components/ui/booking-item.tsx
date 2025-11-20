import { Badge } from "./Badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./Avatar";

const BookingItem = () => {
  return (
    <section className="mt-6 md:mt-8">
      <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 md:mb-4 md:text-sm">
        Agendamentos
      </h2>

      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="flex flex-col justify-between gap-3 p-0 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-2 px-4 py-4 md:px-5 md:py-5 lg:px-6">
            <Badge className="w-fit text-xs md:text-sm">Confirmado</Badge>
            <h3 className="text-base font-semibold md:text-lg">
              Corte de Cabelo
            </h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 md:h-7 md:w-7">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-sm text-gray-600 md:text-base">
                Barbearia FSW
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-t px-5 py-4 sm:min-w-[120px] sm:border-l sm:border-t-0 md:min-w-[140px] md:py-5">
            <p className="text-sm text-gray-500 md:text-base">Outubro</p>
            <p className="text-2xl font-bold md:text-3xl lg:text-4xl">15</p>
            <p className="text-sm text-gray-500 md:text-base">20:00</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BookingItem;
