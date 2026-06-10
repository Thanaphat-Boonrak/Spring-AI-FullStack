import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<string[]>([
    "สวัสดีครับ มีอะไรให้ช่วยไหม?",
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages((prev) => [...prev, currentInput]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8080/ask-ai", {
        params: {
          message: currentInput,
        },
      });

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      if (error instanceof Error) {
        setMessages((prev) => [...prev, "เกิดข้อผิดพลาดในการเชื่อมต่อ AI"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-zinc-950 flex flex-col text-white">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold">Spring AI Chat</h1>
          <p className="text-zinc-400 text-sm">Gemini Assistant</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 space-y-6">
          {messages.map((message, index) => {
            const isUser = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-3xl
                    px-5
                    py-4
                    rounded-3xl
                    shadow-lg
                    whitespace-pre-wrap
                    break-words
                    leading-relaxed
                    ${
                      isUser
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-900 border border-zinc-800"
                    }
                  `}
                >
                  {message}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-5xl mx-auto p-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  sendMessage();
                }
              }}
              placeholder="พิมพ์ข้อความ..."
              className="
                flex-1
                bg-zinc-900
                border
                border-zinc-700
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-blue-500
              "
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="
                px-6
                py-4
                bg-blue-600
                hover:bg-blue-700
                rounded-2xl
                font-semibold
                transition
                disabled:opacity-50
              "
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
