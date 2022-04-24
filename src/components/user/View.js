import { Typography, Box, makeStyles,TableContainer, Table, TableBody, Button, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core";
import {blueGrey, deepPurple,  lightBlue } from '@material-ui/core/colors' ;
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit' ;
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles= makeStyles({ 
    tableHeadCell: {
        backgroundColor: deepPurple[300],
        color: "white"
    },
    Record: {
        backgroundColor: lightBlue[400],
        color: "white"
    },
    tableCell:{
        backgroundColor: blueGrey[300]
    }
    
})


const List = () =>{
    const classes = useStyles();
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const history =useNavigate();
    useEffect(()=>{
        async function getUser(){        //here we created a getalluser function. This function sends an asynchronous request
            try{
                const user = await axios.get(`http://localhost:3333/posts/${id}`)     //user gets data from db.json
                //console.log(user.data);
                setUser(user.data);
            }
            catch(error){
                console.log("Error");
            }
            
        }
        getUser();                       //getalluser function is called here
    },[id])

    function handleClick(){
        history("/")
    }

    


    return(
            <>
            <Box textAlign="center" className={classes.Record} mb={1} >
            <Typography variant="h4">Record</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                        <TableCell align="center" className={classes.tableHeadCell}>User ID</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Title</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Body</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" className={classes.tableCell}>{user.userId}</TableCell>
                            <TableCell align="center" className={classes.tableCell}>{user.id}</TableCell>
                            <TableCell align="center" className={classes.tableCell}>{user.title}</TableCell>
                            <TableCell align="center" className={classes.tableCell}>{user.body}</TableCell>
                            <TableCell align="right" className={classes.tableCell}>
                                <Tooltip title="View">
                                    <IconButton><Link to={`/view/${user.userId}/${user.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton><Link to={`/edit/${user.id}`} ><EditIcon /></Link></IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={3} textAlign="center">
                <Button variant="contained" color="primary" onClick={handleClick} > Back to Home</Button>
            </Box>
            </>
        )
}

export default List