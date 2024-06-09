import React from "react";
import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";

interface CustomDateTimePickerModalProps extends DateTimePickerProps {
  isVisible?: boolean;
  mode?: "date" | "time" | "datetime";
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const CustomDateTimePickerModal: React.FC<CustomDateTimePickerModalProps> = ({
  isVisible = false,
  mode = "date",
  onConfirm,
  onCancel,
  ...props
}) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    />
  );
};

export default CustomDateTimePickerModal;
