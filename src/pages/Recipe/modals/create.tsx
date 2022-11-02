import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FInput } from "components/editor/Input";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { recipeSliceActions, recipeSliceSelector } from "redux/slices/recipe";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRecipeModal() {
  const dispatch = useDispatch();
  const { isAddingRecipe } = recipeSliceSelector();

  const handleClose = () => {
    dispatch(recipeSliceActions.setIsAddingRecipe(false));
  };

  const onSubmit = async (values: any) => {
    await new Promise((r) => setTimeout(r, 3000));
    dispatch(
      recipeSliceActions.addRecipe({ id: Date.now(), title: values.title })
    );
    handleClose();
  };
  const initialValues = {
    title: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  return (
    <Dialog
      open={isAddingRecipe}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={handleClose}
    >
      <Formik
        onSubmit={onSubmit}
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <DialogTitle>{"What recipe do you want to add?"}</DialogTitle>
            <Box sx={{ height: 1 }} />
            <DialogContent>
              <FInput name="title" label="Title" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                startIcon={<Save />}
              >
                Save
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
