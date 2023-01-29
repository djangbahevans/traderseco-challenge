import { useQuery } from "@tanstack/react-query";
import { getShoes } from "../api/getShoes";
import { ItemCard } from "../components/ItemCard";
import { Layout } from "../components/Layout";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";

export const ViewItemList = () => {
  // Setting query states. I should probably use useReducer here.
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<"price" | "manufacturer" | "name">(
    "price"
  );
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data } = useQuery({
    queryKey: ["shoes", search, orderBy, order, limit, page],
    queryFn: ({ signal }) => {
      const items = getShoes({
        search,
        signal,
        sort: `${orderBy}:${order}`,
        limit,
        page,
      });

      return items;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
  });

  return (
    <Layout>
      <TextField
        id="outlined-search"
        label="Search"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <Grid sx={{ marginTop: 2 }} container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Select
            label="Order by"
            variant="outlined"
            fullWidth
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value as any);
            }}
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="manufacturer">Manufacturer</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Select
            label="Order"
            variant="outlined"
            fullWidth
            value={order}
            onChange={(e) => {
              setOrder(e.target.value as any);
            }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid sx={{ marginTop: 2 }} container spacing={2}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ marginTop: 2 }} container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ToggleButtonGroup
            value={limit}
            exclusive
            onChange={(e, value) => {
              setLimit(value);
            }}
          >
            <ToggleButton value={10}>10</ToggleButton>
            <ToggleButton value={20}>20</ToggleButton>
            <ToggleButton value={50}>50</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={data && data.length < limit}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};
