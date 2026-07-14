"use client";

import { DeleteRecipe } from "@/lib/actions/recipes";
import { TRecipe, TSuccess } from "@/types/interface";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

interface DeleteRecipeProps {
    recipe: TRecipe
}

export function DeleteRecipeWithModal({ recipe }: DeleteRecipeProps) {
    const router = useRouter();
    const handleConfirmDelete = async () => {
        try {
            console.log(`Deleting recipe ID: ${recipe._id} from Recipe Nest...`);
            const result: TSuccess = await DeleteRecipe(recipe._id as string);
            if (result.success) {
                toast.success(result.message);
                router.refresh()
            }


        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };

    return (
        <AlertDialog>
            {/* টেবিলের রো-এর ভেতর সুন্দরভাবে ফিট হওয়ার জন্য ট্রিপল অ্যাকশন বাটন */}
            <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                className="text-danger/70 hover:text-danger min-w-8 w-8 h-8 rounded-lg cursor-pointer"
                title="Delete Recipe"
            >
                <FiTrash2 size={17} />
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    {/* Recipe Nest এর ডার্ক থিমের সাথে ম্যাচ করার জন্য ব্যাকগ্রাউন্ড স্টাইল যুক্ত করা হয়েছে */}
                    <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#1c1917] border border-white/10 text-white rounded-2xl">
                        <AlertDialog.CloseTrigger className="text-white/50 hover:text-white" />

                        <AlertDialog.Header className="flex items-center gap-3">
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading className="text-white font-bold text-lg">
                                Delete recipe permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body className="py-4">
                            <p className="text-white/80 text-sm leading-relaxed">
                                This will permanently delete <strong>{recipe.title}</strong> and all of its
                                data from your nest. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="flex justify-end gap-2 border-t border-white/5 pt-4">
                            <Button
                                slot="close"
                                variant="light"
                                className="text-white/70 hover:bg-white/5 font-medium rounded-xl text-xs px-4 h-9 cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                color="danger"
                                onClick={handleConfirmDelete}
                                className="bg-danger hover:bg-danger-600 font-bold rounded-xl text-xs px-4 h-9 cursor-pointer"
                            >
                                Delete Recipe
                            </Button>
                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}