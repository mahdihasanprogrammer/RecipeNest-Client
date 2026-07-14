"use client";

import { Table, Chip, Button, Avatar } from "@heroui/react";
import { FiEye, FiImage, FiClock } from "react-icons/fi";
import { DeleteRecipeWithModal } from "./DeleteRecipeModal";

interface Recipe {
  _id?: string;
  title: string;
  shortDesc: string;
  cookTime: string;
  difficulty: string;
  cuisine: string;
  coverImage?: string;
  createdAt?: string;
}

interface RecipeTableProps {
  recipes: Recipe[];
}

// ডিফিকাল্টি অনুযায়ী কাস্টম কালার ও গ্লো ডট লজিক
const difficultySettings: Record<
  string, 
  { color: "success" | "warning" | "danger" | "default"; dot: string }
> = {
  easy: { color: "success", dot: "bg-emerald-400" },
  medium: { color: "warning", dot: "bg-amber-400" },
  hard: { color: "danger", dot: "bg-rose-500" },
};

export default function MyRecipeTable({ recipes }: RecipeTableProps) {
  return (
    <div className="relative w-full bg-white/2 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-4  shadow-2xl shadow-black/50 overflow-hidden">
      {/* কার্ড ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Table 
        aria-label="My Recipes Table" 
        className="w-full relative z-10"
      >
        <Table.ScrollContainer className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <Table.Content className="min-w-206">
            <Table.Header>
              <Table.Column isRowHeader>Recipe</Table.Column>
              <Table.Column>Cuisine</Table.Column>
              <Table.Column>Cook Time</Table.Column>
              <Table.Column>Difficulty</Table.Column>
              <Table.Column>Created At</Table.Column>
              <Table.Column className="text-right">Actions</Table.Column>
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
                  const config = difficultySettings[difficultyLower] || { color: "default", dot: "bg-white/40" };

                  return (
                    <Table.Row key={recipe._id || index}>
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
                            <p className="text-sm font-semibold text-white tracking-wide truncate max-w-[200px]">
                              {recipe.title}
                            </p>
                            <p className="text-[11px] text-white/40 font-medium truncate max-w-[220px]">
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

                      {/* ৪. ইউনিক পালস গ্লো চিপ */}
                      <Table.Cell>
                        <Chip 
                          size="sm" 
                          variant="flat" 
                          color={config.color} 
                          className="font-bold border border-current/10"
                          startContent={
                            <span className={`w-1.5 h-1.5 rounded-full mr-1 animate-pulse ${config.dot}`} />
                          }
                        >
                          {recipe.difficulty}
                        </Chip>
                      </Table.Cell>

                      {/* ৫. ক্রিয়েটেড ডেট */}
                      <Table.Cell>
                        <span className="text-xs text-white/50 font-medium">
                          {recipe.createdAt 
                            ? new Date(recipe.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) 
                            : "N/A"
                          }
                        </span>
                      </Table.Cell>

                      {/* ৬. প্রিমিয়াম আইকন ট্র্রিগার্স */}
                      <Table.Cell className="text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Button
                            isIconOnly
                            size="sm"
                            className="bg-white/5 border border-white/10 text-white hover:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/20 rounded-xl h-8.5 w-8.5 transition-all cursor-pointer"
                            onClick={() => console.log("Viewing recipe:", recipe._id)}
                          >
                            <FiEye className="w-4 h-4" />
                          </Button>

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