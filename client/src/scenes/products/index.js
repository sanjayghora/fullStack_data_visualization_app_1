import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  state,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log(state);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography varient="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
          <Collapse
            in={isExpanded}
            timeout="auto"
            unmountOnExit
            sx={{ color: theme.palette.neutral[300] }}
          >
            <CardContent>
              <Typography>id: {_id}</Typography>
              <Typography>Supply Left: {supply}</Typography>
              <Typography>
                yearly Sales This year: {state.yearlySalesTotal}
              </Typography>
              <Typography>
                Yearly Units Sold This Year: {state.yearlyTotalSoldUnits}
              </Typography>
            </CardContent>
          </Collapse>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  // console.log(data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              state,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                state={state}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}
