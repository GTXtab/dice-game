import { jest, describe, beforeEach, it, expect } from "@jest/globals";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useDiceGame } from "./useDiceGame";
import { MAX_HISTORY_LENGTH } from "@/utils/const";

const mockFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;
global.fetch = mockFetch;

function mockFetchOnce(
  response: { result: number; isWin: boolean },
  ok = true,
) {
  mockFetch.mockResolvedValueOnce({
    ok,
    json: async () => response,
  } as Response);
}

describe("useDiceGame", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("sets the default initial values", () => {
    const { result } = renderHook(() => useDiceGame());

    expect(result.current.threshold).toBe("50");
    expect(result.current.condition).toBe("greater");
    expect(result.current.history).toEqual([]);
    expect(result.current.lastResult).toBeNull();
  });

  it("Does not allow playback if the threshold is outside the range of 1–100", async () => {
    const { result } = renderHook(() => useDiceGame());

    act(() => {
      result.current.setThreshold("150");
    });

    expect(result.current.canPlay).toBe(false);
    expect(result.current.isButtonDisabled).toBe(true);

    await act(async () => {
      await result.current.play();
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });
  it("sends the threshold and condition to /api/roll and logs the result", async () => {
    mockFetchOnce({ result: 73, isWin: true });

    const { result } = renderHook(() => useDiceGame());

    act(() => {
      result.current.setThreshold("40");
      result.current.setCondition("greater");
    });

    await act(async () => {
      await result.current.play();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/roll",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ threshold: 40, condition: "greater" }),
      }),
    );

    await waitFor(() => {
      expect(result.current.lastResult).toEqual(
        expect.objectContaining({ result: 73, isWin: true, threshold: 40 }),
      );
    });
  });

  it("limits the history to a maximum of 10 items", async () => {
    const { result } = renderHook(() => useDiceGame());

    for (let i = 0; i < MAX_HISTORY_LENGTH + 3; i++) {
      mockFetchOnce({ result: i + 1, isWin: true });
      await act(async () => {
        await result.current.play();
      });
    }

    expect(result.current.history).toHaveLength(MAX_HISTORY_LENGTH);
    expect(result.current.history[0].result).toBe(MAX_HISTORY_LENGTH + 3);
  });

  it("sets `error` if the server returned an error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "threshold must be a number between 1 and 100",
      }),
    } as Response);

    const { result } = renderHook(() => useDiceGame());

    await act(async () => {
      await result.current.play();
    });

    expect(result.current.error).toBe(
      "threshold must be a number between 1 and 100",
    );
  });
});
