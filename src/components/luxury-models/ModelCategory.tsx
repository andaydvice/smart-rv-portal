import { motion } from "framer-motion";
import { ModelDescription } from "./ModelDescription";

interface Model {
  name: string;
  price: string;
  descriptions: string[];
}

interface ModelCategoryProps {
  title: string;
  models: Model[];
}

export const ModelCategory = ({ title, models }: ModelCategoryProps) => (
  <div>
    <h3 className="text-2xl font-semibold text-blue-400 mb-4">{title}</h3>
    <ul className="space-y-4">
      {models.map((model, index) => (
        <li key={index} className="p-4 bg-gray-700/30 rounded-lg">
          <ModelDescription {...model} />
        </li>
      ))}
    </ul>
  </div>
);