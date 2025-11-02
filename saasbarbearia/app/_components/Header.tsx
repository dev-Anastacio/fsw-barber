import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import SidebarButton from "./sidebar-button";


const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          alt="FSW Barber"
          src="/images/logos/Logo.png"
          height={18}
          width={120}
        />
        <SidebarButton />
      </CardContent>
    </Card>
  );
};

export default Header;
