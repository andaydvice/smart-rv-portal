interface ModelItemProps {
  name: string;
  price: string;
}

const AdventureModelItem = ({ name, price }: ModelItemProps) => (
  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
    <h3 className="text-lg font-medium text-blue-200">
      {name}
    </h3>
    <p className="text-gray-300 mt-1">
      Starting at {price}
    </p>
  </div>
);

export default AdventureModelItem;