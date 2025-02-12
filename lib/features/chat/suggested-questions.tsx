import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function SuggestedQuestions({
  title,
  onClick,
}: {
  title: string | null;
  onClick: (question: string) => void;
}) {
  const suggestedQuestions = [
    `Summarize ${title}`,
    "Who are the protagonist and antagonists?",
    "Are there any romantic relationships in the book?",
    "Is this a true story?",
    "How far into the the book does the climax occur? Describe it.",
    "Are there any plot twists?",
  ];

  return (
    <Alert>
      <AlertTitle className="text-muted-foreground mb-6">
        Chat with <strong>{title}</strong>
        <br />
        <br />
        Here are some questions to get you started
      </AlertTitle>
      <AlertDescription>
        <div className="flex flex-row flex-wrap w-fit gap-3">
          {suggestedQuestions.map((question) => (
            <Badge
              className="cursor-pointer hover:bg-accent-foreground hover:text-accent"
              key={question}
              variant="secondary"
              onClick={() => onClick(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
}
