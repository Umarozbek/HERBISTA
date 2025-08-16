import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import { CategoryTypes, MenusTypes } from "@/types/RootTypes";

interface EditFoodProps {
  menu: MenusTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (menu: MenusTypes) => void;
}

export function EditFood({ menu, open, onOpenChange, onUpdated }: EditFoodProps) {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    image: File | null;
    category: string;
    price: number;
    status: string;
  }>({
    name: menu.name,
    description: menu.description,
    image: null,
    category: menu.category,
    price: menu.price,
    status: menu.status,
  });

  useEffect(() => {
    setFormData({
      name: menu.name,
      description: menu.description,
      image: null,
      category: menu.category,
      price: menu.price,
      status: menu.status,
    });
  }, [menu]);

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

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", String(formData.price));
      formDataToSend.append("status", formData.status);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const res = await Fetch.put(`menu/${menu._id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdated(res.data.data);
      onOpenChange(false);
      toast.success("Menu updated successfully");
    } catch (error) {
      console.error(error);
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message || "Failed to update menu");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-[#202020] text-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 "
        >
          ✕
        </Button>

        <h2 className="text-2xl mb-4">Edit menu</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat.name}>
                    <div className="flex items-center gap-2">
                      {cat.image && (
                        <img
                          src={cat.image}
                          alt=""
                          className="w-6 h-6 rounded"
                        />
                      )}
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: +e.target.value })
              }
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="sold out">Sold Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Image</Label>
            <Input
              name="image"
              type="file"
              className="file:cursor-pointer file:rounded file:border-0 file:bg-white  pt-1.5 file:text-sm file:text-black hover:file:text-white hover:file:bg-blue-600"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
