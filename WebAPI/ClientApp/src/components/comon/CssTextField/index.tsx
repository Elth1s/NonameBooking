import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
    "& .MuiInputLabel-root": {
        color: "#45a29e",
        "&.Mui-focused": {
            color: "#45a29e"
        },
        "&.Mui-error ": {
            color: "#d32f2f"
        },
        "&.Mui-disabled": {
            color: "#f1f1f1"
        },
    },
    "& .MuiOutlinedInput-root": {
        color: "#c5c6c7",
        "& fieldset": {
            borderColor: "#45a29e"
        },
        "&:hover fieldset": {
            borderColor: "#45a29e"
        },
        "&.Mui-focused fieldset": {
            borderColor: "#45a29e"
        },
        "&.Mui-disabled fieldset": {
            borderColor: "#45a29e"
        },
        "&.Mui-error fieldset": {
            borderColor: "#d32f2f"
        },
        "&.Mui-error:hover fieldset": {
            borderColor: "#d32f2f"
        }
    },
    "& .MuiIconButton-root": {
        color: "#c5c6c7",
    },
});