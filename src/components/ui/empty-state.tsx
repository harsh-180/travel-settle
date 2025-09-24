import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "gradient" | "outline";
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="text-center py-16">
      <CardContent>
        <div className="w-16 h-16 mx-auto mb-6 text-muted-foreground">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        {action && (
          <Button onClick={action.onClick} variant={action.variant || "default"}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}