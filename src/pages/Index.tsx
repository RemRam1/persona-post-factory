import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginModal } from '@/components/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, FileText, Image, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SM</span>
            </div>
            <h1 className="text-xl font-bold">社交媒体内容工厂</h1>
          </div>
          
          {user ? <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">欢迎，{user.username}</span>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </Button>
            </div> : <Button onClick={() => setShowLoginModal(true)}>
              <User className="w-4 h-4 mr-2" />
              登录
            </Button>}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">智能内容生产平台</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            通过AI技术生成个性化人设，创造高质量的社交媒体内容，让您的创作更高效、更精准
          </p>
        </div>

        {user ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/persona')}>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>人设生产</CardTitle>
                <CardDescription>
                  创建个性化的用户人设，为内容创作提供精准定位
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">开始创建人设</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/poster-note')}>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>大字报封面笔记</CardTitle>
                <CardDescription>
                  生成吸引眼球的小红书大字报风格封面笔记内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">制作大字报</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/image-note')}>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Image className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>图文笔记</CardTitle>
                <CardDescription>
                  创建小红书多图笔记内容，图片源于数据爬取
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">制作图文笔记</Button>
              </CardContent>
            </Card>
          </div> : <div className="text-center">
            <p className="text-muted-foreground mb-6">请先登录以使用所有功能</p>
            <Button onClick={() => setShowLoginModal(true)} size="lg">
              立即登录
            </Button>
          </div>}
      </main>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>;
};
export default Index;