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
import {useEffect, useState} from "react";
import {useScore} from "../../hooks/useScore.ts";

const LeadeboardPage = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderBoardType[]>([]);
    const {getLeaderboard} = useScore();

    const loadLeaderboard = async() => {
        const data = await getLeaderboard();
        setLeaderboard(data);
    }

    useEffect(() => {
        loadLeaderboard();
    }, []);

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
                            <TableCell>{entry.login}</TableCell>
                            <TableCell>{entry.score}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default LeadeboardPage;
