import type { ReactNode } from "react";

interface RetroWindowProps {
  title: string;
  stage?: string;
  className?: string;
  children: ReactNode;
}

/** 레트로 OS 창 프레임: 타이틀바(신호등 + 제목 + _ X) + 내용 + 옵션 스테이지 라벨 */
export function RetroWindow({
  title,
  stage,
  className = "",
  children,
}: RetroWindowProps) {
  return (
    <div className={`border-[4px] border-ink shadow-pixel-lg bg-pinkpale ${className}`}>
      <div className="bg-pink border-b-[3px] border-ink flex items-center gap-1.5 px-2.5 py-1.5">
        <span className="flex gap-1" aria-hidden="true">
          <span className="w-3 h-3 bg-pinkpale border-2 border-ink" />
          <span className="w-3 h-3 bg-pinkpale border-2 border-ink" />
          <span className="w-3 h-3 bg-pinkpale border-2 border-ink" />
        </span>
        <span className="font-pixel text-[8px] text-white ml-1 truncate">{title}</span>
        <span className="ml-auto font-pixel text-[7px] text-white" aria-hidden="true">
          _ X
        </span>
      </div>
      <div>{children}</div>
      {stage && (
        <div className="bg-ink px-2 py-1 font-pixel text-[7px] text-butter">
          {stage}
        </div>
      )}
    </div>
  );
}
