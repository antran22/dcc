import CarouselCard from "#/components/CarouselCard";
import { Combo } from "#/types";
import { formatCurrency } from "#/utils/number";
import React from "react";

interface SingleComboProps {
  combo: Combo;
}

const SingleCombo: React.FC<SingleComboProps> = ({ combo }) => {
  return (
    <CarouselCard
      title={combo.name}
      subtitle={formatCurrency(combo.price)}
      href={`combos/${combo.id}`}
      imageUrl={combo.images.length > 0 ? combo.images[0].url : undefined}
      themeColorCode={combo.theme_color_code}
    />
  );
};

export default SingleCombo;
