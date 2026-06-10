import { Camera, MessageSquare} from 'lucide-react';
import { PHONE_SMS} from '../constants/contact';

export default function ClickToText({ hidden}) {
 if (hidden) return null;

 return (
 <a
 href={PHONE_SMS}
 className="fixed bottom-[4.75rem] right-3 z-20 flex max-w-[11rem] items-center gap-2.5 rounded-2xl bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-3 py-2.5 shadow-xl transition duration-200 hover:-translate-y-0.5 sm:max-w-none sm:px-4 sm:py-3 md:bottom-6"
 >
 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-shine-text">
 <MessageSquare className="h-4 w-4" />
 </div>
 <div className="min-w-0 text-left">
 <p className="text-xs font-bold text-shine-text sm:text-sm">Text Us Now</p>
 <p className="hidden text-[10px] leading-tight text-shine-text sm:block">Send photos for faster quote</p>
 </div>
 <Camera className="hidden h-4 w-4 shrink-0 text-shine-text lg:block" />
 </a>
 );
}
