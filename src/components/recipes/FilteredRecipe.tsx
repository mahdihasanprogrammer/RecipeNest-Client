"use client";

import { Select, ListBox, Button, SearchField } from "@heroui/react";
import { FiSliders } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";


const difficulties: string[] = ["All", "Easy", "Medium", "Hard"];
const cuisines: string[] = ["All", "Bangladeshi", "Italian", "Chinese", "Japanese", "Indian", "Mexican"];

const FilteredRecipe = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const search = formData.get("search") as string;
        const difficult = formData.get("difficult") as string;
        const cuisine = formData.get("cuisine") as string;
        const sortBy = formData.get("sortBy") as string;

        const params = new URLSearchParams(searchParams.toString());
        if (search) params.set("search", search as string);
        if (difficult !== "All") params.set("difficult", difficult as string);
        if (cuisine !== "All") params.set("cuisine", cuisine as string);
        if (sortBy) params.set("sortBy", sortBy as string);

        console.log('params', params)
        router.push(`?${params.toString() as string}`);
    };
    const handleDeleteFiltering = () => {
        router.push('?')

    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-[#0d071f]/40 border border-white/6 rounded-2xl p-4 backdrop-blur-xl flex flex-col md:flex-row items-center gap-3 shadow-xl w-full"
            >
                {/* 1. Search Input (Takes more space) */}
                <div className="w-full md:flex-1 min-w-70">
                    <SearchField
                        defaultValue={searchParams.get("search") || ""}
                        aria-label="search recipe"
                        name="search"
                    >

                        <SearchField.Group>
                            <SearchField.SearchIcon />
                            <SearchField.Input className="w-70" placeholder="Search..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                </div>

                {/* 2. Filter by Category */}
                <div className="w-full md:w-44 shrink-0">
                    <Select
                        name="difficult"
                        placeholder="Difficult"
                        defaultValue={searchParams.get("difficult") || "All"}
                        className="w-full"
                        aria-label="Filter by Difficult"
                    >
                        <Select.Trigger className="bg-[#11092c] border border-white/6 text-white rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0f0826] border border-white/10 rounded-xl text-white">
                            <ListBox>
                                {difficulties.map((difficult) => (
                                    <ListBox.Item key={difficult} id={difficult} textValue={difficult} className="hover:bg-purple-600/20 rounded-lg">
                                        {difficult}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 3. Filter by Emotional Tone */}
                <div className="w-full md:w-44 shrink-0">
                    <Select
                        name="cuisine"
                        placeholder="Cuisine"
                        defaultValue={searchParams.get("cuisine") || "All"}
                        className="w-full"
                        aria-label="Filter by Cuisine"
                    >
                        <Select.Trigger className="bg-[#11092c] border border-white/6 text-white rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0f0826] border border-white/10 rounded-xl text-white">
                            <ListBox>
                                {cuisines.map((cuisine) => (
                                    <ListBox.Item key={cuisine} id={cuisine} textValue={cuisine} className="hover:bg-purple-600/20 rounded-lg">
                                        {cuisine}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 4. Sort Options */}
                <div className="w-full md:w-44 shrink-0">
                    <Select
                        name="sortBy"
                        placeholder="Sort By"
                        aria-label="Sort Options"
                        defaultValue={searchParams.get("sortBy") || " "}
                        className="w-full"
                    >
                        <Select.Trigger className="bg-[#11092c] border border-white/6 text-white rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0f0826] border border-white/10 rounded-xl text-white">
                            <ListBox>
                                <ListBox.Item id="newest" textValue="Newest" className="hover:bg-purple-600/20 rounded-lg">Newest</ListBox.Item>
                                <ListBox.Item id="oldest" textValue="Oldest" className="hover:bg-purple-600/20 rounded-lg">Oldest</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 5. Submit Action Button */}
                <div className="w-full md:w-auto shrink-0">
                    <Button
                        type="submit"
                        className="w-full md:w-28 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-[0.98]"
                    >
                        <FiSliders className="w-4 h-4" />
                        <span>Apply</span>
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {searchParams.size > 0 && (
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}   // উপরে থাকবে
                            animate={{ y: 0, opacity: 1 }}     // নিচে নেমে আসবে
                            exit={{ y: -50, opacity: 0 }}      // আবার উপরে উঠে hide হবে
                            transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                            }}
                            className="absolute right-1/2 translate-x-1/2 -bottom-7"
                        >
                            <Button
                                onClick={handleDeleteFiltering}
                               
                                className="h-10 px-5 rounded-full bg-[#14110f]/90 backdrop-blur-xl border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400/40 hover:text-amber-200 transition-all duration-300 shadow-lg shadow-amber-900/20 cursor-pointer"
                            >
                                <IoCloseOutline className="text-lg" />
                                <span className="font-medium">Clear Filters</span>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default FilteredRecipe;