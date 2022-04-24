import { Typography, Box, makeStyles, Grid,  TextField, Button } from "@material-ui/core";
import { green, blueGrey} from '@material-ui/core/colors' ;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


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

const Edit = () => {
    const classes = useStyles(); 
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userId: "",
        title: "",
        body: ""
    })
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
                await axios.put(`http://localhost:3333/posts/${id}`, user)     //user gets data from db.json
                
                navigate("/")
              
            }
            catch(error){
                console.log("Error");
            }
    }
    function handleClick(){
        navigate("/")
    }


    return(
        <>
        <Grid container justify="center" spacing={4}>
            <Grid item md={6}  xs={12}>
                <Box textAlign="center" p={1} className={classes.AddRecord} mb={2} >
                    <Typography variant="h4" justify="center">Edit Record</Typography>
                </Box>
                <form noValidate >
                    <Grid container  spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <TextField autoComplete="uid" name="uid" variant="outlined" required fullWidth id="uid" label="User ID" autoFocus value={user.userId} disabled />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
                        </Grid>
                        
                        <Grid item xs={12} >
                            <TextField autoComplete="title" name="title" variant="outlined" required fullWidth id="title" label="Title" value={user.title} onChange={e=> onTextFieldChange(e)} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete="body" name="body" variant="outlined" required fullWidth id="body" label="Body" value={user.body} onChange={e=> onTextFieldChange(e)}/>
                        </Grid>
                        
                    </Grid>
                    <Box m={3} textAlign="center">
                        <Button type="button" variant="contained" color="primary" fullWidth onClick={e=> onFormSubmit(e)}  >Update</Button>
                    </Box>
                    <Box m={3} textAlign="center">
                        <Button variant="contained" color="primary" onClick={handleClick}> Back to Home</Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
        </>
    )
}

export default Edit