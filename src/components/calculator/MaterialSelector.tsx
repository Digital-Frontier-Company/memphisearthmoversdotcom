
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Material {
  id: string;
  name: string;
  density: number;
  price: number;
}

interface MaterialSelectorProps {
  materials: Material[];
  selectedMaterial: string;
  depth: number;
  onMaterialChange: (materialId: string) => void;
  onDepthChange: (depth: number) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materials,
  selectedMaterial,
  depth,
  onMaterialChange,
  onDepthChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="material-select" className="text-white">Material Type</Label>
        <Select value={selectedMaterial} onValueChange={onMaterialChange}>
          <SelectTrigger id="material-select" className="w-full bg-mem-darkNavy/50 border-mem-babyBlue/40 text-white">
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent>
            {materials.map((material) => (
              <SelectItem key={material.id} value={material.id}>
                {material.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-white/60">
          Different materials have different densities and costs per ton
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <Label htmlFor="depth-slider" className="text-white">Material Depth</Label>
          <span className="text-white font-medium">{depth} inches</span>
        </div>
        
        <Slider
          id="depth-slider"
          min={1}
          max={12}
          step={0.5}
          value={[depth]}
          onValueChange={(values) => onDepthChange(values[0])}
          className="py-4"
        />
        
        <div className="flex justify-between text-xs text-white/70">
          <span>1"</span>
          <span>6"</span>
          <span>12"</span>
        </div>
        
        <div className="bg-mem-darkNavy/40 p-3 rounded border border-mem-babyBlue/30 mt-2">
          <p className="text-sm text-white/80">
            <strong>Recommended depths:</strong>
          </p>
          <ul className="text-xs text-white/70 mt-1 list-disc list-inside">
            <li>Walkways: 2-3 inches</li>
            <li>Driveways: 4-6 inches</li>
            <li>Drainage: 6-8 inches</li>
            <li>Foundation base: 8-12 inches</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MaterialSelector;
