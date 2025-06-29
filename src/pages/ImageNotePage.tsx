
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonaCard } from '@/components/PersonaCard';
import { Persona, ImageNote } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';

export const ImageNotePage = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [imageKeyword, setImageKeyword] = useState('');
  const [notes, setNotes] = useState<ImageNote[]>([]);
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
    if (!selectedPersona || !imageKeyword.trim()) {
      toast({
        title: "请完整填写信息",
        description: "请选择人设并输入图片检索关键词",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNote: ImageNote = {
        id: Date.now().toString(),
        title: "纠结折叠屏，但游戏体验让我动心",
        content: "好纠结，荣耀Magic V5要出了，听说是全球最薄折叠屏，这点真的让我很心动，尤其是游戏玩家的体验可能会很特别，虽然我从来没用过折叠屏，但感觉可以试试。\n\n期待在折叠屏的大屏上打游戏的体验，续航表现据说很不错，希望玩游戏时电量能支撑更久。内心已经偏向入手了，就是不知道这款折叠屏手机的价格如何，会不会超出预算？\n\n有点纠结，真的很期待这款折叠屏手机，大家怎么看？它会成为一款值得入手的游戏神器吗？\n\n#荣耀MagicV5 #全球最薄折叠屏 #最强AI智能体手机 #折叠机皇 #王者荣耀",
        coverTitle: "折叠屏打游戏啥体验？",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        personaId: selectedPersona.id,
        createdAt: new Date().toISOString()
      };

      setNotes(prev => [...prev, newNote]);
      setImageKeyword('');
      toast({
        title: "图文笔记生成成功",
        description: "已生成新的图文笔记",
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

  const handleDownloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "下载成功",
        description: "图片已保存到本地",
      });
    } catch (error) {
      toast({
        title: "下载失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  if (personas.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">图文笔记</h1>
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
      <h1 className="text-3xl font-bold mb-6">图文笔记</h1>
      
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

      <div className="mb-6">
        <Label htmlFor="imageKeyword">图片检索关键词</Label>
        <Input
          id="imageKeyword"
          value={imageKeyword}
          onChange={(e) => setImageKeyword(e.target.value)}
          placeholder="请输入图片检索关键词"
          className="mt-2"
        />
      </div>

      <div className="mb-6">
        <Button 
          onClick={handleGenerateNote} 
          disabled={loading || !selectedPersona || !imageKeyword.trim()}
        >
          {loading ? '生成中...' : '生成图文笔记'}
        </Button>
      </div>

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
                  <div className="text-sm whitespace-pre-wrap line-clamp-6 mb-4">
                    {note.content}
                  </div>
                  <div className="space-y-2">
                    <img 
                      src={note.imageUrl} 
                      alt="笔记配图" 
                      className="w-full h-48 object-cover rounded cursor-pointer"
                      onClick={() => window.open(note.imageUrl, '_blank')}
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadImage(note.imageUrl, `note-image-${note.id}.jpg`)}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      下载图片
                    </Button>
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
