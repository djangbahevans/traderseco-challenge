import { useQuery } from "@tanstack/react-query";
import { getShoes } from "../api/getShoes";
import { ItemCard } from "../components/ItemCard";
import { Layout } from "../components/Layout";
import Grid from "@mui/material/Grid";

export const ViewItemList = () => {
  const { data } = useQuery({
    queryKey: ["shoes"],
    queryFn: () => {
      const items = getShoes();

      return items;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
  });

  return (
    <Layout>
      <Grid container spacing={2}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
