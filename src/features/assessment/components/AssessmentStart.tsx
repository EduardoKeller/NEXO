import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface AssessmentStartProps {
  questionCount: number;
  onStart: () => void;
}

export function AssessmentStart({ questionCount, onStart }: AssessmentStartProps) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Avaliação de Padrões de Produtividade</CardTitle>
        <CardDescription>
          {questionCount} perguntas rápidas para entender seus padrões comportamentais e receber um
          plano de evolução personalizado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não existem respostas certas ou erradas. Responda com o que representa melhor o seu
          comportamento habitual.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onStart}>Iniciar Avaliação</Button>
      </CardFooter>
    </Card>
  );
}
