import { Typography, Box, makeStyles,TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core";
import {blueGrey, deepPurple,  lightBlue } from '@material-ui/core/colors' ;
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit' ;
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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
    const [user, setUser ]= useState([]);
    useEffect(()=>{
        async function getAllUser(){        //here we created a getalluser function. This function sends an asynchronous request
            try{
                const user = await axios.get("http://localhost:3333/posts")     //user gets data from db.json
                //console.log(user.data);
                setUser(user.data);
            }
            catch(error){
                console.log("Error");
            }
            
        }
        getAllUser();                       //getalluser function is called here
    },[])

    const handleDelete = async id =>{
        await axios.delete(`http://localhost:3333/posts/${id}`)
        var newUser=user.filter((item)=>{
            return item.id !== id;
        })
        setUser(newUser);
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
                        {
                            user.map((user,i)=>{
                                return(
                                    <TableRow key={i}>
                                        <TableCell align="center" className={classes.tableCell}>{user.userId}</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{user.id} </TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{user.title}</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{user.body} </TableCell>
                                        <TableCell align="right" className={classes.tableCell}>
                                            <Tooltip title="View">
                                                <IconButton><Link to={`/view/${user.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton><Link to={`/edit/${user.id}`} ><EditIcon /></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDelete(user.id) }>
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                )
                            })
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        )
}

export default List