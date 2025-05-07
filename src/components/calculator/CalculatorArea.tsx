
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { CornerDownLeft, Trash2, Square, Circle } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface CalculatorAreaProps {
  onAreaUpdate: (area: number) => void;
}

const CalculatorArea: React.FC<CalculatorAreaProps> = ({ onAreaUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [mode, setMode] = useState<"rectangle" | "circle" | "polygon">("rectangle");
  const [points, setPoints] = useState<Point[]>([]);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [manualArea, setManualArea] = useState<number>(100);
  const [inputMode, setInputMode] = useState<"drawing" | "manual">("drawing");

  // Grid settings
  const gridSize = 10; // 10 pixels per foot
  const gridColor = "rgba(77, 210, 255, 0.2)";

  useEffect(() => {
    // Initial area calculation
    if (inputMode === "manual") {
      onAreaUpdate(manualArea);
    } else if (mode === "rectangle") {
      onAreaUpdate(length * width);
    } else {
      calculateArea();
    }
  }, [length, width, manualArea, inputMode]);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      // Set canvas size to match container
      const container = containerRef.current;
      const canvas = canvasRef.current;
      canvas.width = container.clientWidth;
      canvas.height = 300;
      
      // Draw the grid
      drawGrid();
    }
  }, [containerRef.current, canvasRef.current]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw the shape
    if (mode === "rectangle" && length > 0 && width > 0) {
      drawRectangle(ctx);
    } else if (mode === "circle" && length > 0) {
      drawCircle(ctx);
    } else if (mode === "polygon" && points.length > 0) {
      drawPolygon(ctx);
    }
  };

  const drawRectangle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#4DD2FF";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(77, 210, 255, 0.3)";
    
    const rectWidth = length * gridSize;
    const rectHeight = width * gridSize;
    const centerX = (canvasRef.current!.width - rectWidth) / 2;
    const centerY = (canvasRef.current!.height - rectHeight) / 2;
    
    ctx.beginPath();
    ctx.rect(centerX, centerY, rectWidth, rectHeight);
    ctx.fill();
    ctx.stroke();
    
    // Draw dimensions
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px Arial";
    ctx.fillText(`${length} ft`, centerX + rectWidth / 2 - 20, centerY - 10);
    ctx.fillText(`${width} ft`, centerX - 30, centerY + rectHeight / 2);
  };

  const drawCircle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#4DD2FF";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(77, 210, 255, 0.3)";
    
    const radius = length * gridSize / 2;
    const centerX = canvasRef.current!.width / 2;
    const centerY = canvasRef.current!.height / 2;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Draw dimensions
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px Arial";
    ctx.fillText(`Diameter: ${length} ft`, centerX - 40, centerY - radius - 10);
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D) => {
    if (points.length < 1) return;
    
    ctx.strokeStyle = "#4DD2FF";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(77, 210, 255, 0.3)";
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    // Complete the shape if we have at least 3 points or are not drawing
    if (points.length >= 3 && !drawing) {
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = "#ffffff";
    for (const point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== "polygon" || inputMode !== "drawing") return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (!drawing) {
      setDrawing(true);
      setStartPoint({ x, y });
      setPoints([{ x, y }]);
    } else {
      // Check if we're close to the start point to close the shape
      const startX = startPoint!.x;
      const startY = startPoint!.y;
      const distance = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
      
      if (distance < 20 && points.length > 2) {
        // Close the shape
        setDrawing(false);
        calculateArea();
      } else {
        // Add new point
        setPoints([...points, { x, y }]);
      }
    }
  };

  const handleClear = () => {
    setPoints([]);
    setDrawing(false);
    setStartPoint(null);
    drawGrid();
  };

  const calculateArea = () => {
    let area = 0;
    
    if (mode === "rectangle") {
      area = length * width;
    } else if (mode === "circle") {
      // Area of circle = πr²
      const radius = length / 2;
      area = Math.PI * Math.pow(radius, 2);
    } else if (mode === "polygon" && points.length > 2) {
      // Calculate area using the Shoelace formula
      let sum1 = 0;
      let sum2 = 0;
      
      for (let i = 0; i < points.length; i++) {
        const nextIndex = (i + 1) % points.length;
        sum1 += points[i].x * points[nextIndex].y;
        sum2 += points[nextIndex].x * points[i].y;
      }
      
      // Convert from pixels to feet by dividing by gridSize²
      area = Math.abs(sum1 - sum2) / 2 / (gridSize * gridSize);
    }
    
    onAreaUpdate(area);
    return area;
  };

  const handleModeChange = (newMode: "rectangle" | "circle" | "polygon") => {
    setMode(newMode);
    handleClear();
    drawGrid();
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setLength(value);
      drawGrid();
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWidth(value);
      drawGrid();
    }
  };

  const handleManualAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setManualArea(value);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toggle between drawing and manual input */}
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${
            inputMode === "drawing"
              ? "bg-mem-blue text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => setInputMode("drawing")}
        >
          Draw Area
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${
            inputMode === "manual"
              ? "bg-mem-blue text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => setInputMode("manual")}
        >
          Enter Manually
        </button>
      </div>

      {inputMode === "drawing" ? (
        <>
          {/* Shape selection buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                mode === "rectangle"
                  ? "bg-mem-blue text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => handleModeChange("rectangle")}
            >
              <Square size={16} /> Rectangle
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                mode === "circle"
                  ? "bg-mem-blue text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => handleModeChange("circle")}
            >
              <Circle size={16} /> Circle
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                mode === "polygon"
                  ? "bg-mem-blue text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => handleModeChange("polygon")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              </svg>
              Custom Shape
            </button>
          </div>

          {/* Shape dimensions inputs (for rectangle and circle) */}
          {mode !== "polygon" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-white mb-1">
                  {mode === "circle" ? "Diameter (ft)" : "Length (ft)"}
                </label>
                <Input
                  id="length"
                  type="number"
                  min="1"
                  value={length}
                  onChange={handleLengthChange}
                  className="w-full bg-mem-darkNavy/50 border-mem-babyBlue/40 text-white"
                />
              </div>
              
              {mode === "rectangle" && (
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-white mb-1">
                    Width (ft)
                  </label>
                  <Input
                    id="width"
                    type="number"
                    min="1"
                    value={width}
                    onChange={handleWidthChange}
                    className="w-full bg-mem-darkNavy/50 border-mem-babyBlue/40 text-white"
                  />
                </div>
              )}
            </div>
          )}

          {/* Drawing canvas for custom polygon */}
          {mode === "polygon" && (
            <div className="mb-4">
              <p className="text-sm text-white/70 mb-2">
                {drawing
                  ? "Click to add points. Click near the starting point to complete."
                  : "Click to start drawing your area shape"}
              </p>
              <div className="relative" ref={containerRef}>
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full border border-mem-babyBlue/40 rounded-md cursor-crosshair bg-mem-darkNavy/70"
                  height="300"
                ></canvas>
                
                {/* Control buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {drawing && (
                    <button
                      type="button"
                      onClick={() => {
                        if (points.length >= 3) {
                          setDrawing(false);
                          calculateArea();
                        }
                      }}
                      className="p-2 bg-mem-blue text-white rounded-md hover:bg-mem-darkBlue"
                      title="Complete shape"
                    >
                      <CornerDownLeft size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    title="Clear drawing"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Area calculation result */}
          <div className="p-4 bg-mem-darkNavy/40 border border-mem-babyBlue/30 rounded-md">
            <p className="text-white font-medium">
              {mode === "polygon" && points.length < 3
                ? "Draw your shape to calculate area"
                : `Calculated Area: ${calculateArea().toFixed(2)} sq ft`}
            </p>
          </div>
        </>
      ) : (
        // Manual input mode
        <div className="space-y-4">
          <div>
            <label htmlFor="manualArea" className="block text-sm font-medium text-white mb-1">
              Area (sq ft)
            </label>
            <Input
              id="manualArea"
              type="number"
              min="1"
              value={manualArea}
              onChange={handleManualAreaChange}
              className="w-full bg-mem-darkNavy/50 border-mem-babyBlue/40 text-white"
            />
          </div>
          
          <div className="p-4 bg-mem-darkNavy/40 border border-mem-babyBlue/30 rounded-md">
            <p className="text-white font-medium">
              Entered Area: {manualArea.toFixed(2)} sq ft
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorArea;
