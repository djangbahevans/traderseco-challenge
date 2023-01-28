import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationDialog } from "../../../components/Miscellaneous/ConfirmationDialog";
import { queryClient } from "../../../libs/react-query";
import { useAuth } from "../../auth/contexts/AuthContext";
import { deleteShoe } from "../api/deleteShoe";
import { getShoe } from "../api/getShoe";
import { Layout } from "../components/Layout";

export const ViewItem = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["shoes", id],
    queryFn: () => {
      if (!id) return null;

      const item = getShoe(id);
      return item;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (!id) return null;

      const item = await deleteShoe(id);
      return item;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["shoes"]);
      navigate("/items");
    },
  });

  return (
    <Layout>
      <Typography variant="h1">{data?.name}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <img src={data?.image} alt={data?.name} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="h2">${data?.price}</Typography>
          <Typography variant="body1">Made by {data?.manufacturer}</Typography>
          <ToggleButtonGroup sx={{ marginTop: 2 }}>
            {data?.sizes.map((size) => (
              <ToggleButton key={size} value={size}>
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography sx={{ marginTop: 2 }} variant="body1">
            {data?.description}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        {user?.id === data?.ownerId && (
          <Fab
            color="secondary"
            aria-label="edit"
            onClick={() => {
              navigate(`/items/${data?.id}/edit`);
            }}
          >
            <EditIcon />
          </Fab>
        )}
        {user?.id == data?.ownerId && (
          <Fab color="error" aria-label="delete" onClick={() => setOpen(true)}>
            <DeleteIcon />
          </Fab>
        )}
      </Box>
      <ConfirmationDialog
        onCancel={() => setOpen(false)}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          mutateAsync();
          setOpen(false);
        }}
        content="Are you sure you want to delete this item?"
        title="Delete Item"
      />
    </Layout>
  );
};
