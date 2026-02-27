type RadioProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const Radio = ({ label, checked, onChange }: RadioProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={label}
        name="radio-group"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-persebaya-primary focus:ring-persebaya-primary"
      />
      <label htmlFor={label} className="text-sm font-medium ">
        {label}
      </label>
    </div>
  );
};

export default Radio;
