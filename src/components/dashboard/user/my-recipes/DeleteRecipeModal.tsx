"use client";

import { DeleteRecipe } from "@/lib/actions/recipes";
import { TRecipe, TSuccess } from "@/types/interface";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

interface DeleteRecipeProps {
    recipe: TRecipe;
}

export function DeleteRecipeWithModal({ recipe }: DeleteRecipeProps) {
    const router = useRouter();

    const handleConfirmDelete = async () => {
        try {
            console.log(`Deleting recipe ID: ${recipe._id} from Recipe Nest...`);
            const result: TSuccess = await DeleteRecipe(recipe._id as string);
            if (result.success) {
                toast.success(result.message);
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };

    return (
        <AlertDialog>
            {/* 🟢 variant, size, isIconOnly ইত্যাদি সরিয়ে Tailwind ক্লাস দিয়ে ট্র্যাশ বাটন স্টাইল করা হয়েছে */}
            <Button
                className="flex items-center justify-center p-0 min-w-8 w-8 h-8 rounded-lg bg-transparent hover:bg-red-500/10 text-red-500/70 hover:text-red-500 cursor-pointer transition-colors"
            >
                <FiTrash2 size={17} />
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    {/* Recipe Nest এর ডার্ক থিমের সাথে ম্যাচ করার জন্য ব্যাকগ্রাউন্ড স্টাইল যুক্ত করা হয়েছে */}
                    <AlertDialog.Dialog className="sm:max-w-100 bg-[#1c1917] border border-white/10 text-white rounded-2xl">
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
                            {/* 🟢 variant="light" সরিয়ে Tailwind ক্লাস ব্যবহার করা হয়েছে */}
                            <Button
                                slot="close"
                                className="text-white/70 hover:bg-white/5 bg-transparent font-medium rounded-xl text-xs px-4 h-9 cursor-pointer transition-colors"
                            >
                                Cancel
                            </Button>
                            
                            {/* 🟢 color="danger" সরিয়ে Tailwind-এর bg-red-600 ব্যবহার করা হয়েছে */}
                            <Button
                                slot="close"
                                onClick={handleConfirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs px-4 h-9 cursor-pointer transition-colors"
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