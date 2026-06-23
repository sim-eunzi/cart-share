/**
 * 상품 URL에서 사람이 읽기 좋은 사이트명(호스트네임)을 뽑는다.
 * - "www." 접두사는 제거
 * - http/https만 허용, 그 외/오류는 null
 *
 * 백엔드 CartItem에는 사이트명 필드가 없으므로 클라이언트에서 파생한다.
 */
export function getHostname(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
