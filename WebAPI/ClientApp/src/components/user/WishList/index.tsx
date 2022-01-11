import { Box, Stack, Typography } from "@mui/material";

const WishList = () => {
    return (
        <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { xl: "40%", lg: "55%", md: "95%" } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                    Wish list
                </Typography>
            </Stack>
            <Box sx={{ mt: 3 }} >

            </Box>
        </Box>
    )
}

export default WishList;