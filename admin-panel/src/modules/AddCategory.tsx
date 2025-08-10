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


export function AddCategory() {
  const [formData, setFormData] = useState<{
    name: string;
    image: File | null;

  }>({
    name: "",
  
    image: null,
   
  
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" && files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: null,
   
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      console.log(formData);
      await Fetch.post("categories", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast("Categories created successfully");
      resetForm();
      setIsSheetOpen(false);
      window.location.reload();
    } catch (error) {
      alert("Failed to create menu. Try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-sky-600">
          Create menu
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">Create new menu</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <span>Fill in all fields to create a menu item</span>
        </SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name <span className="text-blue-500">*</span></Label>
            <Input
              name="name"
              value={formData.name}
              type="text"
              placeholder="Name"
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="image">Image <span className="text-blue-500">*</span></Label>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
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
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
