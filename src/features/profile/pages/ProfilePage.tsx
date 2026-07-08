import {
  ChevronRight, User, Phone, Mail, Globe,
  Bell, Heart, HelpCircle, MessageCircle, FileText,
  Shield, LogOut, Edit3, Package,
} from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { cn } from '../../../shared/utils/cn'

interface ProfilePageProps {
  onNavigate: (screen: string) => void
  onLogout?: () => void
  onEdit?: () => void
  onFavorites?: () => void
  onSettings?: () => void
}

interface SectionItem {
  icon: typeof User
  label: string
  value?: string
  screen: string
}

export default function ProfilePage({ onNavigate, onLogout = () => {} }: ProfilePageProps) {
  const { user } = useApp()
  if (!user) return null

  const sections: { title: string; items: SectionItem[] }[] = [
    { title: 'Account', items: [
      { icon: Phone, label: 'Phone', value: user.phone, screen: 'edit-profile' },
      { icon: Mail, label: 'Email', value: user.email, screen: 'edit-profile' },
    ]},
    { title: 'Preferences', items: [
      { icon: Globe, label: 'Language', value: user.language === 'am' ? 'Amharic' : 'English', screen: 'language' },
      { icon: Bell, label: 'Notifications', screen: 'notification-settings' },
    ]},
    { title: 'Saved', items: [
      { icon: Heart, label: 'Favorites', value: `${user.favorites.length} saved`, screen: 'favorites' },
    ]},
    { title: 'Support', items: [
      { icon: HelpCircle, label: 'Help Center', screen: 'help' },
      { icon: MessageCircle, label: 'Contact Us', screen: 'contact' },
    ]},
    { title: 'About', items: [
      { icon: FileText, label: 'Terms of Service', screen: 'terms' },
      { icon: Shield, label: 'Privacy Policy', screen: 'privacy' },
      { icon: Package, label: 'Version', value: '1.0.0', screen: '' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-[var(--container-max)] mx-auto px-4 pt-8 pb-6 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-4 mb-8 lg:flex-col lg:text-center">
            <div className="relative shrink-0">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-muted border-2 border-border overflow-hidden">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={28} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <button onClick={() => onNavigate('edit-profile')}
                className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Edit3 size={11} />
              </button>
            </div>
            <div className="lg:mt-2">
              <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>{user.name}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
            </div>
          </div>

          <button onClick={onLogout}
            className="hidden lg:flex w-full py-3.5 rounded-2xl border border-red-500/20 text-red-400 font-medium text-sm hover:bg-red-500/5 transition-colors items-center justify-center gap-2">
            <LogOut size={16} /> Log Out
          </button>
        </div>

        <div>
          {sections.map(section => (
            <div key={section.title} className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2 px-1">
                {section.title}
              </p>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {section.items.map((item, idx) => (
                  <button key={item.label} onClick={() => item.screen && onNavigate(item.screen)} disabled={!item.screen}
                    className={cn('w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/30',
                      idx < section.items.length - 1 && 'border-b border-border/50')}>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <item.icon size={15} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      {item.value && <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.value}</p>}
                    </div>
                    {item.screen && <ChevronRight size={15} className="text-muted-foreground shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={onLogout}
            className="lg:hidden w-full py-3.5 rounded-2xl border border-red-500/20 text-red-400 font-medium text-sm hover:bg-red-500/5 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 mt-4">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
