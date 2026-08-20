import Link from "next/link";

import { buttonVariants } from "@/shared/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="font-heading text-2xl font-medium">NEXO</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Uma avaliação rápida para entender seus padrões comportamentais e receber um plano de
        evolução personalizado.
      </p>
      <Link href="/assessment" className={buttonVariants()}>
        Iniciar Avaliação
      </Link>
    </main>
  );
}
