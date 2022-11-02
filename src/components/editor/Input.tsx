import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/lab";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  styled,
  Switch,
  SwitchProps,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { FastField } from "formik";
import { capitalize } from "lodash";
import React from "react";
import MapPicker from "react-google-map-picker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import UploadMultiFile from "components/upload/UploadMultiFile";
import UploadSingleFile from "components/upload/UploadSingleFile";
import Editor from "./Editor";
import UploadAvatar from "components/upload/UploadAvatar";

const styles = {
  FInputContainer: {
    width: "100%",
    padding: "16px",
    marginBottom: "16px",
  },
};

export const FInputContainer = ({
  title,
  children,
  inputSpacing,
  ...other
}: any) => {
  return (
    <Stack
      elevation={2}
      component={Paper}
      style={styles.FInputContainer}
      {...other}
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Stack direction="column" spacing={inputSpacing || 2}>
        {children}
      </Stack>
    </Stack>
  );
};

export const FInput = ({ name, label, password = false, ...other }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <TextField
          fullWidth
          type={!password ? "text" : "password"}
          size="small"
          label={capitalize(label || name)}
          error={!!meta.error}
          helperText={meta.error}
          {...field}
          {...other}
        />
      )}
    </FastField>
  );
};

export const FAutocomplete = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Autocomplete
          fullWidth
          size="small"
          id={`${name}-${label}`}
          options={options}
          value={field.value}
          onChange={(e: any, value: any) => form.setFieldValue(name, value)}
          getOptionLabel={(option: any) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={capitalize(label || name)}
              placeholder={capitalize(label || name)}
              error={!!meta.error}
              helperText={meta.error}
            />
          )}
        />
      )}
    </FastField>
  );
};

export const FSelectAutocomplete = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Autocomplete
          fullWidth
          size="small"
          id={`${name}-${label}`}
          options={options}
          value={field.value}
          onChange={(e: any, value: any) => form.setFieldValue(name, value)}
          getOptionLabel={(option: any) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={capitalize(label || name)}
              placeholder={capitalize(label || name)}
              error={!!meta.error}
              helperText={meta.error}
            />
          )}
        />
      )}
    </FastField>
  );
};

export const FMultiSelectAutocomplete = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Autocomplete
          multiple
          fullWidth
          size="small"
          id={`${name}-${label}`}
          options={options?.filter(
            (option: any) =>
              !field.value?.some((item: any) => item.value === option.value)
          )}
          disableCloseOnSelect
          value={field.value}
          onChange={(e: any, value: any) => form.setFieldValue(name, value)}
          getOptionLabel={(option: any) => option.label}
          // renderOption={(props, option, { selected }) => (
          //   <li {...props}>
          //     <Checkbox
          //       icon={<CheckBoxOutlineBlank fontSize="small" />}
          //       checkedIcon={<CheckBox fontSize="small" />}
          //       style={{
          //         marginRight: 8,
          //       }}
          //       checked={selected}
          //     />
          //     {option.label}
          //   </li>
          // )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={capitalize(label || name)}
              placeholder={capitalize(label || name)}
              error={!!meta.error}
              helperText={meta.error}
            />
          )}
        />
      )}
    </FastField>
  );
};

export const FSelect = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <FormControl fullWidth size="small" error={!!meta.error}>
          <InputLabel id={`${name}-${label}`}>
            {options
              ? options.length > 0
                ? `Select ${capitalize(label || name)}`
                : "No Options Available"
              : "Loading..."}
          </InputLabel>
          <Select
            disabled={!options || options.length === 0}
            labelId={`${name}-${label}`}
            id={`${name}-${label}-select`}
            label={
              options
                ? options.length > 0
                  ? `Select ${capitalize(label || name)}`
                  : "No Options Available"
                : "Loading..."
            }
            value={field.value}
            {...field}
          >
            {options &&
              options.length > 0 &&
              options.map((option: any) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
          </Select>

          {!!meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
      )}
    </FastField>
  );
};

export const FCheckBox = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Stack>
          <FormControl
            error={meta.error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel
              component="legend"
              sx={{ color: !!meta.error ? "red" : "inherit" }}
            >
              {capitalize(label || name)}
            </FormLabel>
            <FormGroup>
              {options &&
                options.length > 0 &&
                options.map((option: { value: any; label: any }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value.includes(option.value)}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          if (!field.value.includes(option.value)) {
                            form.setFieldValue(name, [
                              ...field.value,
                              option.value,
                            ]);
                          } else {
                            form.setFieldValue(
                              name,
                              field.value.filter(
                                (value: any) => value !== option.value
                              )
                            );
                          }
                        }}
                        name={option.label}
                      />
                    }
                    label={option.label}
                  />
                ))}
            </FormGroup>
            {!!meta.error && (
              <FormHelperText sx={{ color: "red" }}>
                {meta.error}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      )}
    </FastField>
  );
};

export const FRadio = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <Stack>
          <FormControl>
            <FormLabel
              id={`id-${name}-${label}`}
              sx={{ color: !!meta.error ? "red" : "inherit" }}
            >
              {capitalize(label || name)}
            </FormLabel>
            <RadioGroup
              row={false}
              aria-labelledby={`id-${name}-${label}`}
              name={`row-radio-buttons-group-${name}-${label}`}
            >
              {options &&
                options.length > 0 &&
                options.map((option: { value: any; label: any }) => (
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
            </RadioGroup>
            {!!meta.error && (
              <FormHelperText sx={{ color: "red" }}>
                {meta.error}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      )}
    </FastField>
  );
};

export const FMap = ({ name }: any) => {
  const defaultLocation = {
    lat: 11.5932959,
    lng: 104.9087607,
  };
  const [zoom, setZoom] = React.useState(13);

  function handleChangeZoom(newZoom: any) {
    setZoom(newZoom);
  }

  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Stack>
          <MapPicker
            defaultLocation={defaultLocation}
            zoom={zoom}
            style={{ height: "550px", borderRadius: "5px" }}
            onChangeLocation={(lat: any, lng: any) =>
              form.setFieldValue(name, { lat, lng })
            }
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
            {...field}
          />
          {!!meta.error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                m: "14px 8px 0px",
              }}
            >
              {meta.error}
            </Typography>
          )}
        </Stack>
      )}
    </FastField>
  );
};

function valuetext(value: any) {
  return `${value}%`;
}

export const FSlide = ({ name, label, max, type }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <Stack direction="column" sx={{ width: "100%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{capitalize(label || name)}</Typography>
            <Typography>
              {field.value}
              {type && type}
            </Typography>
          </Stack>
          <Slider
            size="small"
            getAriaValueText={valuetext}
            step={5}
            max={max}
            {...field}
            valueLabelDisplay="auto"
          />

          {!!meta.error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                m: "14px 8px 0px",
              }}
            >
              {meta.error}
            </Typography>
          )}
        </Stack>
      )}
    </FastField>
  );
};

export const FDate = ({ name, label }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={capitalize(label || name)}
            views={["day", "month", "year"]}
            value={field.value}
            onChange={(newValue) => {
              form.setFieldValue(name, newValue);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                size={"small"}
                {...params}
                error={!!meta.error}
                helperText={meta.error}
              />
            )}
          />
        </LocalizationProvider>
      )}
    </FastField>
  );
};

export const FTime = ({ name, label }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label={capitalize(label || name)}
            value={field.value}
            onChange={(newValue) => {
              form.setFieldValue(name, newValue);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                size={"small"}
                {...params}
                error={!!meta.error}
                helperText={meta.error}
              />
            )}
          />
        </LocalizationProvider>
      )}
    </FastField>
  );
};

export const FDatetime = ({ name, label }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label={capitalize(label || name)}
            value={field.value}
            onChange={(newValue) => {
              form.setFieldValue(name, newValue);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                size={"small"}
                {...params}
                error={!!meta.error}
                helperText={meta.error}
              />
            )}
          />
        </LocalizationProvider>
      )}
    </FastField>
  );
};

export const FFile = ({ name, label, multiple = false, ...other }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <>
          {multiple ? (
            <UploadMultiFile
              files={field.value}
              error={meta.error}
              onDropAccepted={(files, event) => {
                form.setFieldValue(name, [...field.value, ...files]);
              }}
              onRemove={(file) => {
                form.setFieldValue(
                  name,
                  field.value.filter((f) => f !== file)
                );
              }}
              onRemoveAll={() => {
                form.setFieldValue(name, []);
              }}
              {...other}
            />
          ) : (
            <UploadMultiFile
              files={field.value}
              error={meta.error}
              onDropAccepted={(files, event) => {
                form.setFieldValue(name, files);
              }}
              onRemove={(file) => {
                form.setFieldValue(name, []);
              }}
              multiple={false}
              singleFileOnly
              {...other}
            />
          )}
          {!!meta.error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                m: "14px 8px 0px",
              }}
            >
              {meta.error}
            </Typography>
          )}
        </>
      )}
    </FastField>
  );
};

export const FSwitch = ({ name, label, ...other }: any) => {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography variant="body2">{capitalize(label || name)}</Typography>
          <IOSSwitch
            sx={{ m: 1 }}
            defaultChecked={field.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              form.setFieldValue(name, event.target.checked);
            }}
          />
        </Stack>
      )}
    </FastField>
  );
};

export const FEditor = ({ name, label, ...other }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Editor
          label={capitalize(label || name)}
          value={field.value}
          onChange={(newValue) => form.setFieldValue(name, newValue)}
          error={!!meta.error}
          helperText={meta.error}
          {...other}
        />
      )}
    </FastField>
  );
};

export const FAvatar = ({ name, label, ...other }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <UploadAvatar
          file={field.value}
          error={meta.error}
          onDropAccepted={(files, event) => {
            form.setFieldValue(name, files[0]);
          }}
          {...other}
        />
      )}
    </FastField>
  );
};

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
