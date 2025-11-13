import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn: Tailwind 클래스를 조건부로 병합하는 함수
 * clsx와 tailwind-merge를 함께 사용해서
 * 중복된 Tailwind 클래스 자동 정리
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
