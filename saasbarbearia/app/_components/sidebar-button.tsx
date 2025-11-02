import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/Avatar";

const SidebarButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-3 border-b border-solid py-5">
          <Avatar>
            <AvatarImage src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387" />
          </Avatar>

          <div>
            <p className="font-bold">Rodolfo Azevedo</p>
            <p className="text-xs">rodolfo@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-5">
          <SheetClose asChild>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/">
                <HomeIcon size={18} /> Início
              </Link>
            </Button>
          </SheetClose>
          <Button variant="ghost" className="justify-start gap-2">
            {" "}
            <CalendarIcon size={18} /> Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant="ghost"
              className="justify-start gap-2"
            >
              <Image
                src={option.imageUrl}
                alt={`Ícone ${option.title}`}
                width={18}
                height={18}
              />
              {option.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-1 border-b border-solid py-5">
          <Button variant="ghost" className="justify-start gap-2">
            {" "}
            <LogOutIcon size={18} /> Sair da Conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarButton;
