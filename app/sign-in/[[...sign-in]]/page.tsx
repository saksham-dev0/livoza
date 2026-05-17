import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#021210] flex flex-col items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#3E6B4F]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#e3bf5f]/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-[#3E6B4F]/20 border border-[#3E6B4F]/40 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e3bf5f] animate-pulse" />
          <span className="text-[#e3bf5f] text-xs font-medium tracking-widest uppercase">Livoza</span>
        </div>
        <h1 className="text-4xl font-bold text-[#EAEAEA] mb-2 font-playfair">
          Welcome Back
        </h1>
        <p className="text-white/40 text-sm mb-8">Sign in to your Livoza account</p>
        <SignIn />
      </div>
    </div>
  )
}
