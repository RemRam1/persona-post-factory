import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PersonaCard } from '@/components/PersonaCard';
import { Persona, PosterNote } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Copy } from 'lucide-react';

export const PosterNotePage = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersonas, setSelectedPersonas] = useState<Set<string>>(new Set());
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

  const handlePersonaSelect = (personaId: string) => {
    const newSelected = new Set(selectedPersonas);
    if (newSelected.has(personaId)) {
      newSelected.delete(personaId);
    } else {
      newSelected.add(personaId);
    }
    setSelectedPersonas(newSelected);
  };

  const handleGenerateNote = async () => {
    if (selectedPersonas.size === 0) {
      toast({
        title: "无法生成笔记",
        description: "请至少选择一个人设",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 获取选中的人设列表
      const selectedPersonasList = personas.filter(persona => selectedPersonas.has(persona.id));
      
      // 为每个选中的人设生成一篇独立的帖子
      const newNotes: PosterNote[] = selectedPersonasList.map(persona => {
        return {
          id: Date.now().toString() + '-' + persona.id,
          title: `${persona.Nickname}：纠结折叠屏，但游戏体验让我动心`,
          content: "好纠结，荣耀Magic V5要出了，听说是全球最薄折叠屏，这点真的让我很心动，尤其是游戏玩家的体验可能会很特别，虽然我从来没用过折叠屏，但感觉可以试试。\n\n期待在折叠屏的大屏上打游戏的体验，续航表现据说很不错，希望玩游戏时电量能支撑更久。内心已经偏向入手了，就是不知道这款折叠屏手机的价格如何，会不会超出预算？\n\n有点纠结，真的很期待这款折叠屏手机，大家怎么看？它会成为一款值得入手的游戏神器吗？\n\n#荣耀MagicV5 #全球最薄折叠屏 #最强AI智能体手机 #折叠机皇 #王者荣耀",
          coverTitle: "折叠屏打游戏啥体验？",
          personaId: persona.id,
          createdAt: new Date().toISOString()
        };
      });

      setNotes(prev => [...prev, ...newNotes]);
      toast({
        title: "大字报笔记生成成功",
        description: `已为${selectedPersonas.size}个人设各生成一篇大字报笔记`,
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

  const handleCopyContent = (note: PosterNote) => {
    // 构建要复制的内容格式
    const contentToCopy = `${note.title}\n\n${note.content}`;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(contentToCopy).then(
      () => {
        toast({
          title: "复制成功",
          description: "内容已复制到剪贴板，可直接粘贴到小红书",
        });
      },
      () => {
        toast({
          title: "复制失败",
          description: "请手动复制内容",
          variant: "destructive",
        });
      }
    );
  };

  if (personas.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">大字报封面笔记</h1>
          <Separator className="mt-4" />
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">请先生成人设后才能生产内容笔记</p>
          <Button onClick={() => navigate('/persona')} className="bg-slate-950 hover:bg-slate-800">
            前往人设生产
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">大字报封面笔记</h1>
        <Separator className="mt-4" />
      </div>
      
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">选择人设</h2>
          <p className="text-sm text-muted-foreground mt-1">可多选人设进行内容生成（每个人设将生成独立的笔记）</p>
          <Separator className="mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              isSelected={selectedPersonas.has(persona.id)}
              onSelect={() => handlePersonaSelect(persona.id)}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Button 
          onClick={handleGenerateNote} 
          disabled={loading || selectedPersonas.size === 0}
          className="bg-slate-950 hover:bg-slate-800"
        >
          {loading ? '生成中...' : `生成大字报笔记 (已选${selectedPersonas.size}个人设)`}
        </Button>
      </div>

      {notes.length > 0 && (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">生成的笔记</h2>
            <Separator className="mt-2" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {notes.map((note) => {
              // 找到对应的人设信息
              const persona = personas.find(p => p.id === note.personaId);
              
              return (
                <Card key={note.id} className="max-w-4xl">
                  <CardHeader className="pb-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">笔记标题</div>
                        <CardTitle className="text-xl">{note.title}</CardTitle>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">封面标题</div>
                        <div className="text-lg font-semibold text-primary bg-primary/5 px-3 py-2 rounded-md">
                          {note.coverTitle}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">正文内容</div>
                        <Separator className="mb-4" />
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {note.content}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          生成时间: {new Date(note.createdAt).toLocaleString()}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleCopyContent(note)}
                        >
                          <Copy className="w-4 h-4" />
                          一键复制粘贴到小红书
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
