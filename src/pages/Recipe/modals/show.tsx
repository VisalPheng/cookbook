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
import React from "react";
import { useDispatch } from "react-redux";
import { recipeSliceActions, recipeSliceSelector } from "redux/slices/recipe";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowRecipeModal() {
  const dispatch = useDispatch();
  const { selectedRecipe } = recipeSliceSelector();

  const handleClose = () => {
    dispatch(recipeSliceActions.selectRecipe(null));
  };

  return (
    <Dialog
      open={!!selectedRecipe}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={handleClose}
    >
      <DialogTitle>{"Detail of the recipe:"}</DialogTitle>
      <Box sx={{ height: 1 }} />
      <DialogContent>{selectedRecipe.title}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
