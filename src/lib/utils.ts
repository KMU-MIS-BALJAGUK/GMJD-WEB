import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // 한국 시간으로 맞추기
  const KST_OFFSET = 9 * 60;
  const localDate = new Date(date.getTime() + KST_OFFSET * 60 * 1000);
  const localNow = new Date(now.getTime() + KST_OFFSET * 60 * 1000);

  // 날짜 경계 (년/월/일만 비교)
  const d1 = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
  const d2 = new Date(localNow.getFullYear(), localNow.getMonth(), localNow.getDate());

  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // 오늘
  if (diffDays === 0) {
    const hours = localDate.getHours();
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    const h = hours % 12 || 12; // 0 → 12

    return `${h}:${minutes}`;
  }

  // 어제
  if (diffDays === 1) return '어제';

  // N일 전 (1주일 이내)
  if (diffDays <= 7) return `${diffDays}일 전`;

  // YY.MM.DD
  const y = String(localDate.getFullYear()).slice(2);
  const m = String(localDate.getMonth() + 1).padStart(2, '0');
  const d = String(localDate.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function formatDateOnly(dateString: string): string {
  const date = new Date(dateString);

  // 한국시간 반영
  const local = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const y = String(local.getFullYear()).slice(2);
  const m = String(local.getMonth() + 1).padStart(2, '0');
  const d = String(local.getDate()).padStart(2, '0');

  return `${y}.${m}.${d}`;
}

export function formatTimeOnly(dateString: string): string {
  const date = new Date(dateString);

  // 한국 시간으로 변환 (UTC → KST)
  const local = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const hours = String(local.getHours()).padStart(2, '0');
  const minutes = String(local.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}
