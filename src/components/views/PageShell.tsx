import type { ReactNode } from "react";

/** 모든 화면 공통 컨테이너: 가운데 정렬, 최대 폭 ~680px */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center">
      {children}
    </main>
  );
}
