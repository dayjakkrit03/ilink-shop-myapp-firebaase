import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {/* Placeholder for cart items */}
          <div className="text-center text-muted-foreground h-64 flex items-center justify-center">
            Your cart is empty.
          </div>
        </div>
        <Separator />
        <SheetFooter className="mt-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>฿0.00</span>
            </div>
            <Button className="w-full">Checkout</Button>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};