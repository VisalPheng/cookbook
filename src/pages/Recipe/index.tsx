import { Add } from "@mui/icons-material";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { varFadeInRight } from "components/animate";
import RecipeCard from "components/RecipeCard";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { recipeSliceActions, recipeSliceSelector } from "redux/slices/recipe";
import CreateRecipeModal from "./modals/create";
import EditRecipeModal from "./modals/edit";

export default function Recipe() {
  const dispatch = useDispatch();
  const { recipes } = recipeSliceSelector();

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        zIndex: 10,
        top: 80,
        bottom: 80,
        width: "400px",
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Stack sx={{ width: "100%", height: "100%" }} spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "primary.main",
            p: 2,
          }}
        >
          <Typography variant="h4">Recipe App</Typography>
          <IconButton
            onClick={() => dispatch(recipeSliceActions.setIsAddingRecipe(true))}
          >
            <Add sx={{ color: "white" }} />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            backgroundColor: "background.paper",
            px: 1,
            overflow: "auto",
          }}
          spacing={1}
          className="overflow-hidden"
        >
          <AnimatePresence>
            {recipes.map((recipe) => (
              <motion.div key={recipe.id} {...varFadeInRight}>
                <RecipeCard
                  data={{
                    id: recipe.id,
                    text: recipe.title,
                    onDelete: () => {
                      console.log("onDelete: ", recipe.id);
                      dispatch(recipeSliceActions.deleteRecipe(recipe.id));
                    },
                    onEdit: () => {
                      console.log("onEdit: ", recipe.id);
                      dispatch(recipeSliceActions.editRecipe(recipe.id));
                    },
                    onSelect: () => {
                      console.log("onSelect: ", recipe.id);
                      dispatch(recipeSliceActions.selectRecipe(recipe.id));
                    },
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </Stack>
      <CreateRecipeModal />
      <EditRecipeModal />
    </Paper>
  );
}
