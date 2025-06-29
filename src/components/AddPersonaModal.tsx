
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonaData } from '@/types';

interface AddPersonaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PersonaData) => void;
  loading: boolean;
}

export const AddPersonaModal = ({ open, onOpenChange, onSubmit, loading }: AddPersonaModalProps) => {
  const [formData, setFormData] = useState<PersonaData>({
    targetAudience: '',
    numId: 60,
    numContent: 5,
    audienceCategory: '',
    referenceTags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const defaultTags = "KPOP\n徒步\n露营\n户外装备\n羽毛球\n篮球\n乒乓球\n职场穿搭\n宠物\n宠物护理\n宠物用品\n宠物日常\n综艺\n解压\n短剧\nASMR\n网络游戏\n王者荣耀\nLOL\n潮玩\n泡泡玛特\n探店\n美食\n一人食\n护肤\n彩妆\n护发\n染发\n个人提升\n旅游出行\n特种兵旅行\n语言学习\n二次元\n动漫\ncoser\n产品测评\nAI技术\nAI作图\n育儿\n家庭\n教育\n养生\n健康\n收纳\n家庭清洁\n购物\n送礼\n买房\n买车\n房贷\n车贷\n甄嬛传\n装修\n花艺\n钓鱼\n美容\n儿童健康\n海淘\n体检\n夫妻关系\n亲子游\n婆媳关系\n手游\n游戏直播\nJPOP\n孕产护理\n婴幼儿喂养\n婴幼儿用品\n舞蹈\n珠宝\n健身计划\n户外运动\n球星\n运动装备\n电竞\n电竞比赛\n英雄联盟\nKPL\nLPL\nCNCS\n无畏契约\n兼职\n恋爱关系\n穷游\n在职考公";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>添加人设</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="targetAudience">泛目标客户群体</Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              placeholder="例如：下班后自学提升"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numId">需要学习的账号数量</Label>
              <Input
                id="numId"
                type="number"
                value={formData.numId}
                onChange={(e) => setFormData({...formData, numId: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="numContent">每个账号需要学习的笔记数量</Label>
              <Input
                id="numContent"
                type="number"
                value={formData.numContent}
                onChange={(e) => setFormData({...formData, numContent: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="audienceCategory">用户画像类别</Label>
            <Input
              id="audienceCategory"
              value={formData.audienceCategory}
              onChange={(e) => setFormData({...formData, audienceCategory: e.target.value})}
              placeholder="例如：初入职场毕业生"
              required
            />
          </div>

          <div>
            <Label htmlFor="referenceTags">笔记标签</Label>
            <Textarea
              id="referenceTags"
              value={formData.referenceTags || defaultTags}
              onChange={(e) => setFormData({...formData, referenceTags: e.target.value})}
              placeholder="请输入标签，每行一个"
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '生成中...' : '生成人设'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
