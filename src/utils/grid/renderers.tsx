import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

export const headerNameRenderer = (
  params: GridColumnHeaderParams,
  classes: Record<"headerName", string>
) => {
  return (
    <Grid className={classes.headerName} item>
      {params.colDef.headerName}
    </Grid>
  );
};
