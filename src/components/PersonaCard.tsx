
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Persona } from '@/types';

interface PersonaCardProps {
  persona: Persona;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PersonaCard = ({ persona, isSelected, onSelect }: PersonaCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{persona.Nickname}</span>
          <div className="flex gap-2">
            <Badge variant="secondary">{persona.Age}岁</Badge>
            <Badge variant="outline">{persona.Gender}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{persona.Job}</p>
        <div className="text-sm line-clamp-3">
          {persona.persona.split('\n')[0]}
        </div>
      </CardContent>
    </Card>
  );
};
