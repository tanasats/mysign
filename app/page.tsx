'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";


export default function Home() {
  return (
<main>
  <h1 className="text-4xl mb-8">Home Page!</h1>
  <p className="mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, beatae. Laudantium laboriosam accusamus iure et nihil nemo atque ducimus delectus a sint qui quisquam, consequatur nam sequi neque maiores! Inventore.
  Qui et dolores porro sed consectetur. Aperiam aliquid dicta optio beatae laborum ab iusto quod molestiae corporis rem, id, ducimus itaque? Ut modi dolorum, quas atque odio nostrum facilis a.
  Perferendis distinctio cum dolor necessitatibus neque voluptate nobis recusandae odit sint nemo, reiciendis tempore ipsa? Eius excepturi labore minima nisi, tempore voluptatem beatae iure ea deserunt dolorum voluptatum tenetur ullam!
  Dignissimos quo tempora, sequi quaerat mollitia rerum commodi! Dignissimos iste fugiat, obcaecati consequuntur, aliquid dolor doloribus eum laudantium facilis, commodi enim. Est culpa vitae hic quo maxime excepturi perferendis nisi!
  Adipisci tempora architecto sunt consequuntur veniam velit, ratione rerum fugit iste quod sapiente illum consequatur eius, quasi eligendi. Iste quos veritatis ab, inventore error tempora in aspernatur ratione libero incidunt!</p>
  <Button asChild>
   <Link href="/signup">Create an account</Link>
  </Button>
 
  
</main>
  );
}
