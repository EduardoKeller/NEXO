import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface ResultCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title: React.ReactNode;
  summary?: React.ReactNode;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
}

function ResultCard({
  title,
  summary,
  badge,
  footer,
  children,
  className,
  ...props
}: ResultCardProps) {
  return (
    <Card data-slot="result-card" className={cn("w-full max-w-xl", className)} {...props}>
      <CardHeader>
        {badge ? <CardAction>{badge}</CardAction> : null}
        <CardTitle>{title}</CardTitle>
        {summary ? <CardDescription>{summary}</CardDescription> : null}
      </CardHeader>
      {children ? <CardContent className="flex flex-col gap-4">{children}</CardContent> : null}
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}

export { ResultCard };
