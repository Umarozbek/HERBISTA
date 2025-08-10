import { useEffect, useState } from "react";
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
import { CategoryTypes } from "@/types/RootTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddFood() {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [loading, setLoading] = useState(false);
console.log(categories);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    image: File | null;
    category: string;
    price: number;
  }>({
    name: "",
    description: "",
    image: null,
    category: "",
    price: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await Fetch.get("categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
      description: "",
      image: null,
      category: "",
      price: 0,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", String(formData.price));

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await Fetch.post("menu", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Menu created successfully");
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

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
            <Label htmlFor="description">Description <span className="text-blue-500">*</span></Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              type="text"
              placeholder="Description"
            />
          </div>
          

          <div className="space-y-1">
            <Label htmlFor="category">Category <span className="text-blue-500">*</span></Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-full bg-gray-800 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category._id} value={category.name}>
                    <div className="flex items-center gap-2">
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-6 h-6 rounded object-cover"
                        />
                      )}
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Price ($) <span className="text-blue-500">*</span></Label>
            <Input
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
              type="number"
              placeholder="0"
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

