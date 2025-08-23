import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";

export function AddPromo() {
 
  const [values, setValues] = useState(0);


  const [errors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  
  const handleSubmit = async () => {
  

    setIsLoading(true);

    try {
      const response = await Fetch.post( `promo/${values}` );
      console.log(response);

      toast.success("PromoCode Generated!!!");
      window.location.reload();
      setIsSheetOpen(false);
    } catch (error) {
      alert("Не удалось создать администратора. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
      
      }}
    >
      <SheetTrigger asChild>
        <Button variant="default" className="bg-sky-600">
         Create Promo Code
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">
            Create new admin
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <span>Fill in all fields to create a admin</span>
        </SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="fullName">  
              Number{" "}
              <span
                className={`${
                  errors.fullName ? "text-red-500" : "text-blue-500"
                }`}
              >
                *
              </span>
            </Label>
            <Input
              id="value"
              value={values}
              onChange={(e) => setValues(Number(e.target.value))}
              
            />
            
          </div>
          
        </div>
        <SheetFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Создание..." : "Создать"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
