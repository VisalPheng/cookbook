import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

type RecipeCardProps = {
  text: string;
  id: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onSelect: (id: number) => void;
};

export default function RecipeCard({ data }: { data: RecipeCardProps }) {
  const { id, text, onDelete, onEdit, onSelect } = data;

  return (
    <Stack
      sx={{
        backgroundColor: "primary.main",
        borderRadius: 1,
        p: 1,
        zIndex: 8,
      }}
      direction="row"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Typography
        noWrap
        variant="h6"
        onClick={() => onSelect(id)}
        sx={{
          "&:hover": { opacity: 0.8 },
          transition: "all 0.1s ease-in-out",
          cursor: "pointer",
        }}
      >
        {text}
      </Typography>
      <Stack direction="row" alignItems={"center"}>
        <IconButton onClick={() => onEdit(id)}>
          <Edit sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => onDelete(id)}>
          <Delete sx={{ color: "red" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
