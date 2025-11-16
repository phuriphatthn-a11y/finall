import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

const Animation = () => {
  const fieldWidth = 700;
  const fieldHeight = 400;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;
  const vx = 5;
  const vy = 5;

  const [running, setRunning] = useState(false);
  const [ballType, setBallType] = useState("none");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const goRight = useRef(true);
  const goDown = useRef(true);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        // X axis
        if (goRight.current) {
          newX += vx;
          if (newX >= maxX) goRight.current = false;
        } else {
          newX -= vx;
          if (newX <= 0) goRight.current = true;
        }

        // Y axis
        if (goDown.current) {
          newY += vy;
          if (newY >= maxY) goDown.current = false;
        } else {
          newY -= vy;
          if (newY <= 0) goDown.current = true;
        }

        return { x: newX, y: newY };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [running, maxX, maxY]);

  const getBallStyle = () => {
    if (ballType === "none") {
      return { backgroundColor: "gray" };
    }

    const imageMap = {
      basketball: "bass.jpg",
      football: "ball.jpg",
      volleyball: "voll.jpg",
      human: "human.jpg",
      cartoon: "cartoon.jpg",
    };

    const imageFile = imageMap[ballType];

    if (!imageFile) {
      return { backgroundColor: "gray" };
    }

    return {
      backgroundImage: `url('/pic/${imageFile}')`,
      backgroundColor: "transparent",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const ballOptions = [
    { label: "None", value: "none" },
    { label: "Basketball", value: "basketball" },
    { label: "Football", value: "football" },
    { label: "Volleyball", value: "volleyball" },
    { label: "Human", value: "human" },
    { label: "Cartoon", value: "cartoon" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Animation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Field */}
          <div
            className="relative border-2 border-gray-300 mx-auto"
            style={{ width: `${fieldWidth}px`, height: `${fieldHeight}px` }}
          >
            <div
              className="absolute rounded-full transition-all duration-50"
              style={{
                width: `${ballDiameter}px`,
                height: `${ballDiameter}px`,
                left: `${position.x}px`,
                top: `${position.y}px`,
                ...getBallStyle(),
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={() => setRunning(!running)}>
              {running ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </>
              )}
            </Button>

            {ballOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={ballType === opt.value ? "default" : "outline"}
                onClick={() => setBallType(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Animation;
