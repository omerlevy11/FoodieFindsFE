"use client";

import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

export default function Reviews() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The best website ever! easy to use, very comfortable multiple sites to explore.",
    name: "Steve Love",
    title: "",
  },
  {
    quote:
      "I never thought I would fine such amazing attractions in such a short time without putting so much effort.",
    name: "Larry Hamilton",
    title: "",
  },
  {
    quote:
      "All that attractions we see or seem here are but a dream within a dream.",
    name: "Mark Berger",
    title: "",
  },
  {
    quote:
      "It is undisputable that this website is the best to fins attraction or vacation",
    name: "Jane Austen",
    title: "",
  },
  {
    quote:
      "Call me Fanatic. but I am in love with this coll and modern website",
    name: "Herman Leigh",
    title: "",
  },
];
