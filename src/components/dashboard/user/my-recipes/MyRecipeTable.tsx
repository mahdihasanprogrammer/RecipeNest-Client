"use client";

import { Table, Chip, Button, Avatar } from "@heroui/react";
import { FiEye, FiImage, FiClock } from "react-icons/fi";
import { DeleteRecipeWithModal } from "./DeleteRecipeModal";
import Link from "next/link";
import { TRecipe } from "@/types/interface";



interface RecipeTableProps {
  recipes: TRecipe[];
}

// ডিফিকাল্টি অনুযায়ী কাস্টম বর্ডার, টেক্সট এবং গ্লো ডট ক্লাসেস (বিশুদ্ধ Tailwind)
const difficultyClasses: Record<
  string,
  { border: string; text: string; bg: string; dot: string }
> = {
  easy: { border: "border-emerald-500/20", text: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
  medium: { border: "border-amber-500/20", text: "text-amber-400", bg: "bg-amber-500/10", dot: "bg-amber-400" },
  hard: { border: "border-rose-500/20", text: "text-rose-400", bg: "bg-rose-500/10", dot: "bg-rose-500" },
};

export default function MyRecipeTable({ recipes }: RecipeTableProps) {
  return (
    <div className="relative w-full bg-white/2 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-4 shadow-2xl shadow-black/50 overflow-hidden">
      {/* কার্ড ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Table
        aria-label="My Recipes Table"
        className="w-full relative z-10 text-white"
      >
        <Table.ScrollContainer className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <Table.Content className="min-w-206">
            <Table.Header>
              <Table.Column isRowHeader className="text-white/60">Recipe</Table.Column>
              <Table.Column className="text-white/60">Cuisine</Table.Column>
              <Table.Column className="text-white/60">Cook Time</Table.Column>
              <Table.Column className="text-white/60">Difficulty</Table.Column>
              <Table.Column className="text-white/60">Created At</Table.Column>
              <Table.Column className="text-right text-white/60">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {recipes.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center py-20">
                    <span className="text-white/40 text-sm font-medium">No recipes found in your nest.</span>
                  </Table.Cell>
                </Table.Row>
              ) : (
                recipes.map((recipe, index) => {
                  const difficultyLower = recipe.difficulty?.toLowerCase() || "easy";
                  const design = difficultyClasses[difficultyLower] || { 
                    border: "border-white/10", 
                    text: "text-white/70", 
                    bg: "bg-white/5", 
                    dot: "bg-white/40" 
                  };

                  return (
                    <Table.Row key={recipe._id || index} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      {/* ১. রেসিপি কভার ইমেজ + মেটা */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-11 h-11 rounded-2xl border border-white/10 flex shrink-0 bg-white/5 shadow-inner">
                            {recipe.coverImage && (
                              <Avatar.Image src={recipe.coverImage} alt={recipe.title} className="object-cover" />
                            )}
                            <Avatar.Fallback className="text-white/40 flex items-center justify-center">
                              {recipe.coverImage ? recipe.title[0]?.toUpperCase() : <FiImage size={18} />}
                            </Avatar.Fallback>
                          </Avatar>
                          <div className="overflow-hidden flex flex-col gap-0.5">
                            <p className="text-sm font-semibold text-white tracking-wide truncate max-w-50">
                              {recipe.title}
                            </p>
                            <p className="text-[11px] text-white/40 font-medium truncate max-w-50">
                              {recipe.shortDesc}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* ২. কুজিন */}
                      <Table.Cell>
                        <span className="text-white/80 font-semibold text-sm bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                          {recipe.cuisine}
                        </span>
                      </Table.Cell>

                      {/* ৩. কুক টাইম */}
                      <Table.Cell>
                        <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                          <FiClock className="w-3.5 h-3.5 text-orange-400" />
                          <span>{recipe.cookTime} Min</span>
                        </div>
                      </Table.Cell>

                      {/* ৪. ইউনিক পালস গ্লো চিপ (startContent ছাড়া) */}
                      <Table.Cell>
                        <Chip
                          className={`font-bold border px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 w-fit ${design.bg} ${design.border} ${design.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${design.dot}`} />
                          {recipe.difficulty}
                        </Chip>
                      </Table.Cell>

                      {/* ৫. ক্রিয়েটেড ডেট */}
                      <Table.Cell>
                        <span className="text-xs text-white/50 font-medium">
                          {recipe.createdAt
                            ? new Date(recipe.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                            : "N/A"
                          }
                        </span>
                      </Table.Cell>

                      {/* ৬. প্রিমিয়াম আইকন ট্রিগার্স */}
                      <Table.Cell className="text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link href={`/recipes/${recipe._id}`}>
                            <Button
                              className="p-0 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/20 rounded-xl h-8.5 w-8.5 transition-all cursor-pointer"
                            >
                              <FiEye className="w-4 h-4" />
                            </Button>
                          </Link>

                          <DeleteRecipeWithModal recipe={recipe} />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}