import { OrderPreview } from "@/widgets/order-preview";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden items-center justify-center bg-muted p-6 lg:flex lg:p-8">
        <OrderPreview />
      </div>
    </div>
  );
};

export default AuthLayout;
