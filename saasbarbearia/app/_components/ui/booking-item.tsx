import { Badge } from "./Badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./Avatar";

const BookingItem = () => {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex flex-col justify-between gap-3 p-0 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-2 px-5 py-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-t px-5 py-5 sm:border-l sm:border-t-0">
            <p className="text-sm">Outubro</p>
            <p className="text-2xl">15</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BookingItem;
