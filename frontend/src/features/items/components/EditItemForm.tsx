import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { FC } from "react";
import { EditItemInputs } from "../api/editShoe";

const validSizes = [...Array(35).keys()].map((number) => 15 + number);

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  manufacturer: yup.string().required("Manufacturer is required"),
  price: yup.number().required("Price is required"),
  image: yup.string().url("Image must be a valid URL").nullable(),
  sizes: yup.array().of(yup.number()).required("Sizes is required"),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type EditItemFormProps = {
  onSubmit: (data: EditItemInputs) => void;
  initialValues?: EditItemInputs;
};

export const EditItemForm: FC<EditItemFormProps> = ({
  initialValues,
  ...props
}) => {
  const { handleSubmit, control } = useForm<EditItemInputs>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = handleSubmit((data: EditItemInputs) => {
    props.onSubmit(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="manufacturer"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Manufacturer"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        // defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Price"
            variant="outlined"
            margin="normal"
            type="number"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="image"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Image"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="sizes"
        control={control}
        defaultValue={[]}
        render={({ field, fieldState }) => (
          <Select
            label="Sizes"
            variant="outlined"
            fullWidth
            error={!!fieldState.error}
            multiple
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            {...field}
            onChange={(event: SelectChangeEvent<typeof validSizes>) => {
              field.onChange(event.target.value);
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {validSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Button
        sx={{ marginTop: 2 }}
        size="large"
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};
