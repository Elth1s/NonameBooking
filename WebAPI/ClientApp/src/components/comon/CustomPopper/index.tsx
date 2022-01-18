import {
    Popper
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& .MuiAutocomplete-listbox": {
                background: "#18181b",
                color: "#f1f1f1",
                fontSize: 18,
                borderRadius: 3,
                "& :hover": {
                    backgroundColor: "#222226"
                }
            },
            "& .MuiAutocomplete-paper": {
                color: "#f1f1f1",
                fontSize: 18,
                borderRadius: 3,
                background: "#18181b",
            },
            "& .MuiAutocomplete-noOptions": {
                borderRadius: 3,
                color: "#f1f1f1",
                background: "#18181b",
            }
        }
    })
);
const CustomPopper = (props: any) => {
    const classes = useStyles();
    return <Popper {...props} className={classes.root} placement="bottom" />;
};

export default CustomPopper;
