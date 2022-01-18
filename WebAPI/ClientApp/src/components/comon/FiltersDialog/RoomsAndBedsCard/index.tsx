import { Typography, Box, IconButton } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { FC } from "react";

interface IRoomsAndBedsCard {
    name: string,
    value: string | null,
    setValue: any,
}


const RoomsAndBedsCard: FC<IRoomsAndBedsCard> = ({ name, value, setValue }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" gutterBottom color="#f1f1f1" sx={{ my: "auto" }}>
                {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    sx={{ color: "#55FCF1", '&.Mui-disabled': { color: "#275c5a", } }}
                    disabled={(value == null || +value == 0) ? true : false}
                    onClick={() => {
                        if (value != null) setValue(parseInt(value) - 1)
                    }}
                >
                    <Remove />
                </IconButton>
                <Typography variant="h6" gutterBottom color="#f1f1f1" sx={{ my: "auto" }}>
                    {value == null ? 0 : value}
                </Typography>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    sx={{ color: "#55FCF1", '&.Mui-disabled': { color: "#275c5a", } }}
                    disabled={(value != null && +value == 16) ? true : false}
                    onClick={() => {
                        if (value == null || value == "") {
                            setValue(1);
                            return
                        }
                        if (value != null) setValue(parseInt(value) + 1)
                    }}
                >
                    <Add />
                </IconButton>
            </Box>
        </Box>
    )
}

export default RoomsAndBedsCard;