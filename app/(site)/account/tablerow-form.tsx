"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VariantType } from "@/lib/supabase/dbtypes";
import { useForm } from "react-hook-form";
import { editVariant } from "@/actions/editVariant";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  id: string;
  variantname: string;
  price: number;
  quantity: number;
  sold: number;
}

interface TableRowFormProps {
  variant: VariantType;
}

const TableRowForm: React.FC<TableRowFormProps> = ({ variant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      id: variant.id,
      variantname: variant.variantname,
      price: variant.price,
      quantity: variant.quantity,
      sold: variant.sold,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const result = await editVariant(formData);
    
    setIsSubmitting(false);

    if (result.error) {
      toast.error("Failed to update variant");
    } else {
      toast.success("Variant updated successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-[15rem]">
      <div>
        <Label htmlFor="variantname">Variant Name</Label>
        <Input id="variantname" {...register("variantname")} placeholder="Variant Name" />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" {...register("price")} placeholder="Price" />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" {...register("quantity")} placeholder="Quantity" />
      </div>
      <div>
        <Label htmlFor="sold">Sold</Label>
        <Input id="sold" type="number" {...register("sold")} placeholder="Sold" />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
      <input type="hidden" {...register("id")} />
    </form>
  );
};

export default TableRowForm;