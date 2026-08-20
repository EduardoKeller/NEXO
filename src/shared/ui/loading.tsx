import * as React from "react";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

function Loading({ label, className, ...props }: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="loading"
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Loader2Icon className="size-6 animate-spin" aria-hidden="true" />
      {label ? <p className="text-sm">{label}</p> : <span className="sr-only">Carregando…</span>}
    </div>
  );
}

export { Loading };
