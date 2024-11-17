import {LeaderBoardType} from "../../types/User.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const LeadeboardPage = () => {
    const leaderboard: LeaderBoardType[] = [
        { username: "Messi", score: 100 },
        { username: "Ronaldo", score: 95 },
        { username: "Mbappe", score: 90 },
    ];
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderboard.map((entry,index) => (
                        <TableRow key={index}>
                            <TableCell>{entry.username}</TableCell>
                            <TableCell>{entry.score}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default LeadeboardPage;
