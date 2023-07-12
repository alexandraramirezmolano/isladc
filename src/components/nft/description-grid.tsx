const DescriptionGrid = ({ title, text }: { title: string; text: any }) => {
  return (
    <div className="bg-graybrand h-30 p-3 rounded-sm">
      <p className="text-gray-900">{title}</p>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default DescriptionGrid;
