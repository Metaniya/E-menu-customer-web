import { useState, useRef } from 'react'
import { ChevronLeft, Camera, User, CheckCircle, AlertTriangle } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { cn } from '../../../shared/utils/cn'
import { Button } from '../../../shared/components/Button'

interface EditProfilePageProps {
  onSave?: (data: { name: string; email: string; birthday: string; photo: string }) => void
  onBack: () => void
}

export default function EditProfilePage({ onSave = () => {}, onBack }: EditProfilePageProps) {
  const { user } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [birthday, setBirthday] = useState(user?.birthday || '')
  const [photo, setPhoto] = useState(user?.photo || '')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState(false)

  const hasChanges =
    name !== (user?.name || '') ||
    email !== (user?.email || '') ||
    birthday !== (user?.birthday || '') ||
    photo !== (user?.photo || '')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email format'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    setTouched(true)
    if (!validate()) return
    onSave({ name: name.trim(), email: email.trim(), birthday, photo })
  }

  const handlePhotoPick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-semibold text-foreground">Edit Profile</h2>
          </div>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              hasChanges
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            Save
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-8 pb-12">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-muted border-2 border-border overflow-hidden">
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={40} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <button
              onClick={handlePhotoPick}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
            >
              <Camera size={14} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Tap to change photo</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setTouched(true) }}
              className={cn(
                'w-full px-4 py-3 bg-card border rounded-xl text-sm text-foreground',
                'placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors',
                errors.name && touched ? 'border-red-500/50' : 'border-border',
              )}
              placeholder="Enter your name"
            />
            {errors.name && touched && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertTriangle size={10} /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setTouched(true) }}
              className={cn(
                'w-full px-4 py-3 bg-card border rounded-xl text-sm text-foreground',
                'placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors',
                errors.email && touched ? 'border-red-500/50' : 'border-border',
              )}
              placeholder="Enter your email"
            />
            {errors.email && touched && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertTriangle size={10} /> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Phone <span className="text-muted-foreground/50">(verified)</span>
            </label>
            <div className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm text-muted-foreground flex items-center justify-between">
              <span>{user?.phone || 'Not provided'}</span>
              <CheckCircle size={14} className="text-emerald-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Birthday
            </label>
            <input
              type="date"
              value={birthday}
              onChange={e => { setBirthday(e.target.value); setTouched(true) }}
              className={cn(
                'w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground',
                'focus:outline-none focus:border-primary/50 transition-colors appearance-none',
              )}
            />
          </div>
        </div>

        {touched && hasChanges && (
          <div className="mt-6 flex items-center gap-2 px-4 py-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <AlertTriangle size={14} className="text-amber-400 shrink-0" />
            <p className="text-xs text-amber-400">
              You have unsaved changes. Don't forget to save before leaving.
            </p>
          </div>
        )}

        <div className="mt-8">
          <Button fullWidth onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
