import { Typography, Box, makeStyles, Grid,  TextField, Button} from "@material-ui/core";
import { green, blueGrey} from '@material-ui/core/colors' ;
import List from "../user/List";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const useStyles= makeStyles({ 
    headingColor: {                 //yo headingcolor ko satta j naam diye pani huncha. it's userdefined
        backgroundColor: blueGrey[500],
        color:"white"
    },
    AddRecord: {
        backgroundColor: green[400],
        color: "white"
    }
   
})

const Home = () => {
    const classes = useStyles();        //yo tala box ma use garna ko lagi define garnu parcha. classes ko satta aru kehi lekhda ni huncha
    const navigate = useNavigate();
    const [user, setUser]= useState(    //useState bhanne function le chai user bhanne variable ma setUser function return garch or sth like that
        {
            userId: "" ,
            title: "",
            body: ""
        }
    );   
    


    
    function onTextFieldChange(e){
        setUser({
            ...user,                    //paila ko value sanga concatenate hoss bhanera chahi
            [e.target.name]: e.target.value
        })
    }
    
    async function onFormSubmit(e){
        e.preventDefault();             //button ko default kaam refresh garne huncha so we're preventing that default
               //here we created a getalluser function. This function sends an asynchronous request
            try{
                await axios.post(`http://localhost:3333/posts`, user)     //user gets data from db.json            
                window.location.reload(false);              //reloads the page after form submission
            }
            catch(error){
                console.log("Error");
            }
    }
    


    return (
        <>
            <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>    {/* p is used for padding and mb is for bottom margin*/}
                <Typography variant="h3"> React CRUD</Typography>
            </Box>
            <Grid container justify="center" spacing={4}>        {/*tyo box banauna ko lagi use garne mobile view ma mathi tala huncha bhane browser view ma sideways*/ }
                <Grid item md={6} xs={12}>
                    <Box textAlign="center" className={classes.AddRecord} mb={1} >
                        <Typography variant="h4">Add Record</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoComplete="userId" name="userId" variant="outlined" required fullWidth id="userId" label="User ID" onChange={e=> onTextFieldChange(e)} />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField autoComplete="title" name="title" variant="outlined" required fullWidth id="title" label="Title" onChange={e=> onTextFieldChange(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="body" name="body" variant="outlined" required fullWidth id="body" label="Body" onChange={e=> onTextFieldChange(e)} />
                            </Grid>
                            <Box m={3} textAlign="center">
                        <Button type="button" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)} >Add</Button>
                    </Box>
                        </Grid>
                    </form>
                </Grid>
                <Grid item md={6} xs={12}>
                    <List/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home