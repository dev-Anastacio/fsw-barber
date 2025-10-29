"use client";
import { CheckCircle2, SmartphoneIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg border border-solid p-3 md:p-4">
        <div className="flex items-center gap-2">
          <SmartphoneIcon size={20} className="text-primary" />
          <p className="text-sm md:text-base">{phone}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyPhoneClick(phone)}
          className="font-semibold"
        >
          Copiar
        </Button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg duration-300 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={20} />
          <span className="font-medium">Telefone copiado com sucesso!</span>
        </div>
      )}
    </>
  );
};

export default PhoneItem;
