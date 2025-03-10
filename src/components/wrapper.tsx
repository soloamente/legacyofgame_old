import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

const Wrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn(
        "w-full flex flex-col items-center py-[130px] pb-10 animate-fadeInUp max-[400px]:px-4 max-sm:px-8 max-2xl:px-12 overflow-hidden",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
);

Wrapper.displayName = "Wrapper";
export { Wrapper };
