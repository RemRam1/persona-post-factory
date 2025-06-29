
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PersonaCard } from '@/components/PersonaCard';
import { AddPersonaModal } from '@/components/AddPersonaModal';
import { Persona, PersonaData } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const PersonaPage = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddPersona = async (data: PersonaData) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟返回的人设数据
      const newPersona: Persona = {
        id: Date.now().toString(),
        Nickname: "阿北",
        Age: "35",
        Gender: "男性",
        Job: "乡村养老照护者",
        persona: "# 一、基础画像信息\n\n阿北，35岁男性，目前主要致力于在乡村照顾父母和维持家庭生活。拥有稳定的家庭结构，有孩子（双胞胎），同时也养有宠物。具备一定的数字技术应用能力，能熟练运用AI等新技术进行创作。\n\n生活重心围绕家庭、传统节日氛围营造以及乡村生活质量的提升。热衷于分享家庭生活的温馨时刻，尤其是关于子女成长、节日团圆的点滴。同时也表现出对传统文化（如生肖、山海经等）与现代科技结合的浓厚兴趣。",
        createdAt: new Date().toISOString()
      };

      setPersonas(prev => [...prev, newPersona]);
      setShowAddModal(false);
      toast({
        title: "人设生成成功",
        description: `已生成人设：${newPersona.Nickname}`,
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">人设生产</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加人设
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} />
        ))}
      </div>

      {personas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">还没有创建任何人设</p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            创建第一个人设
          </Button>
        </div>
      )}

      <AddPersonaModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddPersona}
        loading={loading}
      />
    </div>
  );
};
