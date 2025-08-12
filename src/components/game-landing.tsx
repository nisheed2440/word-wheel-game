"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Jdenticon from "react-jdenticon";

interface GameLandingProps {
  userName?: string;
  onNewGame?: () => void;
  onLeaderboard?: () => void;
  onRules?: () => void;
}

export default function GameLanding({
  userName = "User Name",
  onNewGame,
  onLeaderboard,
  onRules,
}: GameLandingProps) {
  const carouselItems = [
    {
      id: "new-game",
      title: "New Game",
      image: "/undraw_gaming_v7a6.svg",
      onClick: onNewGame,
    },
    {
      id: "leaderboard",
      title: "Leaderboard",
      image: "/undraw_powerful_e1sw.svg",
      onClick: onLeaderboard,
    },
    {
      id: "rules",
      title: "Rules",
      image: "/undraw_teaching_58yg.svg",
      onClick: onRules,
    },
  ];

  return (
    <Card className="w-full max-w-sm bg-background/95 backdrop-blur-sm shadow-2xl dark:shadow-none">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-2 border-muted">
              <Jdenticon
                value={userName + Date.now().toString() || "Player"}
                size="80"
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold">Welcome</h1>
              <p className="text-muted-foreground capitalize">{userName}</p>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="w-full">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {carouselItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-1 space-y-2">
                      <Card className="relative overflow-hidden h-48 group cursor-pointer dark:shadow-none" onClick={item.onClick}>
                        <CardContent className="p-0 h-full relative">
                          {/* Background Image */}
                          <div className="relative w-full h-full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <Button
                        onClick={item.onClick}
                        className="w-full shadow-sm cursor-pointer"
                        size="lg"
                      >
                        {item.title}
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" variant={"default"}/>
              <CarouselNext className="cursor-pointer" variant={"default"}/>
            </Carousel>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
