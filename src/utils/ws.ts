let ws: WebSocket | null = null;

export function connectWS() {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    const wsEndpoint = process.env.NEXT_PUBLIC_WS_ENDPOINT;
    if (!wsEndpoint) {
      console.error("Missing NEXT_PUBLIC_WS_ENDPOINT!");
      return;
    }
    ws = new WebSocket(wsEndpoint);
    ws.onopen = () => console.log("WebSocket connected:", wsEndpoint);
    ws.onmessage = (msg) => console.log("Dashboard WS message:", msg.data);
    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = () => console.log("WebSocket disconnected");
  }
}

export function onWS<T = unknown>(event: string, callback: (payload: T) => void) {
  console.log("Listening for event:", event);
  const listener = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data) as { event: string; payload: unknown };
      if (msg.event === event) callback(msg.payload as T);
    } catch (err) {
      console.error("WS parse error", err);
    }
  };
  ws?.addEventListener("message", listener);
  return () => ws?.removeEventListener("message", listener);
}

export function closeWS() {
  ws?.close();
  ws = null;
}