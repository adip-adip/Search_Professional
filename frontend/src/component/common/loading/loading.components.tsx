import { Spinner } from "flowbite-react";

export const LoadingSize = {
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
} as const;

export type LoadingSize = (typeof LoadingSize)[keyof typeof LoadingSize];

interface LoadingComponentProps {
  size?: LoadingSize;
  className?: string; // ✅ add this
}

const LoadingComponent = ({
  size = LoadingSize.MD,
  className = ""
}: LoadingComponentProps) => {
  return (
    <Spinner
      aria-label="Center-aligned spinner example"
      size={size}
      className={className} // ✅ apply it here
    />
  );
};

export default LoadingComponent;
