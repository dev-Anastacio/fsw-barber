import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import SidebarButton from "./sidebar-button";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-4 md:p-5 lg:p-6">
        <Image
          alt="FSW Barber"
          src="/images/logos/Logo.png"
          height={18}
          width={120}
          className="h-4 w-auto md:h-5"
        />
        <SidebarButton />
      </CardContent>
    </Card>
  );
};

export default Header;
