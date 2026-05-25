import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSectionContent } from "@/hooks/useSectionContent";
import { useTrackCTA } from "@/hooks/useTrackCTA";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const quickQuestions = [
	"Quero conhecer o Plano Essencial",
	"Preciso de implantação financeira",
	"Quero saber sobre licença de software",
	"Tenho dúvidas sobre os serviços",
];

const WhatsAppButton = () => {
	const { content: settings } = useSectionContent("global_settings");
	const trackCTA = useTrackCTA();
	const number = settings.whatsappNumber || WHATSAPP_NUMBER;
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const sendMessage = (text: string) => {
		trackCTA("whatsapp_chat");
		window.open(
			`https://wa.me/${number}?text=${encodeURIComponent(text)}`,
			"_blank",,
    );
    setOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-80 rounded-xl overflow-hidden shadow-2xl border border-border"
          >
            {/* Header */}
            <div className="bg-[hsl(142,70%,30%)] px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">ProtechX</p>
                <p className="text-white/70 text-xs">
                  Normalmente responde em minutos
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white/70 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat body */}
            <div className="bg-[hsl(30,20%,95%)] p-4 min-h-[200px]">
              {/* Bot message */}
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%] mb-4">
                <p className="text-sm text-foreground font-medium mb-1">
                  Olá! 👋
                </p>
                <p className="text-sm text-muted-foreground">
                  Como podemos ajudar? Selecione uma opção ou escreva sua
                  mensagem:
                </p>
              </div>

              {/* Quick questions */}
              <div className="space-y-2 mb-4">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg border border-[hsl(142,70%,40%)]/30 bg-white hover:bg-[hsl(142,70%,95%)] hover:border-[hsl(142,70%,40%)]/60 transition-all text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim()) sendMessage(message.trim());
              }}
              className="bg-white border-t border-border flex items-center gap-2 px-3 py-3"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-9 h-9 rounded-full bg-[hsl(142,70%,40%)] flex items-center justify-center text-white hover:brightness-110 transition-all disabled:opacity-40"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-16 h-16 rounded-full bg-[hsl(142,70%,40%)] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Fale pelo WhatsApp"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,40%)] animate-ping opacity-20" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-[hsl(142,70%,40%)]/40 animate-pulse" />

        <svg
          className="w-8 h-8 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" 
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
								</svg>
							</button>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Floating button */}
			<button
				onClick={() => setOpen(!open)}
				className="relative w-16 h-16 rounded-full bg-[hsl(142,70%,40%)] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
				aria-label="Fale pelo WhatsApp"
			>
				{/* Pulse rings */}
				<span className="absolute inset-0 rounded-full bg-[hsl(142,70%,40%)] animate-ping opacity-20" />
				<span className="absolute inset-[-4px] rounded-full border-2 border-[hsl(142,70%,40%)]/40 animate-pulse" />

				<svg
					className="w-8 h-8 text-white relative z-10"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>

				{/* Notification badge */}
				{!open && (
					<motion.span
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center z-20"
					>
						<span className="text-[10px] font-bold text-white">1</span>
					</motion.span>
				)}
			</button>
		</div>
	);
};

export default WhatsAppButton;
