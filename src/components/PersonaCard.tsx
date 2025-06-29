
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { Persona } from '@/types';

interface PersonaCardProps {
  persona: Persona;
  isSelected?: boolean;
  onSelect?: () => void;
  onPreview?: () => void;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
}

export const PersonaCard = ({ 
  persona, 
  isSelected, 
  onSelect, 
  onPreview,
  showCheckbox,
  isChecked,
  onCheck
}: PersonaCardProps) => {
  const handleCardClick = () => {
    if (showCheckbox && onCheck) {
      onCheck(!isChecked);
    } else if (onPreview) {
      onPreview();
    } else if (onSelect) {
      onSelect();
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md relative ${
        isSelected ? 'ring-2 ring-primary' : ''
      } ${isChecked ? 'ring-2 ring-blue-500' : ''}`}
      onClick={handleCardClick}
    >
      {showCheckbox && (
        <div className="absolute top-2 left-2 z-10" onClick={handleCheckboxClick}>
          <Checkbox 
            checked={isChecked} 
            onCheckedChange={onCheck}
            className="bg-white border-2"
          />
        </div>
      )}
      
      <CardHeader className={showCheckbox ? 'pt-8' : ''}>
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
