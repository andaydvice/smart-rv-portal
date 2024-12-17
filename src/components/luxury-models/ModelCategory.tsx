import { motion } from "framer-motion";
import { ModelDescription } from "./ModelDescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  <Accordion type="single" collapsible className="mb-6">
    <AccordionItem value={title}>
      <AccordionTrigger className="text-2xl font-semibold text-blue-400">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-4 pt-4">
          {models.map((model, index) => (
            <li key={index} className="p-4 bg-gray-700/30 rounded-lg">
              <ModelDescription {...model} />
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);