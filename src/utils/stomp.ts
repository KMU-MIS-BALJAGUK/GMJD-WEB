export function buildStompFrame(command: string, headers: Record<string, string>, body?: string) {
  let frame = command + '\n';
  for (const key in headers) {
    frame += `${key}:${headers[key]}\n`;
  }
  frame += '\n'; // header/body 구분
  if (body) frame += body;
  frame += '\0'; // STOMP 종료
  return frame;
}
