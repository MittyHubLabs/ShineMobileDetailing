import { MessageCircle} from 'lucide-react';
import { PHONE_DISPLAY} from '../constants/contact';

export default function LiveChatPlaceholder() {
 return (
 <button
 type="button"
 className="fixed bottom-20 right-4 z-20 hidden items-center gap-2 rounded-full bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-4 py-3 text-sm font-medium text-shine-text shadow-lg transition hover:-translate-y-0.5 hover:text-brand md:bottom-6 md:flex"
 onClick={() => alert(`Live chat coming soon. Call ${PHONE_DISPLAY} or book online in the meantime.`)}
 >
 <MessageCircle className="h-5 w-5 text-shine-text" />
 Ask a question
 </button>
 );
}
