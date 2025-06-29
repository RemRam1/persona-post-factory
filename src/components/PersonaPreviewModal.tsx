
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Persona } from '@/types';

interface PersonaPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  persona: Persona | null;
}

export const PersonaPreviewModal = ({ open, onOpenChange, persona }: PersonaPreviewModalProps) => {
  const navigate = useNavigate();

  if (!persona) return null;

  const handleNextStep = (type: 'poster' | 'image') => {
    localStorage.setItem('selectedPersona', JSON.stringify(persona));
    navigate(type === 'poster' ? '/poster-note' : '/image-note');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <span>{persona.Nickname}</span>
            <div className="flex gap-2">
              <Badge variant="secondary">{persona.Age}岁</Badge>
              <Badge variant="outline">{persona.Gender}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">职业</h4>
            <p className="text-sm">{persona.Job}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">人设详情</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {persona.persona}
              </pre>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleNextStep('poster')}
            className="flex-1"
          >
            生成大字报笔记
          </Button>
          <Button 
            onClick={() => handleNextStep('image')}
            className="flex-1"
          >
            生成图文笔记
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
