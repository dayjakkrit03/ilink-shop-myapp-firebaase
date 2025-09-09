"use client";

import { useState } from "react";
import { MessageCircle, Send, Gift, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock conversation list
const conversations = [
  {
    id: 1,
    shopName: "Fucos",
    lastMessage: "[Voucher] เข้ามาโปรโมชั่นเลิศ ตี ลิสต์พิเศษ ก่อนใคร คลิกเลย!",
    timestamp: "10:00",
    unreadCount: 2,
    avatar: "🛒"
  },
  {
    id: 2,
    shopName: "KMAIXA STRAP STORE",
    lastMessage: "[Voucher] เข้ามาโปรโมชั่นเลิศ ตี ลิสต์พิเศษ ก่อนใคร คลิกเลย!",
    timestamp: "yesterday",
    unreadCount: 0,
    avatar: "📱"
  },
  {
    id: 3,
    shopName: "endless holiday",
    lastMessage: "🔥ลิสตุ้คๆโหมด🔥มีคือสวม สลคพิ เซ สำหรับการสั่งซื้อคร่าวแรกกับ...",
    timestamp: "yesterday", 
    unreadCount: 1,
    avatar: "🏖️"
  },
  {
    id: 4,
    shopName: "Sun Phone",
    lastMessage: "❤️TOP❤️สสนียมิษากๆ ล่มล่าตี้ และไดรับการร์ว...",
    timestamp: "yesterday",
    unreadCount: 1,
    avatar: "☀️"
  }
];

// Mock messages for selected conversation
const conversationMessages = {
  1: [
    {
      id: 1,
      type: "text",
      content: "สวัสดีครับ! ยินดีต้อนรับสู่ร้านอุปกรณ์เครือข่าย",
      sender: "shop",
      timestamp: "09:30",
      senderName: "Fucos"
    },
    {
      id: 2,
      type: "coupon",
      content: "คูปองส่วนลด 10% สำหรับลูกค้าใหม่", 
      discount: "10%",
      code: "NEW10",
      sender: "shop",
      timestamp: "09:35",
      senderName: "Fucos"
    }
  ],
  2: [
    {
      id: 1,
      type: "text",
      content: "เข้ามาโปรโมชั่นชั่นเลิศ ตี ลิสต์พิเศษ ก่อนใคร คลิกเลย!",
      sender: "shop", 
      timestamp: "10:15",
      senderName: "KMAIXA STRAP STORE"
    },
    {
      id: 2,
      type: "product",
      content: "ชุดสายและเคสแบบ2 In 1สำหรับการนำกิตต์",
      price: "฿83.18",
      imageUrl: "/lovable-uploads/78cf201b-eda1-430e-b6e9-e00fc17054a4.png",
      sender: "shop",
      timestamp: "10:20", 
      senderName: "KMAIXA STRAP STORE"
    }
  ]
};

export const MessageChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [messages, setMessages] = useState(conversationMessages[1] || []);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCount] = useState(3);

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
    setMessages(conversationMessages[conversationId] || []);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        type: "text" as const,
        content: newMessage,
        sender: "user" as const,
        timestamp: new Date().toLocaleTimeString('th-TH', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        senderName: "คุณ"
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const selectedShop = conversations.find(c => c.id === selectedConversation);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed right-4 bottom-4 z-50 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 border-2 border-background"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:w-[500px] md:w-[700px] lg:w-[800px] sm:max-w-[90vw] p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messages
          </SheetTitle>
          <SheetDescription className="sr-only">
            หน้าต่างแชทสำหรับสนทนากับร้านค้าและดูข้อความ
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column - Conversation List - Hidden on mobile */}
          <div className="hidden sm:block w-80 border-r bg-muted/20">
            <ScrollArea className="h-full">
              <div className="p-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="text-2xl">{conversation.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{conversation.shopName}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs min-w-[18px] h-[18px] rounded-full p-0 flex items-center justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column - Chat Messages */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Mobile dropdown menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="sm:hidden">
                        <Menu className="h-4 w-4 mr-2" />
                        <span className="text-sm">{selectedShop?.shopName}</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 max-h-[300px] overflow-y-auto bg-background border shadow-lg z-50">
                      {conversations.map((conversation) => (
                        <DropdownMenuItem
                          key={conversation.id}
                          onClick={() => handleConversationSelect(conversation.id)}
                          className="p-3 cursor-pointer hover:bg-muted focus:bg-muted"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="text-lg">{conversation.avatar}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-sm truncate">{conversation.shopName}</h4>
                                <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
                            </div>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs min-w-[16px] h-[16px] rounded-full p-0 flex items-center justify-center">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* Desktop shop name */}
                  <h3 className="font-semibold hidden sm:block">{selectedShop?.shopName}</h3>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                      <div className="text-xs opacity-70 mb-1">{message.senderName}</div>
                      
                      {message.type === 'text' && (
                        <p className="text-sm">{message.content}</p>
                      )}
                      
                      {message.type === 'coupon' && (
                        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Gift className="h-4 w-4" />
                            <span className="font-bold">Seller Voucher</span>
                          </div>
                          <div className="text-lg font-bold">B{message.discount}</div>
                          <p className="text-xs mb-2">ค่าป่าง่าน</p>
                          <div className="bg-white/20 rounded px-2 py-1 text-center">
                            <span className="font-mono text-sm">{message.code}</span>
                          </div>
                          <Button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                            Collect
                          </Button>
                        </div>
                      )}

                      {message.type === 'product' && (
                        <div className="bg-white rounded-lg p-3 shadow-sm border">
                          <div className="flex gap-3">
                            <img 
                              src={(message as any).imageUrl} 
                              alt="Product"
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 mb-1">{message.content}</p>
                              <p className="text-orange-500 font-bold">{(message as any).price}</p>
                            </div>
                          </div>
                          <Button className="w-full mt-3 bg-orange-100 text-orange-600 hover:bg-orange-200 border border-orange-300">
                            View More Product
                          </Button>
                        </div>
                      )}
                      
                      <div className="text-xs opacity-60 mt-2">{message.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="border-t p-4 bg-background">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ShoppingBag className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="พิมพ์ข้อความ..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};