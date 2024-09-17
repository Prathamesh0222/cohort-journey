import { useState } from "react";

type FieldType = "radio" | "checkbox" | "text";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  options?: string[];
  checked?: boolean;
  selectedOption?: string;
}

const FormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");
  const [newFieldOptions, setNewFieldOptions] = useState("");

  const addField = () => {
    if (!newFieldLabel) return;

    const newField: FormField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: newFieldLabel,
      options:
        newFieldType === "radio"
          ? newFieldOptions.split(",").map((e) => e.trim())
          : undefined,
      checked: newFieldType === "checkbox" ? false : undefined,
    };

    setFields([...fields, newField]);
    setNewFieldLabel("");
    setNewFieldType("text");
    setNewFieldOptions("");
  };

  const handleCheckboxChange = (index: number) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, checked: !field.checked } : field
    );
    setFields(updatedFields);
  };

  const handleRadioChange = (index: number, option: string) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, selectedOption: option } : field
    );
    setFields(updatedFields);
  };

  return (
    <div className="container flex flex-col justify-center h-screen p-4 mx-auto">
      <h1 className="text-4xl font-bold text-center">Form Builder</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-2 mt-8 border rounded-lg">
          <h2 className="px-2 pb-6 text-2xl font-semibold">Add New Field</h2>
          <div className="pb-2 text-sm font-semibold">Field Label</div>
          <input
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            placeholder="Enter the text"
            className="w-full p-2 pl-2 mb-2 overflow-hidden border rounded-lg"
          />
          <label htmlFor="fieldType" className="text-sm font-semibold">
            Field Type
          </label>
          <div>
            <div className="flex mt-2 space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="text"
                  value="text"
                  name="fieldType"
                  checked={newFieldType === "text"}
                  onChange={() => setNewFieldType("text")}
                  className="scale-150"
                />
                <label htmlFor="text">Text</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="checkbox"
                  value="checkbox"
                  name="fieldType"
                  checked={newFieldType === "checkbox"}
                  onChange={() => setNewFieldType("checkbox")}
                  className="scale-150"
                />
                <label htmlFor="checkbox">Checkbox</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="radio"
                  value="radio"
                  name="fieldType"
                  checked={newFieldType === "radio"}
                  onChange={() => setNewFieldType("radio")}
                  className="scale-150"
                />
                <label htmlFor="radio">Radio</label>
              </div>
            </div>
            {newFieldType === "radio" && (
              <div className="my-2">
                <label className="text-sm font-semibold" htmlFor="fieldOptions">
                  Options (comma-separated)
                </label>
                <input
                  id="fieldOptions"
                  value={newFieldOptions}
                  onChange={(e) => setNewFieldOptions(e.target.value)}
                  placeholder="Option 1, Option 2, Option 3"
                  className="w-full p-2 mt-2 border rounded-lg"
                />
              </div>
            )}
            <button
              onClick={addField}
              className="w-full p-2 mt-6 text-white rounded-lg bg-neutral-950 hover:bg-neutral-900"
            >
              Add Field
            </button>
          </div>
        </div>

        <div className="p-2 mt-8 border rounded-lg">
          <h2 className="px-2 pb-5 text-2xl font-semibold">Form Preview</h2>

          {fields.map((field, index) => (
            <div key={field.id}>
              {field.type === "text" && (
                <div>
                  <label className="text-sm font-semibold" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    className="w-full p-2 mt-2 border rounded-lg"
                    id={field.id}
                    placeholder={`Enter ${field.label}`}
                  />
                </div>
              )}
              {field.type === "checkbox" && (
                <div className="flex items-center my-2 space-x-2">
                  <input
                    type="checkbox"
                    id={field.id}
                    checked={field.checked}
                    onChange={() => handleCheckboxChange(index)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={field.id} className="text-sm">
                    {field.label}
                  </label>
                </div>
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option, i) => (
                    <div key={i} className="flex items-center my-2 space-x-2">
                      <input
                        type="radio"
                        id={`${field.id}-${i}`}
                        value={option}
                        name={field.id}
                        checked={field.selectedOption === option}
                        onChange={() => handleRadioChange(index, option)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`${field.id}-${i}`} className="text-sm">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
