"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  RotateCcw,
} from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "What are your strongest skills?",
  "Tell me about your projects.",
  "Are you available for work?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isActive = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isActive) return;
    sendMessage({ text });
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  return (
    <>
      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="AI chat assistant"
        aria-modal="true"
        className={cn(
          "fixed bottom-24 right-6 z-50 flex flex-col w-[min(380px,calc(100vw-48px))] rounded-2xl border border-border bg-background shadow-xl transition-all duration-300 ease-in-out origin-bottom-right",
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border rounded-t-2xl bg-[#2563EB]">
          <div className="flex items-center gap-2.5">
            <div className="size-2 rounded-full bg-white/80 animate-pulse" />
            <span className="text-sm font-semibold text-white">
              Ask about Matt
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="rounded-lg p-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-3 h-full justify-center">
              <p className="text-sm text-muted-foreground text-center">
                Hi! Ask me anything about Matt&apos;s work, skills, or background.
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      sendMessage({ text: q });
                    }}
                    className="text-left text-sm px-3 py-2 rounded-lg border border-border bg-muted/50 hover:bg-muted text-foreground transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-[#2563EB] text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  {message.parts.map((part, i) => {
                    if (part.type === "text") {
                      if (message.role === "user") {
                        return (
                          <p key={i} className="whitespace-pre-wrap">
                            {part.text}
                          </p>
                        );
                      }
                      return (
                        <ReactMarkdown
                          key={i}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-2 ml-4 list-disc space-y-0.5 last:mb-0">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 ml-4 list-decimal space-y-0.5 last:mb-0">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="leading-snug">{children}</li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold">{children}</strong>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:opacity-75 transition-opacity cursor-pointer"
                              >
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="rounded bg-background/50 px-1 py-0.5 text-xs font-mono">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))
          )}

          {/* Streaming indicator */}
          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              <span className="flex-1">Something went wrong.</span>
              <button
                onClick={() => regenerate()}
                className="flex items-center gap-1 text-xs font-medium hover:underline cursor-pointer"
              >
                <RotateCcw className="size-3" />
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 pb-3">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20 transition-all duration-200"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              rows={1}
              disabled={isActive}
              aria-label="Chat input"
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50 min-h-[24px] max-h-[96px] overflow-y-auto"
              style={{ lineHeight: "1.5rem" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isActive}
              aria-label="Send message"
              className="shrink-0 flex items-center justify-center size-7 rounded-lg bg-[#2563EB] text-white transition-all duration-150 cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isActive ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Send className="size-3.5" />
              )}
            </button>
          </form>
          <p className="text-center text-[10px] text-muted-foreground/60 mt-1.5">
            Powered by Vercel AI SDK · Claude Sonnet
          </p>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full shadow-lg transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50 focus-visible:ring-offset-2",
          open
            ? "bg-foreground text-background rotate-0 scale-95"
            : "bg-[#2563EB] text-white hover:opacity-90 hover:-translate-y-0.5"
        )}
      >
        <span
          className={cn(
            "absolute transition-all duration-200",
            open ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
          )}
        >
          <X className="size-5" />
        </span>
        <span
          className={cn(
            "absolute transition-all duration-200",
            open ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
          )}
        >
          <MessageCircle className="size-5" />
        </span>
      </button>
    </>
  );
}
