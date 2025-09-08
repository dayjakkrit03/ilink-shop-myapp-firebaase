import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const MessageChat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button size="icon" className="rounded-full h-14 w-14 shadow-lg bg-gradient-primary">
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  );
};