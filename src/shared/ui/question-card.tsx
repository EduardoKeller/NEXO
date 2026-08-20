import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface QuestionCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

function QuestionCard({
  title,
  description,
  footer,
  children,
  className,
  ...props
}: QuestionCardProps) {
  return (
    <Card data-slot="question-card" className={cn("w-full max-w-xl", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}

export { QuestionCard };
