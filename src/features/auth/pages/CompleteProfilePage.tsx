import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface CompleteProfilePageProps {
  onComplete: (data?: { name: string; email: string; birthday: string; photo: string }) => void
  onSkip: () => void
}

export default function CompleteProfilePage({ onComplete, onSkip }: CompleteProfilePageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [photo, setPhoto] = useState('')
  const [nameError, setNameError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) { setNameError('Full name is required'); return }
    setNameError('')
    onComplete({ name: trimmed, email, birthday, photo })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 select-none">
      <div className="flex items-center justify-between pt-6 pb-2">
        <div />
        <button
          onClick={onSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
            Complete your profile
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Help us personalise your experience
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className={cn(
              'w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors',
              photo ? 'border-primary border-solid' : 'border-border'
            )}>
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera size={28} className="text-muted-foreground" />
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background hover:bg-primary/90 transition-colors"
            >
              <Camera size={14} />
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
          <p className="text-xs text-muted-foreground mt-3">Add profile photo</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setNameError('') }}
              placeholder="John Doe"
              className={cn(
                'w-full px-4 py-3 bg-card border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors',
                nameError ? 'border-destructive' : 'border-border focus:border-primary/50'
              )}
            />
            {nameError && <p className="text-xs text-destructive mt-1">{nameError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Birthday (optional)</label>
            <input
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground outline-none focus:border-primary/50 transition-colors [color-scheme:light]"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl font-semibold text-base mt-8 bg-primary text-primary-foreground shadow-[0_4px_24px_rgba(255,238,0,0.35)] hover:bg-primary/90 transition-all active:scale-[0.97]"
        >
          Save & Continue
        </button>

        <button
          onClick={onSkip}
          className="w-full py-3 mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          I'll do this later
        </button>
      </div>
    </div>
  )
}
