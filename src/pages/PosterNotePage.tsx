
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonaCard } from '@/components/PersonaCard';
import { Persona, PosterNote } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const PosterNotePage = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [notes, setNotes] = useState<PosterNote[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // 从localStorage获取人设数据（实际项目中应该从API获取）
    const savedPersonas = localStorage.getItem('personas');
    if (savedPersonas) {
      setPersonas(JSON.parse(savedPersonas));
    }
  }, []);

  const handleGenerateNote = async () => {
    if (!selectedPersona) return;

    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNote: PosterNote = {
        id: Date.now().toString(),
        title: "纠结折叠屏，但游戏体验让我动心",
        content: "好纠结，荣耀Magic V5要出了，听说是全球最薄折叠屏，这点真的让我很心动，尤其是游戏玩家的体验可能会很特别，虽然我从来没用过折叠屏，但感觉可以试试。\n\n期待在折叠屏的大屏上打游戏的体验，续航表现据说很不错，希望玩游戏时电量能支撑更久。内心已经偏向入手了，就是不知道这款折叠屏手机的价格如何，会不会超出预算？\n\n有点纠结，真的很期待这款折叠屏手机，大家怎么看？它会成为一款值得入手的游戏神器吗？\n\n#荣耀MagicV5 #全球最薄折叠屏 #最强AI智能体手机 #折叠机皇 #王者荣耀",
        coverTitle: "折叠屏打游戏啥体验？",
        personaId: selectedPersona.id,
        createdAt: new Date().toISOString()
      };

      setNotes(prev => [...prev, newNote]);
      toast({
        title: "大字报笔记生成成功",
        description: "已生成新的大字报笔记",
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (personas.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">大字报封面笔记</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">请先生成人设后才能生产内容笔记</p>
          <Button onClick={() => navigate('/persona')}>
            前往人设生产
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">大字报封面笔记</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">选择人设</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              isSelected={selectedPersona?.id === persona.id}
              onSelect={() => setSelectedPersona(persona)}
            />
          ))}
        </div>
      </div>

      {selectedPersona && (
        <div className="mb-6">
          <Button onClick={handleGenerateNote} disabled={loading}>
            {loading ? '生成中...' : '生成大字报笔记'}
          </Button>
        </div>
      )}

      {notes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">生成的笔记</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <div className="text-lg font-medium text-primary">{note.coverTitle}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm whitespace-pre-wrap line-clamp-6">
                    {note.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
