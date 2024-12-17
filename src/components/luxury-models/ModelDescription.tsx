import { motion } from "framer-motion";

interface ModelDescriptionProps {
  name: string;
  price: string;
  descriptions: string[];
}

export const ModelDescription = ({ name, price, descriptions }: ModelDescriptionProps) => (
  <div className="space-y-4">
    <h4 className="text-xl font-semibold text-blue-400 flex justify-between items-center">
      <span>{name}</span>
      <span>{price}</span>
    </h4>
    <div className="space-y-2">
      {descriptions.map((desc, index) => (
        <p key={index} className="text-gray-300">{desc}</p>
      ))}
    </div>
  </div>
);