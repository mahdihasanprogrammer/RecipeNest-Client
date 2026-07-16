"use client";

import { useState, FormEvent } from "react";
import { Input, TextArea, TextField, Button, Select, Label, ListBox, FieldError, Form } from "@heroui/react";
import { FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { TRecipe, TUser } from "@/types/interface";
import { createRecipe } from "@/lib/actions/recipes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

const BASE_INPUT_CLASS = "bg-[#14110f] border border-white/10 hover:border-orange-500/50 focus:!border-orange-500 text-white placeholder:text-white/40 rounded-xl px-3 py-2 transition-all";
const LIST_ITEM_CLASS = "p-2 hover:bg-orange-500/20 data-[hover=true]:bg-orange-500/20 rounded-lg cursor-pointer transition-colors text-white";

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const CUISINE_OPTIONS = ["Bangladeshi", "Italian", "Chinese", "Japanese", "Indian", "Mexican"];

type AddRecipeFormProps = {
    user: TUser;
};

export default function AddRecipeForm({ user }: AddRecipeFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // ডাইনামিক ফিল্ডের ট্র্যাক রাখার জন্য মিনিমাল স্টেট
    const [ingredients, setIngredients] = useState<string[]>([""]);
    const [steps, setSteps] = useState<string[]>([""]);

    const handleDynamicChange = (type: "ing" | "step", index: number, value: string) => {
        if (type === "ing") {
            const updated = [...ingredients];
            updated[index] = value;
            setIngredients(updated);
        } else {
            const updated = [...steps];
            updated[index] = value;
            setSteps(updated);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            const rawData: TRecipe = {
                title: String(formData.get("title") ?? ""),
                shortDesc: String(formData.get("shortDesc") ?? ""),
                fullDesc: String(formData.get("fullDesc") ?? ""),
                cookTime: String(formData.get("cookTime") ?? ""),
                servings: String(formData.get("servings") ?? ""),
                difficulty: String(formData.get("difficulty") ?? ""),
                cuisine: String(formData.get("cuisine") ?? ""),
                coverImage: String(formData.get("coverImage") ?? ""),
                ingredients: formData.getAll("ingredients").map(String),
                steps: formData.getAll("steps").map(String),
                creatorName: user?.name ?? "",
                creatorEmail: user?.email ?? "",
                creatorId: user?.id ?? "",
                creatorImage: user?.image ?? "",
            };

            const result = await createRecipe(rawData as TRecipe);

            if (result.success) {
                toast.success(result.message);
                router.push('/dashboard/user/my-recipes');
                e.currentTarget.reset();
                setSteps([""]);
                setIngredients([""]);
                
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="space-y-6 bg-[#1c1917]/80 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md">

            {/* Title Input */}
            <TextField isRequired validate={(v) => (v.trim() === "" ? "Title is required." : null)} className="flex flex-col gap-2 w-full">
                <Label className="text-sm font-medium text-white/70">Recipe Title</Label>
                <Input name="title" placeholder="e.g., Smoked Salmon Benedict" className={BASE_INPUT_CLASS} />
                <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Short Description */}
            <TextField isRequired validate={(v) => (v.trim() === "" ? "Short description is required." : null)} className="flex flex-col gap-2 w-full">
                <Label className="text-sm font-medium text-white/70">Short Description</Label>
                <Input name="shortDesc" placeholder="A brief catchy baseline about your dish..." className={BASE_INPUT_CLASS} />
                <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Full Description */}
            <TextField isRequired validate={(v) => (v.trim() === "" ? "Full description is required." : null)} className="flex flex-col gap-2 w-full">
                <Label className="text-sm font-medium text-white/70">Full Cooking Blueprint / Story</Label>
                <TextArea name="fullDesc" rows={4} placeholder="Describe the detailed molecular process, texture profiles, and history..." className={`${BASE_INPUT_CLASS} resize-none`} />
                <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* DYNAMIC LIST: INGREDIENTS */}
            <div className="space-y-3">
                <Label className="text-sm font-medium text-white/70 block">Ingredients List</Label>
                {ingredients.map((ingredient, index) => (
                    <TextField
                        aria-label="ingredients list"
                        key={`ing-${index}`}
                        isRequired
                        validate={(v) => (v.trim() === "" ? "This ingredient field cannot be empty." : null)}
                        className="flex flex-col gap-1 w-full"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <Input
                                name="ingredients"
                                placeholder={`Ingredient #${index + 1}`}
                                className={BASE_INPUT_CLASS}
                                value={ingredient}
                                onChange={(e) => handleDynamicChange("ing", index, e.target.value)}
                            />
                            <Button
                                type="button"
                                className="rounded-xl min-w-10 w-10 h-10 border border-red-500/20 bg-red-600 hover:bg-red-700 p-0 flex items-center justify-center text-white cursor-pointer transition-colors"
                                onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                                isDisabled={ingredients.length === 1}
                            >
                                <FiTrash2 size={16} />
                            </Button>
                        </div>
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>
                ))}
                <Button 
                    type="button" 
                    className="border border-orange-500/30 text-orange-400 bg-transparent hover:bg-orange-500 hover:text-white rounded-xl px-4 py-2 flex items-center gap-2 text-xs cursor-pointer transition-all" 
                    onClick={() => setIngredients([...ingredients, ""])}
                >
                    <FiPlus /> Add Ingredient
                </Button>
            </div>

            {/* DYNAMIC LIST: STEPS */}
            <div className="space-y-3">
                <Label className="text-sm font-medium text-white/70 block">Preparation Steps</Label>
                {steps.map((step, index) => (
                    <TextField
                        aria-label="preparation steps"
                        key={`step-${index}`}
                        isRequired
                        validate={(v) => (v.trim() === "" ? "This preparation step cannot be empty." : null)}
                        className="flex flex-col gap-1 w-full"
                    >
                        <div className="flex items-start gap-3 w-full">
                            <TextArea
                                name="steps"
                                rows={2}
                                placeholder={`Step #${index + 1}: Describe execution dynamics...`}
                                className={`${BASE_INPUT_CLASS} resize-none`}
                                value={step}
                                onChange={(e) => handleDynamicChange("step", index, e.target.value)}
                            />
                            <Button
                                type="button"
                                className="rounded-xl min-w-10 w-10 h-10 border border-red-500/20 mt-1 bg-red-600 hover:bg-red-700 p-0 flex items-center justify-center text-white cursor-pointer transition-colors"
                                onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                                isDisabled={steps.length === 1}
                            >
                                <FiTrash2 size={16} />
                            </Button>
                        </div>
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>
                ))}
                <Button 
                    type="button" 
                    className="border border-orange-500/30 text-orange-400 bg-transparent hover:bg-orange-500 hover:text-white rounded-xl px-4 py-2 flex items-center gap-2 text-xs cursor-pointer transition-all" 
                    onClick={() => setSteps([...steps, ""])}
                >
                    <FiPlus /> Add Step Line
                </Button>
            </div>

            {/* Grid Layout for Meta Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField isRequired validate={(v) => (v.trim() === "" ? "Cook time is required." : null)} className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium text-white/70">Cook Time (e.g., 45 mins)</Label>
                    <Input name="cookTime" placeholder="45 mins" className={BASE_INPUT_CLASS} />
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                <TextField isRequired validate={(v) => (isNaN(Number(v)) || Number(v) <= 0 ? "Servings must be a positive number." : null)} className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium text-white/70">Servings Count</Label>
                    <Input name="servings" placeholder="4" className={BASE_INPUT_CLASS} />
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
            </div>

            {/* Select fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Difficulty Select */}
                <Select
                    name="difficulty"
                    aria-labelledby="difficulty-label"
                    className="flex flex-col gap-2 text-white w-full"
                    isRequired
                    validate={(v) => (!v ? "Please select a difficulty level." : null)}
                >
                    <Label id="difficulty-label" className="text-sm font-medium text-white/70">Difficulty</Label>
                    <Select.Trigger className="border border-white/10 hover:border-orange-500/50 focus-within:!border-orange-500 text-white bg-[#14110f] h-10 px-3 rounded-xl flex items-center justify-between w-full cursor-pointer transition-all">
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <FieldError className="text-xs text-red-500 mt-1" />
                    <Select.Popover className="w-[--trigger-width] bg-[#14110f] border border-white/10 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
                        <ListBox className="p-1 text-white bg-transparent" aria-label="Difficulty Options">
                            {DIFFICULTY_OPTIONS.map((level) => (
                                <ListBox.Item key={level} id={level} textValue={level} className={LIST_ITEM_CLASS}>
                                    <Label className="cursor-pointer !text-white">{level}</Label>
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Cuisine Select */}
                <Select
                    name="cuisine"
                    aria-labelledby="cuisine-label"
                    className="flex flex-col gap-2 text-white w-full"
                    isRequired
                    validate={(v) => (!v ? "Please select a cuisine type." : null)}
                >
                    <Label id="cuisine-label" className="text-sm font-medium text-white/70">Cuisine</Label>
                    <Select.Trigger className="border border-white/10 hover:border-orange-500/50 focus-within:!border-orange-500 text-white bg-[#14110f] h-10 px-3 rounded-xl flex items-center justify-between w-full cursor-pointer transition-all">
                        <Select.Value/>
                        <Select.Indicator />
                    </Select.Trigger>
                    <FieldError className="text-xs text-red-500 mt-1" />
                    <Select.Popover className="w-[--trigger-width] bg-[#14110f] border border-white/10 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
                        <ListBox className="p-1 text-white bg-transparent" aria-label="Cuisine Options">
                            {CUISINE_OPTIONS.map((origin) => (
                                <ListBox.Item key={origin} id={origin} textValue={origin} className={LIST_ITEM_CLASS}>
                                    <Label className="cursor-pointer !text-white">{origin}</Label>
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

            </div>

            {/* Cover Image URL Field */}
            <TextField validate={(v) => (v.trim() && !URL_REGEX.test(v) ? "Please enter a valid URL." : null)} className="flex flex-col gap-2 w-full">
                <Label className="text-sm font-medium text-white/70">Cover Image URL (Optional)</Label>
                <Input name="coverImage" placeholder="https://images.unsplash.com/your-recipe-image.jpg" className={BASE_INPUT_CLASS} />
                <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Submit Button */}
            <div className="pt-4">
                <Button 
                    type="submit" 
                    isDisabled={loading} 
                    className="w-full bg-linear-to-r from-orange-600 to-amber-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-orange-600/10 hover:opacity-95 cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2 border-0"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Publishing...
                        </span>
                    ) : (
                        <>
                            Submit & Publish Recipe
                            <FiCheckCircle />
                        </>
                    )}
                </Button>
            </div>

        </Form>
    );
}