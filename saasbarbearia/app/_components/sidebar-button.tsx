import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";

const SidebarButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="shadow-md">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[85vw] max-w-[350px] sm:w-[350px]">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left text-lg md:text-xl">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid py-4 md:py-5">
          <h2 className="font-bold">Olá, faça seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Faça login na plataforma!</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google.
                </DialogDescription>
              </DialogHeader>
              <Button variant="outline" className="gap-2 font-bold">
                <Image
                  src="/images/logos/Google.svg"
                  alt="Google Logo"
                  width={18}
                  height={18}
                />
                Fazer login com o Google
              </Button>
            </DialogContent>
          </Dialog>
          {/* <Avatar className="h-12 w-12 md:h-14 md:w-14">
            <AvatarImage src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387" />
          </Avatar>

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold md:text-base">
              Rodolfo Azevedo
            </p>
            <p className="truncate text-xs text-gray-500 md:text-sm">
              rodolfo@gmail.com
            </p>
          </div> */}
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-4 md:py-5">
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="h-11 justify-start gap-2 text-sm md:h-12 md:text-base"
              asChild
            >
              <Link href="/">
                <HomeIcon size={18} className="md:h-5 md:w-5" /> Início
              </Link>
            </Button>
          </SheetClose>
          <Button
            variant="ghost"
            className="h-11 justify-start gap-2 text-sm md:h-12 md:text-base"
          >
            <CalendarIcon size={18} className="md:h-5 md:w-5" /> Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-4 md:py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button
                variant="ghost"
                className="h-11 justify-start gap-2 text-sm md:h-12 md:text-base"
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={`Ícone ${option.title}`}
                    width={18}
                    height={18}
                    className="md:h-5 md:w-5"
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>
        <div className="flex flex-col gap-1 py-4 md:py-5">
          <Button
            variant="ghost"
            className="h-11 justify-start gap-2 text-sm md:h-12 md:text-base"
          >
            <LogOutIcon size={18} className="md:h-5 md:w-5" /> Sair da Conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarButton;
