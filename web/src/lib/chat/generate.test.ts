import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateGroundedChatResponse } from "@/lib/chat/generate";

const {
  generateTextWithFallback,
  buildChatPrompt,
  loadPublishedBlueprintContext,
  parseChatModelResponse,
  retrieveMaterialContext,
  createServerSupabaseClient,
} = vi.hoisted(() => ({
  generateTextWithFallback: vi.fn(),
  buildChatPrompt: vi.fn(),
  loadPublishedBlueprintContext: vi.fn(),
  parseChatModelResponse: vi.fn(),
  retrieveMaterialContext: vi.fn(),
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/lib/ai/providers", () => ({
  generateTextWithFallback,
}));

vi.mock("@/lib/chat/context", () => ({
  buildChatPrompt,
  loadPublishedBlueprintContext,
}));

vi.mock("@/lib/chat/validation", () => ({
  parseChatModelResponse,
}));

vi.mock("@/lib/materials/retrieval", () => ({
  retrieveMaterialContext,
}));

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient,
}));

describe("generateGroundedChatResponse", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.CHAT_GENERATION_MAX_TOKENS;

    const insertMock = vi.fn(async () => ({ error: null }));
    createServerSupabaseClient.mockResolvedValue({
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });

    loadPublishedBlueprintContext.mockResolvedValue({
      blueprintId: "bp-1",
      summary: "Summary",
      topicCount: 1,
      blueprintContext: "Blueprint Context | Summary and topics",
    });
    retrieveMaterialContext.mockResolvedValue("Source 1 | Material snippet");
    buildChatPrompt.mockReturnValue({ system: "system", user: "user" });
    parseChatModelResponse.mockReturnValue({
      safety: "ok",
      answer: "Grounded response",
      citations: [{ sourceLabel: "Source 1", rationale: "Based on class material." }],
    });
  });

  it("uses a default max token budget above other generators", async () => {
    generateTextWithFallback.mockResolvedValue({
      provider: "openai",
      model: "gpt-5-mini",
      content: "{}",
      usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      latencyMs: 12,
    });

    await generateGroundedChatResponse({
      classId: "class-1",
      classTitle: "Physics",
      userId: "student-1",
      userMessage: "Can we review kinematics?",
      transcript: [],
      purpose: "student_chat_open_v2",
    });

    expect(generateTextWithFallback).toHaveBeenCalledWith(
      expect.objectContaining({
        maxTokens: 9000,
      }),
    );
  });

  it("returns a friendly message when generation throws internal redirect tokens", async () => {
    generateTextWithFallback.mockRejectedValue(new Error("NEXT_REDIRECT"));

    await expect(
      generateGroundedChatResponse({
        classId: "class-1",
        classTitle: "Physics",
        userId: "student-1",
        userMessage: "Can we review kinematics?",
        transcript: [],
        purpose: "student_chat_open_v2",
      }),
    ).rejects.toThrow("Unable to generate a chat response right now. Please try again.");
  });
});
